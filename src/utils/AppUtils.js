import { API_URL, API_VERSIONS } from '../constants';
import { httpClient } from '../framework/dataProvider';


/**
 *sss
 * @param str
 * @returns {void | string | *}
 */
export const toTitleCase = (str) => (
    str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }));


/**
 *Saves the file to local machine with file extension provided by the content_type
 *
 * @param disposition returned from http response
 * @param content_type returned from http response
 * @param response The response mut be of type blob
 * @param filename [filename=file name from the {response}] - filename.
 */
export const saveFile = (disposition, content_type, response, filename) => {
    if (disposition && disposition.indexOf('attachment') !== -1) {
        let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        let matches = filenameRegex.exec(disposition);
        if (!filename && matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
    }
    let type = content_type;

    let blob;
    if (typeof File === 'function') {
        try {
            blob = new File([response], filename, { type: type });
        } catch (e) { /* Edge */ }
    }
    if (typeof blob === 'undefined') {
        blob = new Blob([response], { type: type });
    }

    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
    } else {
        let URL = window.URL || window.webkitURL;
        let downloadUrl = URL.createObjectURL(blob);

        if (filename) {
            // use HTML5 a[download] attribute to specify filename
            let a = document.createElement("a");
            // safari doesn't support this yet
            if (typeof a.download === 'undefined') {
                window.location.href = downloadUrl;
            } else {
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
            }
        } else {
            window.location.href = downloadUrl;
        }

        setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
    }
};

/**
 *
 * @param locales {string} [locales='en-IN']
 * @param currency {!string} A string, but never null.
 * @param amount {!number} [amount=0] A number, but never null.
 * @returns {string}
 */
export const toCurrency = ({ locales = 'en-IN', currency, amount = 0, minimumFractionDigits = 0, maximumFractionDigits = 0 }) => {
    //TODO use navigator.language for locales
    if (currency)
        return new Intl.NumberFormat(locales, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: minimumFractionDigits,
            maximumFractionDigits: maximumFractionDigits
        }).format(amount);
    else
        return new Intl.NumberFormat(locales, {
            minimumFractionDigits: minimumFractionDigits,
            maximumFractionDigits: maximumFractionDigits
        }).format(amount);
};


/**
 *Saves the file to local machine with file extension provided by the content_type
 *
 * @param disposition returned from http response
 * @param content_type returned from http response
 * @param response The response mut be of type blob
 * @param filename [filename=file name from the {response}] - filename.
 */
export const openFile = (disposition, content_type, response, filename) => {
    let type = content_type;
    let blob;
    if (typeof File === 'function') {
        try {
            blob = new File([response], filename, { type: type });
        } catch (e) { /* Edge */ }
    }
    if (typeof blob === 'undefined') {
        blob = new Blob([response], { type: type });
    }

    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
    } else {
        let URL = window.URL || window.webkitURL;
        let fileURL = URL.createObjectURL(blob);

        if (filename) {
            //Open the URL on new Window
            window.open(fileURL);
        } else {
            window.location.href = fileURL;
        }

        setTimeout(function () { URL.revokeObjectURL(fileURL); }, 100); // cleanup
    }
};



/**
 * returns data in json format for the provided arraybuffer data
 * @param {*} arraybuffer 
 */
export const ArrayBufferToJson = (arraybuffer) => {
    if (arraybuffer) {
        const uint8Array = new Uint8Array(arraybuffer);
        return JSON.parse(String.fromCharCode.apply(null, uint8Array))
    }
    return null;

}

/**
 * 
 * @param {*} str 
 */
export const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * 
 * @param {*} resource 
 * @param {*} formValues 
 * @param {*} fileName 
 * @param {*} onSuccess 
 * @param {*} onFailure 
 */
export const downloadFile = (resource, formValues, fileName, onSuccess, onFailure) => {

    const url = `${API_URL}/${API_VERSIONS[resource]}/${resource}`;

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(formValues),
        responseType: "arraybuffer",
        url,
    };

    httpClient(url, options).then(response => {
        console.log(response);
        if (response.status === 204) {
            onFailure({ response: response });
        } else {
            // since the specified responseType is arraybuffer, response.json is of the type "arraybuffer"
            const arrayBufferData = response.json;

            const content_type = response.headers["content-type"];

            const blob = new Blob([arrayBufferData], { type: content_type });
            saveFile(null, content_type, blob, fileName);
            onSuccess();
        }
    }).catch(error => {
        onFailure(error);
    });
};

export const sanitizeJson = (object) => {
    Object
        .entries(object)
        .forEach(([k, v]) => {
            if (v && typeof v === 'object') {
                sanitizeJson(v);
            }
            if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined) {
                delete object[k];
            }
        });
    return object;
}

/**
 * 
 * @param {*} obj 
 * @returns 
 */
export const removeEmptyOrNull = (obj) => {
    Object.keys(obj).forEach(k =>
        (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
        (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
};