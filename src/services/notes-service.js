import { BASE_URL_API } from "../utils/config";

const baseNotesUrl = `${BASE_URL_API}/Notes`

const NotesService = {
	getAllFromUser: async (token, userId) => {
		const response = await fetch(`${baseNotesUrl}/GetNotesByUserID/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
				"Authorization": `Bearer ${token}`
			}
		});
		const data = await response.json();
		return data;
	},

	updateNote: async (token, note) => {
		const response = await fetch(`${baseNotesUrl}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(note)
		});
		const data = await response.json();
		return data;
	},

	createNote: async (token, note) => {
		const response = await fetch(`${baseNotesUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(note)
		});
		const data = await response.json();
		return data;
	},

	deleteNote: async (token, noteId) => {
		const response = await fetch(`${baseNotesUrl}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({ noteId: noteId })
		});
		const data = await response.json();
		return data;
	},

	getNoteById: async (token, noteId) => {
		const response = await fetch(`${baseNotesUrl}/${noteId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY,
				"Authorization": `Bearer ${token}`
			},
		});
		const data = await response.json();
		return data;
	}
}


export default NotesService;