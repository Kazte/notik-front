import { NotesPreview } from '../../components'
import { useSeo } from '../../hooks'
import { Note } from '../../models'


export default function NotesPage() {

	useSeo({ title: 'Notes', desription: 'Notes page' })

	const note: Note = {
		id: 1,
		noteTitle: 'Title',
		noteBody: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit deleniti in maiores eos dolorem, repellendus quasi amet quae rem est. Lorem sum dolor sit amet consectetur adipisicing elit. Hic ex est quis facere necessitatibus repellat eius numquam deleniti quidem rem! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat atque quidem aliquid accusamus fugit voluptatum, in debitis laboriosam reiciendis harum?',
		noteCreated: '2021-09-28T00:00:00.000Z',
		noteModified: '2021-09-28T00:00:00.000Z',
		public: false,
		userId: 4,
	}


	return (
		<ul className="flex flex-wrap gap-4 justify-center items-center p-4">
			{
				Array(10).fill(note).map((note, index) => (
					<NotesPreview key={index} note={note} />
				))
			}

		</ul>
	)
}