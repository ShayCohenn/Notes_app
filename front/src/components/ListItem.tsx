import React from 'react';
import { Link } from 'react-router-dom';
import { Note } from '../redux/notesSlice';

interface ListItemProps {
  note: Note;
}

const ListItem: React.FC<ListItemProps> = ({ note }) => {

  const getTime = (note: Note) => {
    return new Date(note.updated).toDateString();
  }

  return (
    <div className='notes-list-item'>
      <Link to={`/note/${note.id}`}>
        <h3>{note.title}</h3>
        <p><span>{getTime(note)}</span></p> 
      </Link>
    </div>
  );
}

export default ListItem;