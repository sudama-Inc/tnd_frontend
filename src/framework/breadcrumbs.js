import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

export default function BreadCrumb(props) {

    const handleUrl = (path) => {
        props.history.push(path)
      }
    

    console.log("history...", props.history)
    return (

    <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={() => handleUrl('/')}>
                Home
            </Link>
            {(props.back) && <Link color="inherit" onClick={() => props.history.goBack()}>
                {props.back}
            </Link>}
            {(props.page) && <Link color="inherit" onClick={() => handleUrl(props.history.location.pathname)}>
                {props.page}
            </Link>}
    </Breadcrumbs>
            
)}