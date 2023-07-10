import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../models/routes";


export default function NotePreview({ note }) {
	const navigate = useNavigate();

	return (
		<Link to={`${note.id}`} className="flex flex-col gap-4 w-96 overflow-hidden bg-[#1e1e1e] p-4 rounded-lg shadow-lg hover:scale-105 transform transition

		">
			<h1 className="text-2xl font-bold">{note.noteTitle}</h1>
			<hr className="border-2 border-gray-500" />
			{/* <p className="text-lg max-h-10 overflow-hidden">{note.noteBody}</p> */}



			<footer className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-col items-center gap-4">
					<small className="text-gray-500">Created at: {
						new Date(note.noteCreated).getDate() + "/" +
						new Date(note.noteCreated).getMonth() + "/" +
						new Date(note.noteCreated).getFullYear() + " " +
						new Date(note.noteCreated).getHours() + ":" +
						new Date(note.noteCreated).getMinutes() + ":" +
						new Date(note.noteCreated).getSeconds()
					}</small>
					<small className="text-gray-500">Modified at: {
						new Date(note.noteModified).getDate() + "/" +
						new Date(note.noteModified).getMonth() + "/" +
						new Date(note.noteModified).getFullYear() + " " +
						new Date(note.noteModified).getHours() + ":" +
						new Date(note.noteModified).getMinutes() + ":" +
						new Date(note.noteModified).getSeconds("00")
					}</small>
				</div>
				<button className="px-4 py-2 rounded-md bg-[#d32f2f] focus:outline-none focus:ring-2 focus:ring-gray-400"
					onClick={() => {
						// Delete the note
						fetch(`https://localhost:44390/api/Notes/`, {
							method: "DELETE",
							headers: {
								"Content-Type": "application/json",
								"x-api-key": import.meta.env.VITE_API_KEY
							},
							body: JSON.stringify({
								noteId: note.id
							})
						})
						navigate(0);
					}
					}
				>Delete</button>
			</footer>
		</Link>
	);
}