import * as React from "react";
import {
    Datagrid,
    ExportButton,
    List,
    sanitizeListRestProps,
    TextField,
    TopToolbar,
    useListContext,
    CreateButton,
    EditButton
} from "react-admin";
import { cloneElement } from "react";

const ListActions = (props) => {
    const { className, exporter, filters, maxResults, ...rest } = props;
    const {
        currentSort,
        resource,
        displayedFilters,
        filterValues,
        basePath,
        showFilter,
        total,
    } = useListContext();
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters &&
                cloneElement(filters, {
                    resource,
                    showFilter,
                    displayedFilters,
                    filterValues,
                    context: "button",
                })}
            <CreateButton label="Add Customer" basePath={basePath} />
            <ExportButton
                style={{ marginLeft: "10px" }}
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filterValues={filterValues}
                maxResults={total}
            />
        </TopToolbar>
    );
};

export const CustomerList = (props) => (
    <List {...props} actions={<ListActions />} bulkActionButtons={false}>
        <Datagrid>
            {/*<TextField source="id" sortable={false}/>*/}
            <TextField source="name" sortable={false} />
            <TextField source="nick_name" sortable={false} />
            <TextField source="age" sortable={false} />
            <TextField source="mobile" sortable={false} />
            <TextField source="address" sortable={false} />
            <TextField source="education" sortable={false} />
            <TextField source="occupation" sortable={false} />
            <TextField source="salary" sortable={false} />
            <TextField source="hobbies" sortable={false} />
            <EditButton />
        </Datagrid>
    </List>
);

export default CustomerList;
