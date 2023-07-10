import { BASE_URL_API } from "../utils/config";

const baseAuthUrl = `${BASE_URL_API}/Authentication`;

const AuthService = {
	login: async (username, password) => {
		const response = await fetch(`${baseAuthUrl}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY
			},
			body: JSON.stringify({
				username,
				password
			})
		});
		const data = await response.json();
		return data;
	},
	register: async (username, email, password) => {
		const response = await fetch(`${baseAuthUrl}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			body: JSON.stringify({ username, email, password }),
		});
		const data = await response.json();
		return data;
	},

	verify: async (token) => {
		const response = await fetch(`${baseAuthUrl}/verify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			body: JSON.stringify({ token }),
		});
		const data = await response.json();
		return data;
	},

};

export default AuthService;