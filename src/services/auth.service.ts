import { BASE_URL_API } from '../utilities'

const baseAuthUrl = `${BASE_URL_API}/Authentication`

const AuthService = {
	login: async (username: string, password: string) => {
		const response = await fetch(`${baseAuthUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password
			})
		})
		const data = await response.json()
		return data
	},
	register: async (username: string, email: string, password: string) => {
		const response = await fetch(`${baseAuthUrl}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, email, password }),
		})
		const data = await response.json()
		return data
	},

	verify: async (token: string) => {
		const response = await fetch(`${baseAuthUrl}/verify`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token }),
		})
		const data = await response.json()
		return data
	},

}

export default AuthService