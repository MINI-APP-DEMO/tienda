import axios, {AxiosResponse, HeadersDefaults,Method } from 'axios'
import { Notificacion } from './Notiflix'

interface IHttp { 
 baseURL?:string
 url: string
 params?: string | object
 headers?:HeadersDefaults
}

export interface IHttpResponse {
  data: any;
  status: number;
  statusText: string;
  error?: string;
}
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    console.log("error request::", error);
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log("response Interceptor ::", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const newResponse = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response) {
      const errorResponse = error.response;
      return Promise.reject({
        status: errorResponse.status,
        statusText: errorResponse.statusText,
        error: error.message,
      });
    }
    return Promise.reject(error);
  }
);


const parseParamsToString = (params: string | object) => { 
 let paramstring='?'
 if (typeof params == 'string') {
  return paramstring + params
 } else { 
  const keys = Object.entries(params)
  for (let [key, value] of keys) {
   console.log('Params HTTP ::', [key, value])
   return paramstring
  }
 }
}

export const initialConfig = () => { 
 if (window.baseUrlAPI) axios.defaults.baseURL = window.baseUrlAPI
 else {  Notificacion.error('No se encontrò la URL BASE API');return; }

}

export const Http = {
  GET: (url: string, params?: string | object): Promise<IHttpResponse> => {
    initialConfig();
    if (params) url += parseParamsToString(params);
    return new Promise((resolve, reject) => {
      axios
        .get(url)
       .then((response) => {
        const newResponse: IHttpResponse = {
         data: response.data,
         status: response.status,
         statusText:response.statusText
         };
          resolve(newResponse);
        })
       .catch((err) => {
        console.log('ERROR GET::',err)
          reject(err);
        });
    });
  },
};