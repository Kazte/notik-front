import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Note } from '../../models'
import NotesService from '../../services/note.service'
import { useSelector } from 'react-redux'
import { AppStore } from '../../redux/store'
import { Button, Spinner } from '../../components'
import CodeMirror from '@uiw/react-codemirror'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { xcodeDark } from '@uiw/codemirror-theme-xcode'
import { EditIcon } from '../../icons'


type PreviewMode = 'preview' | 'edit'

interface Props { }

export default function NoteDetailPage({ }: Props) {

	const params = useParams()
	const [note, setNote] = useState<Note | null>(null)
	const [viewMode, setViewMode] = useState<PreviewMode>('edit')
	const userState = useSelector((store: AppStore) => store.user)

	const [noteBody, setNoteBody] = useState<string>('')

	useEffect(() => {
		const noteId: string = params.id as string
		console.log('noteId', noteId)


		getNoteFromServer(noteId)
	}, [params])

	const getNoteFromServer = async (noteId: string) => {
		try {
			const data = await NotesService.getNoteById(userState.token, noteId)
			console.log(data)

			setNote(data)
			setNoteBody(data.noteBody)
		} catch (error) {
			console.error('getNoteFromServer', error)
		}
	}

	const handlerOnSave = async () => {
		console.log('save')
	}

	const handlerOnDelete = async () => {
		console.log('delete')
	}


	if (note === null) {
		return (<div className="container mx-auto px-4">
			<Spinner />
		</div>)
	}

	return (
		<div className="container mx-auto px-4 m-4 flex flex-col gap-2 h-full">

			<div className="w-full mx-auto h-12 flex flex-row items-center justify-between">
				<div className="relative w-full">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
						<EditIcon fill='white' />
					</div>
					<input
						type="text"
						id="noteTitle-icon"
						className="bg-[#1e1e1e] text-white text-lg block w-full pl-12 p-2.5" placeholder="Note Title"
						value={note?.noteTitle}
						onChange={(e) => setNote({
							...note,
							noteTitle: e.target.value
						})}>
					</input>
				</div>
			</div>
			<div className='h-[calc(100vh-300px)]'>
				{
					viewMode === 'edit' ?
						<>
							<CodeMirror
								value={noteBody}
								onChange={(value) => setNoteBody(value)}
								theme={xcodeDark}
								height='100%'
								className='h-full'
								extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
							/>
						</>
						:
						<>
							<MarkdownPreview
								disableCopy={true}
								linkTarget={'_blank'}
								source={noteBody}
								className='h-full p-4 overflow-y-auto bg-surface'
								rehypeRewrite={(node, index, parent) => {
									if (node.tagName === 'a' && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
										parent.children = parent.children.slice(1)
									}
								}}
							/>
						</>
				}
			</div>

			<div className="w-full mx-auto h-12 flex flex-row items-center justify-end gap-4">
				<Button onClickHandler={() => {
					setViewMode(viewMode === 'edit' ? 'preview' : 'edit')
				}} text='Change' style={'bg-gray-600 hover:bg-gray-700'} />
				<Button onClickHandler={handlerOnSave} text='Save' style={'bg-green-600 hover:bg-green-700'} />
				<Button onClickHandler={handlerOnDelete} text='Delete' />
			</div>
		</div>
	)
}