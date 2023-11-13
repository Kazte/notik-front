import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Note, PrivateRoutes} from '../../models';
import NotesService from '../../services/note.service';
import {useSelector} from 'react-redux';
import {AppStore} from '../../redux/store';
import {Button, Spinner, TabButton} from '../../components';
import CodeMirror from '@uiw/react-codemirror';
import MarkdownPreview from '@uiw/react-markdown-preview';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import {languages} from '@codemirror/language-data';
import {vscodeDarkInit} from '@uiw/codemirror-theme-vscode';
import {EditIcon} from '../../icons';


type PreviewMode = 'preview' | 'edit'

export default function NoteDetailPage() {

  const params = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note>();
  const [viewMode, setViewMode] = useState<PreviewMode>('edit');
  const userState = useSelector((store: AppStore) => store.user);

  useEffect(() => {
    const noteGuid: string = params.guid as string;
    getNoteFromServer(noteGuid);
  }, [params]);

  const getNoteFromServer = async (noteGuid: string) => {
    try {
      const data = await NotesService.getNoteByGuid(userState.token, noteGuid);
      setNote(data);
    } catch (error) {
      console.error('getNoteFromServer', error);
    }
  };

  const handlerOnSave = async () => {
    try {
      if (!note) return console.error('handlerOnSave', 'note is null');


      const newNote: Note = {
        ...note,
        noteModified: new Date().toISOString()
      };

      const response = await NotesService.updateNote(userState.token, newNote);

      if (response.result) {
        console.log('Note updated');
      } else {
        console.log('Note not updated');
      }
    } catch (error) {
      console.error('handlerOnSave', error);
    }
  };
// window.location.origin
  const handlerOnDelete = async () => {
    const res = confirm('Are you sure you want to delete this note?');

    if (res) {
      try {
        if (!note) return console.error('handlerOnDelete', 'note is null');

        const response = await NotesService.deleteNote(userState.token, note.id!);

        if (response.result) {
          navigate(`/${PrivateRoutes.NOTES}`, {replace: true});
        }
      } catch (error) {
        console.error('handlerOnDelete', error);
      }
    }
  };


  if (note === null) {
    return (<div className='container mx-auto px-4'>
      <Spinner/>
    </div>);
  }

  return (
    <div className='container mx-auto px-4 m-4 flex flex-col gap-2 h-full'>

      <div className='w-full mx-auto h-12 flex flex-row items-center justify-between gap-4'>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>
            <EditIcon fill='white'/>
          </div>
          <input
            type='text'
            id='noteTitle-icon'
            className='bg-[#1e1e1e] text-white text-lg block w-full pl-12 p-2.5' placeholder='Note Title'
            value={note?.noteTitle}
            onChange={
              (e) => {
                if (!note) return console.error('onChange', 'note is null');

                setNote({
                  ...note,
                  noteTitle: e.target.value
                });
              }
            }>
          </input>
        </div>
        <select
          className='bg-[#1e1e1e] text-white text-lg block w-[40%] pl-12 p-2.5'
          value={note?.public ? 2 : 1}
          onChange={
            (e) => {
              if (!note) return console.error('onChange', 'note is null');

              setNote({
                ...note,
                public: e.target.value === '2'
              });
            }
          }
        >
          <option value='1'>Private</option>
          <option value='2'>Public</option>
        </select>
      </div>
      <div className='w-full mx-auto h-12 flex flex-row items-center justify-end gap-4'>
        <div className='flex flex-row justify-start items-center flex-grow'>
          <p className='w-[100px]'> Share link</p>
          <input className='flex-row w-full resize-none bg-surface h-full p-2' value={`${window.location.origin}/share/${note?.guid}`} contentEditable='false'></input>
          <TabButton isActive={false} onClick={() => {navigator.clipboard.writeText(`${window.location.origin}/share/${note?.guid}`)}}>Copy</TabButton>
        </div>

        <TabButton isActive={viewMode === 'edit'} onClick={() => setViewMode('edit')}>Edit</TabButton>
        <TabButton isActive={viewMode === 'preview'} onClick={() => setViewMode('preview')}>Preview</TabButton>
      </div>
      <div className='h-[calc(100vh-350px)]'>
        {
          viewMode === 'edit' ?
            <>
              <CodeMirror
                value={note?.noteBody}
                onChange={(value) => {
                  if (!note) return console.error('onChange', 'note is null');

                  setNote({
                    ...note,
                    noteBody: value
                  });
                }}
                theme={vscodeDarkInit({
                  settings: {
                    caret: '#c6c6c6',
                    fontFamily: 'monospace',
                  }
                })}
                height='100%'
                className='h-full'
                extensions={
                  [
                    markdown({
                      base: markdownLanguage,
                      codeLanguages: languages
                    })]
                }
              />
            </>
            :
            <>
              <MarkdownPreview
                disableCopy={true}
                linkTarget={'_blank'}
                source={note.noteBody}
                className='h-full p-4 overflow-y-auto bg-surface'
                rehypeRewrite={(node, _, parent) => {
                  if (node.tagName === 'a' && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                    parent.children = parent.children.slice(1);
                  }
                }}
              />
            </>
        }
      </div>

      <div className='w-full mx-auto h-12 flex flex-row items-center justify-end gap-4'>
        <Button onClickHandler={handlerOnSave} text='Save' color='green'/>
        <Button onClickHandler={handlerOnDelete} text='Delete'/>
      </div>
    </div>
  );
}