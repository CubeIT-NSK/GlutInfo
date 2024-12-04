import axios from 'axios';

import { apiUrl } from "./config";


export const apiAuth = axios.create({
    baseURL: `${apiUrl}/auth/jwt`
});


export const apiEmail = axios.create({
    baseURL: `${apiUrl}/auth/email-verification`
});


export const api = axios.create({
    baseURL: apiUrl,
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export const postApiAuth = async ({ username, password }) => {
    var status;

    console.time("Login Request Time");
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    const response = await apiAuth
        .post('/login', params)
        .then((response) => {
            status = response.status
            const { access_token: token } = response.data;
            console.log(response.data)
            console.log(token)
            localStorage.setItem('token', token);
        })
        .catch((error) => {
            status = error.request.status
        });
    console.timeEnd("Login Request Time");
    return status
};


export const postApiRegisterUser = async ({ registerData }) => {
    var status;
    const response = await api
        .post(
            '/register',
            registerData
        )
        .then((response) => {
            status = response.status
            console.log(status)    // должен быть 201 при успехе
            // data = response.data   также здесь возращается инфа по созданному юзеру, если нужно
        })
        .catch((error) => {
            status = error.request.status
        });
    return status
};


export const postApiEmailConfirmationRequest = async ({ email }) => {
    var status;
    const response = await apiEmail
        .post(
            '/request-verify-token',
            { 'email': email }
        )
        .then((response) => {
            status = response.status
            console.log(status) // должен быть 202 при успехе
        })
        .catch((error) => {
            status = error.request.status
        });
    return status
};


export const postApiEmailConfirmationVerify = async ({ token }) => {
    var status;
    const response = await apiEmail
        .post(
            '/verify',
            { 'token': token }
        )
        .then((response) => {
            status = response.status
            console.log(status) // должен быть 200 при успехе
        })
        .catch((error) => {
            status = error.request.status // должен быть 400(VERIFY_USER_BAD_TOKEN) при неуспехе
        });
    return status
};


export const getUsersMe = async () => {
    var status, data;
    const response = await api
        .get('/users/me')
        .then((response) => {
            status = response.status
            console.log(status) // должен быть 200 при успехе
            data = response.data
        })
        .catch((error) => {
            status = error.request.status // должен быть 401(Missing token or inactive user) при неуспехе
        })
    return {
        status: status,
        data: data
    }
}


export const getConsultantsMe = async () => {
    var status, data;
    const response = await api
        .get('/consultants/me')
        .then((response) => {
            status = response.status
            console.log(status) // должен быть 200 при успехе
            data = response.data
        })
        .catch((error) => {
            status = error.request.status // должен быть 404(Consultant dosen`t exist!) при неуспехе
        })
    return {
        status: status,
        data: data
    }
}


export const getPatientsMe = async () => {
    var status, data;
    const response = await api
        .get('/patients/me')
        .then((response) => {
            status = response.status
            console.log(status) // должен быть 200 при успехе
            data = response.data
        })
        .catch((error) => {
            status = error.request.status // должен быть 404(Patient dosen`t exist!) при неуспехе
        })
    return {
        status: status,
        data: data
    }
}
