import * as React from "react";
import { Sidebar, Layout } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useSidebarStyles = makeStyles({
    drawerPaper: {
        backgroundColor: '#2f353a',
    },
});

const MySidebar = props => {
    const classes = useSidebarStyles();
    return (
        <Sidebar classes={classes} {...props} />
    );
};
export default MySidebar;