import axios from 'axios';
import config from '../config';

const api = axios.create({
	baseURL: config.apiUrl,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});
api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (err) => {
		const originalRequest = err.config;
		if (err.response.status == 401 && err.config && !err.config._isRetry) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.post(`${config.apiUrl}/auth/refreshToken`, { withCredentials: true });
				localStorage.setItem('token', response.data.accessToken);
				return api.request(originalRequest);
			} catch (error) {
				console.log('не авторизован');
			}
		}
		throw err;
	}
);

export default api;
