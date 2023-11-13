import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, NotesPreview } from '../../components'
import { useSeo } from '../../hooks'
import { Note } from '../../models'
import { AppStore } from '../../redux/store'
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
			const response = await NotesService.getAllFromUser(userState.token)

			setNotes(response.sort((a: Note, b: Note) => {
				if (a.noteModified > b.noteModified) {
					return -1
				}
				if (a.noteModified < b.noteModified) {
					return 1
				}
				return 0
			}))
		} catch (error) {
			console.error('getNotes error\n', error)
		}
	}

	const handlerOnAdd = async () => {
		try {
			const newNote: Note = {
				noteTitle: 'New Note',
				noteBody: '',
				noteCreated: new Date().toISOString(),
				noteModified: new Date().toISOString(),
				public: false
			}

			const response = await NotesService.createNote(userState.token, newNote)


			let newNotes: Note[] = []

			newNotes = ([...notes!, response])
			setNotes(newNotes)
		} catch (error) {
			console.error('handlerOnAdd error\n', error)
		}

	}

	return (
		<div className='flex flex-col'>
			<h1 className="text-3xl font-bold text-center">My Notes</h1>
			<div className="w-full mx-auto flex flex-row items-center justify-end gap-4">
				<Button onClickHandler={handlerOnAdd} text='Add' color='green' />
			</div>
			<div className="container mx-auto px-4">
				{notes.length === 0 ?
					(
						<div className="w-full mx-auto flex flex-col items-center justify-center">
							<h1 className="text-3xl font-bold text-center">No notes found.</h1>
							<h2 className="text-xl font-bold text-center">Click on Add button to create a new note.</h2>
						</div>
					) : (
						<ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,400px))] align-start justify-center gap-6 mt-4 ">

							<>
								{
									notes?.map(n => {
										return (
											<NotesPreview key={n.id} note={n} />
										)
									})
								}
							</>

						</ul>
					)
				}
			</div>
		</div>
	)
}