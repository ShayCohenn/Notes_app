import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Add a small delay before getting the notes
    const delay = setTimeout(() => {
      getNotes();
    }, 300); // Delay of 200 milliseconds (0.2 seconds)

    // Clear the timeout if the component unmounts before the delay
    return () => clearTimeout(delay);
  }, []);

  let getNotes = async () => {
    let res = await axios.get('/api/notes/');
    let data = res.data;
    setNotes(data);
  };

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; NOTES</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
      <div className='notes-list'>
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton/>
    </div>
  );
};

export default NotesListPage;
