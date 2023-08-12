import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchNotes } from '../redux/notesSlice';
import { toggleSidebar } from '../redux/sidebarSlice'; // Import the sidebar action
import AddButton from '../components/AddButton';
import ListItem from '../components/ListItem';
import Sidebar from '../components/sidebar';


interface Note {
  id: number;
  title: string;
  body: string;
  updated: string;
}

const NotesListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotes = notes.filter((note: Note) => {
    return note.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };
  

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>
          <button className='settings-btn' onClick={handleSidebarToggle}>
            &#9782;
          </button>
          NOTES
        </h2>
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
      <Sidebar/>
    </div>
  );
};

export default NotesListPage;
