import { useState } from "react";
import { useEffect } from "react";
import { NotePreview } from "../../components";
import AddIcon from "../../icons/AddIcon";
import { BASE_URL_API } from "../../utils/config";
import { useSelector } from "react-redux";

export default function NotesPage() {

	const userState = useSelector((store) => store.user);

	const [notes, setNotes] = useState([]);
	useEffect(() => {
		// Get the notes from the server

		const userId = userState.userId
		const token = userState.token

		fetch(`https://localhost:44390/api/Notes/GetNotesByUserID/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `bearer ${token}`,
				"x-api-key": import.meta.env.VITE_API_KEY
			}
		})
			.then(res => res.json())
			.then(data => {
				const notesOrdererByDate = data.sort((a, b) => new Date(b.noteModified) - new Date(a.noteModified));
				setNotes(notesOrdererByDate);
			}
			)
	}, [userState]);

	const handleNewNote = () => {
		fetch(`${BASE_URL_API}/Notes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `bearer ${localStorage.getItem("jwt")}`,
				"x-api-key": import.meta.env.VITE_API_KEY
			},
			body: JSON.stringify({
				"noteTitle": "",
				"noteBody": "",
				"noteCreated": new Date().toISOString(),
				"noteModified": new Date().toISOString(),
				"userId": localStorage.getItem("userId")
			})

		})

			.then(res => res.json())
			.then(data => {
				console.log(data);
				// setNotes([...notes, data]);
			})
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