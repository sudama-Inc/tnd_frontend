import * as React from "react";

const getEnv = (variableName) => {
    if (!process.env[variableName]) {
        const errMsg = `Invalid environment variable - "${variableName}"`;
        throw new Error(errMsg);
    }
    return process.env[variableName];
};

export const API_URL = getEnv("REACT_APP_API_URL");
// export const API_URL = "https://staging-dms.ripplr.in/api";
// export const API_URL = "//192.168.1.65:8000/api/v1"
// export const API_URL = "http://127.0.0.1:3000/api/v1"

export const NETWORK_ERROR_MESSAGE = "Network error occurred: Please check your internet connection";

export const API_VERSIONS = {
    'customer': 'v1',
    'customer/filter': 'v1',
};

// export const PAYMENT_STATUSES = [
//     { id: 'PN', name: 'Pending' },
//     { id: 'PD', name: 'Paid' },
//     { id: 'PR', name: 'Partial' },
// ];


// export const GENDER_CHOICE = [
//     { id: 'M', name: 'Male' },
//     { id: 'F', name: 'Female' },
//     { id: 'O', name: 'Other' },
// ];