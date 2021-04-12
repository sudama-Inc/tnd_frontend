import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useLogout } from 'react-admin';
import { createHashHistory } from 'history';
import { useDispatch } from 'react-redux'
import Icon from '../assets/icons/ripplr_logo.svg'
import Logo from '../assets/icons/logo1.png';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { MenuItemLink, getResources, useRedirect } from 'react-admin';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logout: {
        background: 'transparent',
        '&:hover': {
            background: 'transparent'
        }
    }
}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);



export default function ButtonAppBar(props) {
    const classes = useStyles();
    const logout = useLogout();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const redirect = useRedirect();
    const [open, setOpen] = React.useState(true)
    const handleLogoutClick = () => logout();
    const dispatch = useDispatch();
    const toggleSidebar = useCallback(() => { dispatch({ type: 'RA/TOGGLE_SIDEBAR' }) }, [])
    const history = createHashHistory();
    const openClose = () => {
        toggleSidebar()
        let newOpen = !open;
        setOpen(newOpen)
    }


    const part = history.location.pathname.split('/')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleRedirect = (event) => {
        redirect('/profile');
        setAnchorEl(null);
    }
    return (
        <div className={classes.root}>
            <AppBar {...props}>
                <Toolbar>
                    <img src={Icon} alt="LOGO" width="100px" style={{ marginRight: '50px' }} />
                    <IconButton edge="start" onClick={openClose} className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" id="react-admin-title" className={classes.title}>
                    </Typography>
                    <Button onClick={handleClick} color="inherit" className={classes.logout}><img src={Logo} width="50px" alt="logo" /></Button>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <StyledMenuItem disabled style={{ textAlign: "center" }}>
                            <ListItemText primary="Account" />
                        </StyledMenuItem >
                        <StyledMenuItem onClick={handleRedirect}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />

                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleLogoutClick}>
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </StyledMenuItem>
                    </StyledMenu>
                </Toolbar>
            </AppBar>
        </div>
    );
}
