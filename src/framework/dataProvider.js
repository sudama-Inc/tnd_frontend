import { fetchUtils, useLogout } from 'react-admin';
import { stringify } from 'query-string';
import { API_URL, API_VERSIONS } from '../constants';
import dataProvider_v1 from './dataProvider_v1';
import dataProvider_v2 from './dataProvider_v2';
import axios from "axios";
import { IsJsonString, sanitizeJson } from "../utils/AppUtils";


// requests using this instance will wait 2.5 seconds before timing out
const REQUEST_TIMEOUT = 20000;

const dataProviders = {
    v1: dataProvider_v1, v2: dataProvider_v2
};

export const httpClient = async (url, options = {}) => {
    options.headers = {
        'Accept': 'application/json, text/plain, */*'
    }

    axios.interceptors.response.use((response) => {
        // Return a successful response back to the calling service
        return response;
    }, (error) => {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    });

    return await axios({
        ...options,
        url: url,
        data: options.body && IsJsonString(options.body) ? sanitizeJson(JSON.parse(options.body)) : options.body,
        // timeout: REQUEST_TIMEOUT
    }).then(resp => {
        return { headers: resp.headers, json: resp.data, status: resp.status }
    })
};

export default {
    getList: (resource, params) => {
        resource = resource.replace("/list", "")
        resource = resource.replace("/filter", "")
        let api_version = '';
        if (API_VERSIONS[resource + '/list'] !== undefined) {
            api_version = API_VERSIONS[resource + '/list'];
        } else if (API_VERSIONS[resource + '/filter'] !== undefined) {
            api_version = API_VERSIONS[resource + '/filter'];
        } else {
            api_version = API_VERSIONS[resource];
        }
        return dataProviders[api_version].getList(resource, params)
    },

    getOne: (resource, params) => {
        resource = resource.replace("/filter", "")
        const api_version = API_VERSIONS[resource + '/retrieve'] !== undefined ? API_VERSIONS[resource + '/retrieve'] : API_VERSIONS[resource];
        return dataProviders[api_version].getOne(resource, params);
    },

    getMany: (resource, params) => {
        resource = resource.replace("/filter", "");
        const api_version = API_VERSIONS[resource + '/retrieve'] !== undefined ? API_VERSIONS[resource + '/retrieve'] : API_VERSIONS[resource];
        return dataProviders[api_version].getMany(resource, params);
    },

    getManyReference: (resource, params) => dataProviders[API_VERSIONS[resource]].getManyReference(resource, params),

    update: (resource, params) => dataProviders[API_VERSIONS[resource]].update(resource, params),

    updateMany: (resource, params) => dataProviders[API_VERSIONS[resource]].updateMany(resource, params),

    create: (resource, params) => {
        let api_version = '';
        if (API_VERSIONS[resource + '/create'] !== undefined) {
            api_version = API_VERSIONS[resource + '/create'];
        } else {
            api_version = API_VERSIONS[resource];
        }
        return dataProviders[api_version].create(resource, params)
    },

    delete: (resource, params) => dataProviders[API_VERSIONS[resource]].delete(resource, params),

    deleteMany: (resource, params) => dataProviders[API_VERSIONS[resource]].deleteMany(resource, params),

    getExport: (resource, params) => dataProviders[API_VERSIONS[resource]].getExport(resource, params),

    getRequest: (resource, params) => dataProviders[API_VERSIONS[resource]].getRequest(resource, params),

    postRequest: (resource, params) => dataProviders[API_VERSIONS[resource]].postRequest(resource, params),

    putRequest: (resource, params) => dataProviders[API_VERSIONS[resource]].putRequest(resource, params),

};

export const paramsToFormData = (data) => {
    let fd = new FormData();
    Object.keys(data).forEach(function (key) {
        if (key !== 'vendor_agreement_copy')
            fd.append(key, data[key]);
    });
    fd.append('vendor_agreement_copy', data.vendor_agreement_copy);

    return fd;
}