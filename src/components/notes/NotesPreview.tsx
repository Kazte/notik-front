import { Link } from 'react-router-dom'
import { Note, PrivateRoutes } from '../../models'
import { Badge } from '..'

interface Props {
	note: Note;
}
export default function NotesPreview({ note }: Props) {
	return (
		<div className="transition-all duration-150 flex min-w-[350px]  max-w-[400px] w-[20vw] h-[220px] mx-auto">
			<div className="flex flex-col items-stretch w-full h-full transition-all duration-150 bg-surface rounded-sm p-2">
				< div className="flex flex-wrap items-center mx-auto p-2 w-full" >
					<h2 className="text-xl font-bold tracking-normal line-clamp-1 w-full">
						<Link to={`/${PrivateRoutes.NOTES}/${note.guid}`} className="hover:underline w-full">
							{note.noteTitle}
						</Link>
					</h2>
				</div >
				<hr className="border-neutral-700" />
				<div className='flex-1'>
					<p className="line-clamp-4 overflow-hidden text-sm text-justify p-1">
						{note.noteBody}
					</p>
				</div>
				<hr className="border-neutral-700" />
				<section className="flex flex-row items-end justify-between gap-1 p-1">
					<div className="flex flex-col items-start justify-between gap-1 ">
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
						<small className="text-gray-500">{note.guid}</small>
					</div>

					{
						note.public ?
							<>
								<Badge color='green'>Public</Badge>
							</> :
							<>
								<Badge color='red'>Private</Badge>
							</>
					}
				</section>
			</div >
		</div >
	)
}