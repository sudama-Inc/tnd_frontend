import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import * as React from "react";
import CustomerList from './customer_list';
import CustomerCreate from './customer_create';
import CustomerEdit from './customer_edit';

export default {
    list: CustomerList,
    create: CustomerCreate,
    edit: CustomerEdit,
    icon: PeopleAltSharpIcon,
};