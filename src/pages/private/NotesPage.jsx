import { useState } from "react";
import { useEffect } from "react";
import { NotePreview } from "../../components";
import AddIcon from "../../icons/AddIcon";
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
		<div className="flex flex-col flex-wrap items-center justify-center gap-4">

			<h1 className="text-4xl font-bold">Notes</h1>

			<hr className="w-full md:w-3/4 mx-auto" />

			<div className="flex flex-row items-center justify-end w-full md:w-3/4 mx-auto">
				<div className="flex flex-row gap-2">
					<button
						className={`px-4 py-2 bg-[#1e1e1e] border-b-2 border-transparent transition hover:border-gray-300 hover:border-gray-300`}
						onClick={() => handleNewNote()}
					>
						Create New Note
					</button>
				</div>
			</div>



			<div className="grid w-full md:w-3/4 mx-auto gap-4"
				style={
					{
						"gridTemplateColumns": "repeat(auto-fit, minmax(300px, 1fr))",
					}
				}>
				{notes.map(note => <NotePreview key={note.id} note={note} />)}
			</div>
		</div >
	);
}