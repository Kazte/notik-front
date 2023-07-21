import { Note } from '../models'
import { BASE_URL_API } from '../utilities'


const baseNotesUrl = `${BASE_URL_API}/Notes`

const NotesService = {
	getAllFromUser: async (token: string) => {
		const response = await fetch(`${baseNotesUrl}/GetNotesByUserID`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	},

	updateNote: async (token: string, note: Note) => {
		const response = await fetch(`${baseNotesUrl}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(note)
		})
		const data = await response.json()
		return data
	},

	createNote: async (token: string, note: Note) => {
		const response = await fetch(`${baseNotesUrl}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(note)
		})
		const data = await response.json()
		return data
	},

	deleteNote: async (token: string, noteId: number) => {
		const response = await fetch(`${baseNotesUrl}/${noteId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	},

	getNoteById: async (token: string, noteId: string) => {
		const response = await fetch(`${baseNotesUrl}/${noteId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		})
		const data = await response.json()
		return data
	},

	getNoteByGuid: async (token: string, guid: string) => {
		const response = await fetch(`${baseNotesUrl}/GetByGuid?guid=${guid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	},

	getShareNoteByGuid: async (token: string, guid: string) => {
		const response = await fetch(`${baseNotesUrl}/share?guid=${guid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	}

}


export default NotesService