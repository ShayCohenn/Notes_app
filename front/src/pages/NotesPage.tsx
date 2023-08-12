import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { store } from '../app/store';
import { selectNoteById, Note, addNote, updateNoteAsync, deleteNoteAsync } from '../redux/notesSlice';

const NotesPage = () => {
    let { id } = useParams();
    const noteId = parseInt(id || '');
    const selectedNote = useAppSelector(state => selectNoteById(state, noteId));
    const dispatch = useAppDispatch();

    const initialNote: Note = {
        id: 0,
        title: '',
        body: '',
        updated: '', // This is of type 'string', but you're not providing a valid value
        user: 0,
      };
      
    const [note, setNote] = useState<Note>(selectedNote || initialNote);

    useEffect(() => {
        setNote(selectedNote || initialNote);
    }, [selectedNote]);

    const createNote = async () => {
        const data = {
            "title": note.title,
            "body": note.body
        };

        const newNote: Note = {
            id: 0,
            user:0,
            updated: '',
            ...data,
        }; 
        dispatch(addNote(newNote));
    };

    const updateNote = async () => {
        const data = {
            "id": noteId,
            "title": note.title,
            "body": note.body,
            "updated": '',
            "user": note.user // Use the user property from the note object
        };
        dispatch(updateNoteAsync(data));
    };
    
    const deleteNote = async () => {
        dispatch(deleteNoteAsync(noteId))
    };

    const handleSubmit = async () => {
        if (id !== 'new' && (!note?.body || !note?.title)) {
            deleteNote();
        } else if (id !== 'new') {
            updateNote();
        } else if (id === 'new' && note?.body !== '') {
            if (note.title === null || note.title === '') {
                note.title = note.body.substring(0, 20); // Set title from body
            }
            createNote();
        }
        // You need to return the Link component here
        else if (note?.body === '') {
            return <Link to={"/"} />;
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote({ ...note, title: e.target.value });
    };

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote({ ...note, body: e.target.value });
    };

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to={"/"}>
                        <ArrowBackIcon onClick={handleSubmit} />
                    </Link>
                </h3>
                {id !== 'new' ?
                    (<Link to={'/'}><button onClick={deleteNote}>Delete</button></Link>) :
                    (<Link to={'/'}><button onClick={handleSubmit}>Done</button></Link>)}
            </div>
            <textarea
                value={note?.title || ''}
                onChange={handleTitleChange}
                style={{ height: "auto", padding: "0", textAlign: "center", fontSize: "2rem" }}
            />
            <hr />
            <textarea
                value={note?.body || ''}
                onChange={handleBodyChange}
            ></textarea>
        </div>
    );
};

export default NotesPage;
