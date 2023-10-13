import axios from 'axios';
import Cookies from 'js-cookie';
import { TOKEN } from './app.constants';

const API_URL = 'https://gateway.scan-interfax.ru/api';

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

$axios.interceptors.request.use(
	config => {
		const token = Cookies.get(TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);