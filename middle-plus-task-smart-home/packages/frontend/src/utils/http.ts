import axios, {
  type AxiosRequestHeaders,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type AxiosRequestConfig,
} from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5115/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (httpConfig: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      httpConfig.headers = {
        ...httpConfig.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
    return httpConfig;
  },
  (error) => {
    Promise.reject(error)
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosResponse | never> => {
    const request: AxiosRequestConfig & { _retry?: boolean } = error.config!;
    const status = error.response?.status;
    if (status === 401 && request && !request._retry) {
      request._retry = true;

      try {
        const { data } = await axiosInstance.post(
          '/auth/refresh',
          {},
          { withCredentials: true },
        );
        localStorage.setItem('token', data);

        return axiosInstance.request(request);
      } catch (err) {
        console.error('Unauthorized');
      }
    }

    return Promise.reject(error);
  },
);