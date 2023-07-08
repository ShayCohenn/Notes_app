import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const NOTES_URL = "/api/notes/"

const NotePage = () => {
  let { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  const getNote = async () => {
    if (id === 'new') return
    const res = await axios.get(`${NOTES_URL}${id}/`);
    const data = res.data;
    setNote(data);
  };

  const createNote = async () => {
    const data = {
      "title": note.title,
      "body": note.body
    }
    await axios.post(NOTES_URL, data)
  }

  const updateNote = async () => {
    const data = {
      "title": note.title,
      "body": note.body
    }
    await axios.put(`${NOTES_URL}${id}/`, data)
  }

  const deleteNote = async () => {
    await axios.delete(`${NOTES_URL}${id}/`)
  }

  const handleTitleChange = (e) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleBodyChange = (e) => {
    setNote({ ...note, body: e.target.value });
  };

  const handleSubmit = async () => {
    if (id !== 'new' && (!note.body || !note.title)) {
      deleteNote()
    }
    else if (id !== 'new') {
      updateNote()
    }
    else if (id === 'new' && note.body != null && note.title == null) {
      note.title = note.body.substring(0, 20);
      createNote()
    }
    else if(note.body == null)
    <Link to={"/"}/>
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to={"/"}>
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {id !== 'new' ?
          (<Link to={"/"}><button onClick={deleteNote}>Delete</button></Link>) :
          (<Link to={"/"}><button onClick={handleSubmit}>Done</button></Link>)}
      </div>
      <textarea
        value={note?.title || ''}
        onChange={handleTitleChange}
        style={{ height: "auto", padding: "0", textAlign: "center", fontSize: "2rem" }}></textarea>
      <hr />
      <textarea
        value={note?.body || ''}
        onChange={handleBodyChange}
      ></textarea>
    </div>
  );
};

export default NotePage;
