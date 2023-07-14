import { Link } from 'react-router-dom'
import { Note, PrivateRoutes } from '../../models'

interface Props {
	note: Note;
}
export default function NotesPreview({ note }: Props) {
	return (
		<div className="transition-all duration-150 flex max-w-[350px]">
			<div className="flex flex-col items-stretch min-h-full transition-all duration-150 bg-surface rounded-lg shadow-lg p-2">
				<div className="flex flex-wrap items-center flex-1 text-center mx-auto p-2">
					<Link to={`/${PrivateRoutes.NOTES}/${note.id}`} className="hover:underline">
						<h2 className="text-2xl font-bold tracking-normal">
							{note.noteTitle}
						</h2>
					</Link>
				</div>
				<hr className="border-neutral-700" />
				<p className="line-clamp-4 overflow-hidden text-sm text-justify p-1">
					{note.noteBody}
				</p>
				<hr className="border-neutral-700" />
				<section className="flex flex-col items-start justify-between gap-1 p-1">
					<small className="text-gray-500">Created at: {
						new Date(note.noteCreated).getDate().toString().padStart(2, '0') + '/' +
						new Date(note.noteCreated).getMonth().toString().padStart(2, '0') + '/' +
						new Date(note.noteCreated).getFullYear() + ' ' +
						new Date(note.noteCreated).getHours().toString().padStart(2, '0') + ':' +
						new Date(note.noteCreated).getMinutes().toString().padStart(2, '0')
					}</small>
					<small className="text-gray-500">Modified at: {
						new Date(note.noteModified).getDate().toString().padStart(2, '0') + '/' +
						new Date(note.noteModified).getMonth().toString().padStart(2, '0') + '/' +
						new Date(note.noteModified).getFullYear() + ' ' +
						new Date(note.noteModified).getHours().toString().padStart(2, '0') + ':' +
						new Date(note.noteModified).getMinutes().toString().padStart(2, '0')
					}</small>
				</section>
			</div>
		</div>
	)
}