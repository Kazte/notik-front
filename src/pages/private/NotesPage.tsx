import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NotesPreview } from '../../components'
import { useSeo } from '../../hooks'
import { Note } from '../../models'
import { AppStore } from '../../redux/store'
import { note } from '../../services'
import NotesService from '../../services/note.service'


export default function NotesPage() {

	useSeo({ title: 'Notes', desription: 'Notes page' })


	const userState = useSelector((store: AppStore) => store.user)
	const [notes, setNotes] = useState<Note[]>([])

	useEffect(() => {
		getNotes()
	}, [])

	const getNotes = async () => {
		try {
			const response = await NotesService.getAllFromUser(userState.token, userState.id)

			setNotes(response)
		} catch (error) {
			console.error('getNotes error\n', error)
		}
	}


	return (
		<div className="container mx-auto px-4">
			<h1 className="text-3xl font-bold">My Notes</h1>
			<ul className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] align-start justify-center gap-4 mt-4">
				{
					notes.map((note, index) => (
						<NotesPreview key={index} note={note} />
					))
				}

			</ul>
		</div>
	)
}