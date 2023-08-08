import axios from 'axios';
import { isNull, omit } from 'lodash';

import theme from '../themes';
import { apiHost } from './api-host';

/* eslint quote-props: 0 */
export const axiosInstance = axios.create({
  baseURL: `${apiHost}/v1`,
  timeout: 600000, // Are 10 minutes too much?
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const AUTH_TOKEN = localStorage.getItem('phoenixAuthToken');
    const EXP_TOKEN = localStorage.getItem('phoenixExpToken');

    /* eslint security/detect-unsafe-regex: 0 */
    const isExternalUrl = /^(?:[a-z]+:)?\/\//.test(config.url); // universal, non case-sensitive, protocol-agnostic
    // Remove all headers when requesting 3rd party APIs
    if (isExternalUrl) {
      return omit(config, 'headers');
    }

    // Append authorization header if jwt token is available in localStorage
    if (!isNull(AUTH_TOKEN)) {
      return {
        ...config,
        headers: {
          ...config.headers,
          'Authorization-Exp': EXP_TOKEN,
          Authorization: AUTH_TOKEN,
        },
      };
    }

    // Return default config
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const EXP_TOKEN = response.headers['authorization-exp'];

    if (EXP_TOKEN) {
      localStorage.setItem('phoenixExpToken', EXP_TOKEN);
    }

    return response;
  },
  (error) => Promise.reject(error)
);
