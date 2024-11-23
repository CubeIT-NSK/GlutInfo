import axios from 'axios';

import { apiUrl } from "./config";


export const apiAuth = axios.create({
    baseURL: `${apiUrl}/auth/jwt`
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


export const postApiAuth = async ({username, password}) => {
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
  
  


