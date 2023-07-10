import { useState } from "react";
import { useEffect } from "react";
import { NotePreview } from "../../components";
import AddIcon from "../../icons/AddIcon";
import { BASE_URL_API } from "../../utils/config";
import { useSelector } from "react-redux";
import NotesService from "../../services/notes-service";

export default function NotesPage() {

	const userState = useSelector((store) => store.user);

	const [notes, setNotes] = useState([]);

	useEffect(() => {
		// Get the notes from the server
		getAllNotesFromUser();
	}, [userState]);

	const getAllNotesFromUser = async () => {
		try {
			const userId = userState.userId
			const token = userState.token
			const data = await NotesService.getAllFromUser(token, userId);


			const notesSorted = data.sort((a, b) => {
				return new Date(b.noteModified) - new Date(a.noteModified);
			});

			setNotes(notesSorted);

		}
		catch (error) {
			console.error("fetchAllNotes", error);
		}
	}

	const handleNewNote = async () => {
		try {
			const token = userState.token

			const newNote = {
				"noteTitle": "New Note",
				"noteBody": "",
				"noteCreated": new Date().toISOString(),
				"noteModified": new Date().toISOString(),
				"userId": userState.userId
			}

			const data = await NotesService.createNote(token, newNote)


			const newNotes = [...notes, data.data];

			const notesSorted = newNotes.sort((a, b) => {
				return new Date(b.noteModified) - new Date(a.noteModified);
			});

			setNotes(notesSorted);
		} catch (error) {
			console.error("newNote", error);
		}
	}





	return (
		<>
			<div className="fixed bottom-32 right-4 bg-[#4caf50]  p-4 rounded-full cursor-pointer transition hover:shadow-lg hover:bg-[#43a047] hover:scale-105 duration-300 ease-in-out" onClick={handleNewNote}>
				<AddIcon />
			</div>
			<div className="flex flex-col flex-wrap items-center justify-center gap-4">

				<h1 className="text-4xl font-bold">Notes</h1>

				<div className="flex flex-row flex-wrap items-center justify-center gap-4">
					{notes.map(note => <NotePreview key={note.id} note={note} />)}
				</div>
			</div>
		</>
	);
}