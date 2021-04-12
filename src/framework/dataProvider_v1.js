import { stringify } from 'query-string';
import { API_URL, API_VERSIONS } from '../constants';
import dataProvider, { httpClient } from './dataProvider';
import qs from 'qs';

const apiUrl = API_URL + '/v1';

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const { filter } = params;
        const sort_details = {
            sort_column: field,
            sort_direction: order
        };

        const page_details = {
            limit: perPage,
            offset: ((page - 1) * perPage)
        };

        const query = {
            filter: filter,
            sort: sort_details,
            page: page_details
        };

        const url = API_VERSIONS[resource + '/filter'] !== undefined ? `${apiUrl}/${resource}/filter` : `${apiUrl}/${resource}/list`;

        const options = {
            method: 'POST',
            body: JSON.stringify(query)
        }

        return httpClient(url, options).then(({ headers, json }) => {
            if ('data' in json) {
                return { data: json.data.rows, total: json.data.count }
            }
            else if ('count' in json) {
                return { data: json.results, total: json.count }
            } else if (headers.has('content-range')) {
                return {
                    data: json,
                    total: parseInt(
                        headers
                            .get('content-range')
                            .split('/')
                            .pop(),
                        10
                    ),
                };
            } else if ('detail' in json && json.detail === 'Invalid page.') {
                return { data: [], total: 0 }
            } else {
                throw new Error(
                    'The total number of results is unknown. The DRF data provider ' +
                    'expects responses for lists of resources to contain this ' +
                    'information to build the pagination. If you\'re not using the ' +
                    'default PageNumberPagination class, please include this ' +
                    'information using the Content-Range header OR a "count" key ' +
                    'inside the response.'
                );
            }
        });
    },

    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/fetch_by_id`;

        const query = {
            id: parseInt(params.id)
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(query)
        }

        return httpClient(url, options).then(({ headers, json }) => {
            if ('data' in json) {
                return { data: json.data }
            }

        })
    },

    getMany: (resource, params) => {
        const ids = params.ids.map(record => {
            if (record.hasOwnProperty('id'))
                return record.id;
            return record;
        });

        if (API_VERSIONS[resource + '/list'] === 'v2' ||
            API_VERSIONS[resource + '/filter'] === 'v2' ||
            (API_VERSIONS[resource] === 'v2' && API_VERSIONS[resource + '/list'] !== 'v1')) {
            const sort_details = {
                sort_column: 'id',
                sort_direction: 'DESC'
            };

            const page_details = {
                limit: ids.length,
                offset: 0
            };

            const query = {
                filter: { ids: ids },
                sort: sort_details,
                page: page_details
            };

            const url = API_VERSIONS[resource + '/filter'] !== undefined ? `${apiUrl}/${resource}/filter` : `${apiUrl}/${resource}/list`;

            const options = {
                method: 'POST',
                body: JSON.stringify(query)
            }

            return httpClient(url, options).then(({ headers, json }) => {
                if ('data' in json) {
                    return { data: json.data.rows, total: json.data.count }
                }
                else if ('count' in json) {
                    return { data: json.results, total: json.count }
                } else if (headers.has('content-range')) {
                    return {
                        data: json,
                        total: parseInt(
                            headers
                                .get('content-range')
                                .split('/')
                                .pop(),
                            10
                        ),
                    };
                } else if ('detail' in json && json.detail === 'Invalid page.') {
                    return { data: [], total: 0 }
                } else {
                    throw new Error(
                        'The total number of results is unknown. The DRF data provider ' +
                        'expects responses for lists of resources to contain this ' +
                        'information to build the pagination. If you\'re not using the ' +
                        'default PageNumberPagination class, please include this ' +
                        'information using the Content-Range header OR a "count" key ' +
                        'inside the response.'
                    );
                }
            });
        }
        return Promise.all(
            ids.map(id => dataProvider.getOne(resource, { id: id }))
        ).then(responses => ({
            data: responses.map(response => response.data),
        }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const { filter, target, id } = params;

        const query = {
            limit: perPage,
            offset: ((page - 1) * perPage - 1),
            ordering: `${order === 'ASC' ? '' : '-'}${field}`,
            ...filter,
            [target]: id
        };
        const url = `${apiUrl}/${resource}/?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.results,
            total: json.count
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/update`, {
            method: 'PUT',
            body: JSON.stringify({ ...params.data, action: `UPDATE_${resource.toString().toUpperCase()}`, id: parseInt(params.id) }),
        }).then(({ json }) => {
            return ({
                data: json.data,
            })
        }),

    updateMany: (resource, params) => {
        return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}/`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        ).then(responses => ({
            data: responses.map(response => response.json),
        }));
    },

    create: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/create`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...json.data, id: json.data.id },
        }));
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}/`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}/`, {
                    method: 'DELETE',
                })
            )
        ).then(responses => ({
            data: responses.map(response => response.json),
        }));
    },

    getExport: (resource, params) => {
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([0, 10]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data,
            total: json.total,
        }));
    },

    getRequest: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}?${qs.stringify(params, { arrayFormat: 'comma' })}`).then(({ headers, json }) => ({
            data: json.data,
        }));
    },

    postRequest: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params),
        }).then(({ headers, json }) => ({
            data: json.data,
        }));
    },

    putRequest: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'PUT',
            body: JSON.stringify(params),
        }).then(({ headers, json }) => ({
            data: json,
        }));
    }
};
