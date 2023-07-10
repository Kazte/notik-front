
import { useEffect } from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useParams } from 'react-router-dom';
import { Spinner } from '../../components';
import NotesService from '../../services/notes-service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../models/routes';

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
		<>
			<header className="flex flex-col items-center justify-between gap-4 w-full px-4 ">
				{/* <h1 className="text-2xl font-bold">{note?.noteTitle}</h1> */}
				<input type="text" className=" w-full text-3xl md:w-3/4 px-4 py-2 rounded-md shadow-lg bg-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-gray-400 text-center" value={note?.noteTitle}
					onChange={(e) => setNote({
						...note,
						noteTitle: e.target.value
					})}
				/>

				<nav className="flex flex-row items-center justify-between gap-1 w-full  md:w-3/4 rounded-md p-2 ">
					<div className="flex flex-row gap-2">
						<button
							disabled={viewState === previewState.MARKDOWN}
							className={`px-4 py-2 bg-[#1e1e1e] rounded-sm border-b-2 transition hover:border-gray-300 
							${viewState === previewState.MARKDOWN ? "border-gray-300" : "border-transparent"}
							`}
							onClick={() => handleOnClickView(previewState.MARKDOWN)}>
							Markdown
						</button>
						<button
							className={`px-4 py-2 bg-[#1e1e1e] rounded-sm border-b-2 transition hover:border-gray-300 
							${viewState === previewState.PREVIEW ? "border-gray-300" : "border-transparent"}
							`}
							onClick={() => handleOnClickView(previewState.PREVIEW)}>
							Preview
						</button>
					</div>
				</nav>
			</header>

			<main className="flex flex-col gap-4 w-full mx-auto md:w-3/4 h-[63vh] p-4">
				{viewState === previewState.MARKDOWN &&
					<textarea
						className="resize-none w-full h-full bg-[#1e1e1e] p-4 rounded-lg shadow-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
						value={note?.noteBody}
						onChange={(e) => {
							setNote({
								...note,
								noteBody: e.target.value
							})
						}}
					></textarea>
				}

				{viewState === previewState.PREVIEW &&
					// <div className="w-full h-full bg-[#1e1e1e] p-4 rounded-lg shadow-lg focus:outline-none focus:ring-1 focus:ring-gray-400">
					// 	{note?.noteBody}
					// </div>

					<ReactMarkdown
						className='prose prose-invert max-w-none overflow-auto h-full bg-[#1e1e1e] p-4 rounded-lg shadow-lg focus:outline-none focus:ring-1 focus:ring-gray-400'
						components={{
							code({ node, inline, className, children, ...props }) {
								const match = /language-(\w+)/.exec(className || '')
								return !inline && match ? (
									<SyntaxHighlighter
										{...props}
										children={String(children).replace(/\n$/, '')}
										style={dark}
										language={match[1]}
										PreTag="div"
										showLineNumbers={true}
									// wrapLines={true}
									// wrapLongLines={true}
									/>
								) : (
									<code {...props} className={className}>
										{children}
									</code>
								)
							}
						}}
					>
						{note?.noteBody}
					</ReactMarkdown>
				}
			</main>

			<footer className="flex flex-row items-center justify-end mx-auto gap-1 w-full md:w-3/4 rounded-md p-4">
				<div className="flex flex-row gap-2">
					<button
						className="px-4 py-2 bg-[#1e1e1e] transition border-b-2 rounded-sm border-transparent hover:border-[#4caf50]"
						onClick={handleOnClickSave}
					>Save
					</button>

					<button
						className="px-4 py-2 bg-[#1e1e1e] transition border-b-2 rounded-sm border-transparent hover:border-[#d32f2f]"
						onClick={handleOnNoteDelete}
					>Delete
					</button>
				</div>
			</footer>

		</>
	);
}