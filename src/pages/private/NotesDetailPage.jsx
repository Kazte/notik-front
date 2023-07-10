import Editor from "@monaco-editor/react"
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../components';
import NotesService from '../../services/notes-service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../models/routes';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { EditIcon } from "../../icons";

const previewState = {
	MARKDOWN: "markdown",
	PREVIEW: "preview"
}

export default function NotesDetailPage() {

	const [note, setNote] = useState(null)
	const [viewState, setViewState] = useState(previewState.MARKDOWN)
	const userState = useSelector((store) => store.user)
	const params = useParams()
	const navigator = useNavigate()


	useEffect(() => {
		// Get the note from the server
		const noteId = params.id;

		getNoteFromServer(noteId);

	}, [params, userState]);

	const getNoteFromServer = async (noteId) => {
		try {
			const data = await NotesService.getNoteById(userState.token, noteId);

			setNote(data)
		} catch (error) {
			console.error("getNoteFromServer", error);
		}
	}

	const handleOnClickView = (view) => {

		if (viewState === view)
			return;

		setViewState(view);
	}

	const handleOnClickSave = async () => {



		try {
			const json = {
				"id": note.id,
				"noteTitle": note.noteTitle,
				"noteBody": note.noteBody,
				"noteCreated": note.noteCreated,
				"noteModified": new Date().toISOString(),
				"userId": note.userId
			}
			const token = userState.token
			const data = await NotesService.updateNote(token, json)

			if (!data.result) {
				throw new Error("Error updating note")
			}

		} catch (error) {
			console.error("handleOnClickSave", error);
		}


	}

	const handleOnNoteDelete = async () => {
		const noteId = note.id
		try {
			const token = userState.token

			const data = await NotesService.deleteNote(token, noteId)

			if (data.result) {
				navigator(`/${PrivateRoutes.private}`, { replace: true })
			} else {
				throw new Error("Error deleteing note")
			}
		} catch (error) {
			console.error("handleOnNoteDelete", error);
		}
	}


	if (!note) {
		return (
			<Spinner />
		);
	}

	return (
		<div className="flex flex-col align-center w-full h-full gap-4">
			{/* icon inside input */}
			<div className="w-full md:w-3/4 mx-auto h-12 flex flex-row items-center justify-between">
				<div className="relative w-full">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
						<EditIcon />
					</div>
					<input
						type="text"
						id="noteTitle-icon"
						className="bg-[#1e1e1e] text-white text-lg block w-full pl-10 p-2.5" placeholder="Note Title"
						value={note?.noteTitle}
						onChange={(e) => setNote({
							...note,
							noteTitle: e.target.value
						})}>
					</input>
				</div>
			</div>

			<div className="flex flex-row items-center justify-between w-full md:w-3/4 mx-auto">
				<div className="flex flex-row gap-2">
					<button
						disabled={viewState === previewState.MARKDOWN}
						className={`px-4 py-2 bg-[#1e1e1e] border-b-2 transition hover:border-gray-300 
							${viewState === previewState.MARKDOWN ? "border-gray-300" : "border-transparent"}
							`}
						onClick={() => handleOnClickView(previewState.MARKDOWN)}>
						Markdown
					</button>
					<button
						className={`px-4 py-2 bg-[#1e1e1e] border-b-2 transition hover:border-gray-300 
							${viewState === previewState.PREVIEW ? "border-gray-300" : "border-transparent"}
							`}
						onClick={() => handleOnClickView(previewState.PREVIEW)}>
						Preview
					</button>
				</div>
			</div>

			<div className="flex flex-col w-full mx-auto md:w-3/4 h-[70%]">
				<div className={`${viewState === previewState.MARKDOWN ? "block" : "hidden"} h-full`}>
					<Editor
						height={"100%"}
						theme="vs-dark"
						value={note?.noteBody}
						defaultLanguage="markdown"
						options={{
							wordWrap: "on",
							minimap: {
								enabled: false
							}
						}}
						onChange={(value) => {
							setNote({
								...note,
								noteBody: value
							})
						}}
					/>
				</div>

				<div className={`${viewState === previewState.PREVIEW ? "block" : "hidden"} h-full`}>
					<MarkdownPreview
						disableCopy={true}
						linkTarget={'_blank'}
						className="prose prose-invert max-w-none w-full h-[58vh] overflow-y-auto bg-[#1e1e1e] p-4 scrollbar scrollbar-thumb-neutral-700 scrollbar-track-neutral-800"
						source={`${note?.noteBody}`}
						rehypeRewrite={(node, index, parent) => {
							if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
								parent.children = parent.children.slice(1)
							}
						}}

					/>
				</div>
			</div>

			<div className="flex flex-row gap-2 items-center justify-end mx-auto w-full md:w-3/4 h-[15%]">
				<button
					className="px-4 py-2 bg-[#1e1e1e] transition border-b-2 border-transparent hover:border-[#4caf50]"
					onClick={handleOnClickSave}
				>Save
				</button>

				<button
					className="px-4 py-2 bg-[#1e1e1e] transition border-b-2 border-transparent hover:border-[#d32f2f]"
					onClick={handleOnNoteDelete}
				>Delete
				</button>
			</div>

		</div>
	);
}