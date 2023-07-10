import { Link } from "react-router-dom";


export default function NotePreview({ note }) {


	return (
		<Link to={`${note.id}`} className="flex flex-col gap-4 w-96 overflow-hidden bg-[#1e1e1e] p-4 rounded-lg shadow-lg hover:scale-105 transform transition

		">
			<h1 className="text-xl font-bold">{note.noteTitle}</h1>
			<hr className="border-2 border-gray-500" />


			<footer className="flex flex-col items-start justify-between gap-4">
				<small className="text-gray-500">Created at: {
					new Date(note.noteCreated).getDate().toString().padStart(2, "0") + "/" +
					new Date(note.noteCreated).getMonth().toString().padStart(2, "0") + "/" +
					new Date(note.noteCreated).getFullYear() + " " +
					new Date(note.noteCreated).getHours().toString().padStart(2, "0") + ":" +
					new Date(note.noteCreated).getMinutes().toString().padStart(2, "0") + ":" +
					new Date(note.noteCreated).getSeconds().toString().padStart(2, "0")
				}</small>
				<small className="text-gray-500">Modified at: {
					new Date(note.noteModified).getDate().toString().padStart(2, "0") + "/" +
					new Date(note.noteModified).getMonth().toString().padStart(2, "0") + "/" +
					new Date(note.noteModified).getFullYear() + " " +
					new Date(note.noteModified).getHours().toString().padStart(2, "0") + ":" +
					new Date(note.noteModified).getMinutes().toString().padStart(2, "0") + ":" +
					new Date(note.noteModified).getSeconds().toString().padStart(2, "0")
				}</small>
			</footer>
		</Link>
	);
}