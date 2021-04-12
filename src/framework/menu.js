import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { customer } from '../views';
import SubMenu from "./SubMenu";


const Menu = ({ onMenuClick, dense }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        menuItem: {
            fontSize: '1rem!important',
        }
    }));


    const [state, setState] = useState({
        menuOnboarding: false,
        menuMasters: false,
        menuProductManagement: false,
        menuOrderManagement: false,
        menuPaymentManagement: false,
        menuInventory: false,
        menuRoleManagement: false,
    });

    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);

    const handleToggle = (menu) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MenuItemLink
                className={classes.menuItem}
                exact
                to={`/customer`}
                primaryText='Customer'
                leftIcon={<customer.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense} />
        </div>
    );
}

export default withRouter(Menu);