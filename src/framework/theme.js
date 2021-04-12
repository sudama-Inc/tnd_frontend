import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
// import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

export const myTheme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: indigo,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    sidebar: {
        closedWidth: 0
    },
    overrides: {
        MuiButton: { // override the styles of all instances of this component
            root: { // Name of the rule
                color: 'white', // Some CSS
                backgroundColor: '#1985ac',
                '&:hover': {
                    backgroundColor: '#1985ac'
                },
                whiteSpace: 'nowrap'
            },
            textPrimary: {
                color: 'white',
                '&:hover': {
                    backgroundColor: '#1985ac'
                }
            },
            containedPrimary: {
                backgroundColor: '#1985ac',
                '&:hover': {
                    backgroundColor: '#1985ac'
                }
            }
        },
        RaList: {
            root: {
                // padding: '30px 10px 10px 30px'
            }
        },
        MuiToolbar: {
            regular: {
                // minHeight: '55px!important'
            }
        },
        RaFormInput: {
            input: {
                width: 'auto'
            }
        },
        MuiLink: {
            root: {
                color: 'rgb(0, 132, 216)',
                cursor: 'pointer'
            }
        },
        RaEdit: {
            card: {
                background: 'white!important',
                padding: '15px'
            }
        },
        RaShow: {
            card: {
                background: 'white!important',
                padding: '15px'
            }
        },
        RaCreate: {
            card: {
                padding: '15px'
            }
        },
        MuiTypography: {
            body: {
                fontSize: '0.875rem!important'
            }
        },
        MuiMenuItem: {
            root: {
                fontSize: '0.875rem!important',
                whiteSpace: 'break-spaces'
            }
        },
        MuiChip: {
            root: {
                height: 'auto'
            },
            label: {
                whiteSpace: 'break-spaces'
            }
        },
        MuiTableCell: {
            head: {
                fontWeight: 'bold',
                borderBottom: '2px solid #c8ced3',
                color: 'black!important'
            },
            sizeSmall: {
                padding: '5px 15px 5px 8px!important'
            }
        },
        RaPaginationActions: {
            button: {
                '&:hover': {
                    color: 'white',
                },
                background: 'transparent',
                color: 'black',
                margin: '0 5px',
                minWidth: 'auto'
            },
            currentPageButton: {
                background: "#1985ac",
                color: 'white',
                margin: '0 5px',
                minWidth: 'auto'
            },
        },
        MuiInputBase: {
            root: {
                backgroundColor: 'white'
            }
        },
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: 'white',
                color: 'rgba(0, 0, 0, 0.87)'
            }
        },
        MuiBreadcrumbs: {
            root: {
                background: 'white',
                padding: '15px 30px',
                margin: '-10px -24px 10px -30px'
            }
        },
        RaLayout: {
            content: {
                backgroundColor: '#e4e5e6',
                paddingLeft: '30px!important',
                paddingTop: '20px'
            }
        },
        MuiSelect: {
            selectMenu: {
                backgroundColor: 'white'
            }
        },
        MuiSvgIcon: {
            root: {
                width: '0.875em',
                height: '0.875em'
            }
        },
        RaSidebar: {
            drawerPaper: {
                maxWidth: '200px',
                marginTop: '8px!important'
            },
        },
        MuiDrawer: {
            root: {
                maxWidth: "200px",
                background: '#2f353a!important',
                minHeight: 'calc(100vh - 48px)',
            },
            paper: {
                background: '#2f353a!important'
            }
        },
        MuiFormLabel: {
            root: {
                color: 'rgb(0, 132, 216)'
            }
        },
        MuiAccordionSummary: {
            root: {
                color: 'rgba(0, 0, 0, 0.87)'
            }
        },
        MuiListItem: {
            root: {
                backgroundColor: '#2f353a',
                color: 'white',
                "&$selected": { // this is to refer to the prop provided by M-UI. The & is a reference to the parent rule ("root" in this case)
                    backgroundColor: "#20a8d8", // updated backgroundColor
                },

                // on focus by keyboard arrow keys
                "&$focusVisible": { // this is to refer to the prop provided by M-UI. The & is a reference to the parent rule ("root" in this case)
                    backgroundColor: "#20a8d8cc", // updated backgroundColor
                },

                // on focus by keyboard arrow keys and hover
                "&$focusVisible:hover": { // this is to refer to the prop provided by M-UI. The & is a reference to the parent rule ("root" in this case)
                    backgroundColor: "#20a8d8aa", // updated backgroundColor
                },
                // "&.Mui-selected": {
                //     backgroundColor: "rgba(0, 0, 0, 0.1)"
                // }
            },
            ["active"]: {
                backgroundColor: "#3a4248"
            },
            button: {
                '&:hover': {
                    backgroundColor: '#20a8d8'
                },

                //selected and hover
                '&$selected:hover': {
                    backgroundColor: '#20a8d8cc'
                }
            }
        },
        RaMenuItemLink: {
            root: {
                color: "#ffffff"
            },
            active: {
                color: "#ffffff",
                backgroundColor: "#20a8d8"
            }
        },
        MuiListItemIcon: {
            root: {
                color: 'white',
                minWidth: "0px!important",
                marginRight: '10px'
            }
        },
        MuiList: {
            root: {
                paddingLeft: '0!important'
            },
            padding: {
                paddingTop: 0,
                paddingBottom: 0
            }
        },
        MuiCollapse: {
            container: {
                background: '#2f353a',
                paddingLeft: '1.25rem'
            }
        },
        MuiButtonBase: {
            root: {
                color: 'white'
            }
        },
        MuiTableSortLabel: {
            root: {
                color: 'black',
                '&:hover': {
                    color: "#20a8d8"
                }
            },
        }
    },
});