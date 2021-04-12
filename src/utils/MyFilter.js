import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import lodashDebounce from 'lodash/debounce';
import { Filter, TextInput, changeListParams } from 'react-admin';


/**
 * refer /node_modules/ra-core/esm/controller/useListParams.js
 */
 const MyFilter = ({ resource, ...rest }) => {
    const dispatch = useDispatch();

    const debouncedSetFilters = lodashDebounce((filter = {}) => {
        const query = { filter };

        dispatch(changeListParams(resource, query));
    }, 500);

    const setFilters = useCallback(debouncedSetFilters, []);

    return (
        <Filter resource={resource} {...rest} setFilters={setFilters}>
            <TextInput source="title" alwaysOn resettable />
        </Filter>
    );
};
MyFilter.propTypes = {
    resource: PropTypes.string,
};
MyFilter.displayName = 'MyFilter';

export default MyFilter;