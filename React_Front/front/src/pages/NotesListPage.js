import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Add a small delay before getting the notes
    const delay = setTimeout(() => {
      getNotes();
    }, 300); // Delay of 300 milliseconds (0.3 seconds)

    // Clear the timeout if the component unmounts before the delay
    return () => clearTimeout(delay);
  }, []);

  const getNotes = async () => {
    let res = await axios.get('/api/notes/');
    let data = res.data;
    setNotes(data);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; NOTES</h2>
        <p className='notes-count'>{filteredNotes.length}</p>
      </div>
      <div className='search-area'>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearch}
          placeholder='Search notes...'
        />
      </div>
      <div className='notes-list'>
        {filteredNotes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
