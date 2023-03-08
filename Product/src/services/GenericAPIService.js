import axios from 'axios';
import environment from '../environments/environment';
import { EncryptStorage } from './EncryptStorage';


const baseUrl = environment.baseUrl;
const elmsAdminUrl = environment.elmsAdminUrl;
const ocp_Apim_Subscription_Key = environment['ocp_Apim_Subscription_Key']
//api_key
axios.interceptors.request.use((config) => {
    const _token = EncryptStorage.decriptOnlyKey('token');
    config.headers['Ocp-Apim-Subscription-Key'] = ocp_Apim_Subscription_Key;
    if (_token) {
        config.headers.token = _token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.data && error.response.data.error &&
        (error.response.data.session === false || error.response.data.session === "false")) {
        sessionStorage.clear();
        localStorage.clear();
        if (window.location.hash !== '#/') {
            window.location = "#/login";
        }
    }
    else
        if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            localStorage.clear();
            if (window.location.hash != '#/') {
                window.location = "#/login";
            }
        } else
            return Promise.reject(error);
});

const post = (apiUrl, payload) => {
    var url = baseUrl + apiUrl;
    return axios(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        data: payload,
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

const put = (apiUrl, payload) => {
    var url = baseUrl + apiUrl;
    return axios(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        data: payload,
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

const get = (apiUrl) => {
    var url = baseUrl + apiUrl;
    return axios(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}

const deleteApi = (apiUrl, payload) => {
    var url = baseUrl + apiUrl;
    return axios(url, {
        method: 'DELETE',
        data: payload,
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const GenericAPIService = {
    post, get, deleteApi, put 
}
