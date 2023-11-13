import { useEffect, useState } from 'react'
import useSeo from '../../hooks/useSeo'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { Note } from '../../models'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppStore } from '../../redux/store'
import NotesService from '../../services/note.service'
import { Spinner } from '../../components'

export default function LoginPage() {
	useSeo({ title: 'Share', desription: 'Share page' })
	const userState = useSelector((store: AppStore) => store.user)
	const params = useParams()
	const [note, setNote] = useState<Note>()
	const [fetching, setFetching] = useState<boolean>(false)

	useEffect(() => {
		const noteGuid: string = params.guid as string
		getNoteFromServer(noteGuid)
	}, [params])

	const getNoteFromServer = async (noteGuid: string) => {
		try {
			setFetching(true)
			const response = await NotesService.getShareNoteByGuid(userState.token, noteGuid)

			if (response.result) {

				console.log(response.data);
				setNote(response.data)
			}
		} catch (error) {
			console.error('getNoteFromServerShare', error)
		}
		finally {
			setFetching(false)
		}
	}

	if (!fetching && !note) {
		return (
			<div className="container mx-auto px-4 m-4 flex flex-col gap-2 h-full">
				<h1 className="text-2xl font-bold w-full text-center">Note not found</h1>
			</div>
		)
	}



	return (
		<div className="container mx-auto px-4 m-4 flex flex-col gap-2 h-full">
			<h1 className="text-2xl font-bold w-full text-center">{note?.noteTitle}</h1>
			<div className='h-[calc(100vh-200px)]'>
				{
					note ?
						(
							<MarkdownPreview
								disableCopy={true}
								linkTarget={'_blank'}
								source={note.noteBody}
								className='h-full p-4 overflow-y-auto bg-surface'
								rehypeRewrite={(node, _, parent) => {
									if (node.tagName === 'a' && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
										parent.children = parent.children.slice(1)
									}
								}}
							/>
						) :
						(
							<Spinner />
						)
				}
			</div>
		</div>
	)
}
