// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import {
//     AppBar,
//     Notification,
//     Sidebar,
//     setSidebarVisibility,
// } from 'react-admin';
// import Menu from './menu'
// import {myTheme} from './MyTheme'
// import MyAppBar from './MyAppBar'
// import MySidebar from './MySidebar'

// const styles = theme => ({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//         zIndex: 1,
//         minHeight: '100vh',
//         backgroundColor: theme.palette.background.default,
//         position: 'relative',
//     },
//     appFrame: {
//         display: 'flex',
//         flexDirection: 'column',
//         overflowX: 'auto',
//     },
//     contentWithSidebar: {
//         display: 'flex',
//         flexGrow: 1,
//     },
//     content: {
//         display: 'flex',
//         flexDirection: 'column',
//         flexGrow: 2,
//         padding: theme.spacing.unit * 3,
//         marginTop: '4em',
//         paddingLeft: 5,
//     },
// });

// class MyLayout extends Component {
//     componentWillMount() {
//         this.props.setSidebarVisibility(true);
//     }

//     render() {
//         const {
//             children,
//             classes,
//             dashboard,
//             isLoading,
//             logout,
//             open,
//             title,
//         } = this.props;
//         return (
//             <MuiThemeProvider theme={myTheme}>
//                 <div className={classes.root}>
//                     <div className={classes.appFrame}>
//                         <MyAppBar title={title} open={open} logout={logout} />
//                         <main className={classes.contentWithSidebar}>
//                             <MySidebar>
//                                 <Menu logout={logout} hasDashboard={!!dashboard} />
//                             </MySidebar>
//                             <div className={classes.content}>
//                                 {children}
//                             </div>
//                         </main>
//                         <Notification />
//                     </div>
//                 </div>
//             </MuiThemeProvider>

//         );
//     }
// }

// MyLayout.propTypes = {
//     children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
//     dashboard: PropTypes.oneOfType([
//         PropTypes.func,
//         PropTypes.string,
//     ]),
//     isLoading: PropTypes.bool.isRequired,
//     // logout: componentPropType,
//     setSidebarVisibility: PropTypes.func.isRequired,
//     title: PropTypes.string.isRequired,
// };

// const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });
// export default connect(mapStateToProps, { setSidebarVisibility })(withStyles(styles)(MyLayout));

import * as React from "react";
import { Layout } from 'react-admin';
import ButtonAppBar from './MyAppBar';
import MySidebar from './MySidebar';
import MyMenu from './menu';
import MyNotification from './MyNotification';

const MyLayout = props => <Layout
    {...props}
    appBar={ButtonAppBar}
    sidebar={MySidebar}
    menu={MyMenu}
    notification={MyNotification}
/>;

export default MyLayout;