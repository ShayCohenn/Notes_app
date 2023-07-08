import React from 'react'
import { Link } from 'react-router-dom'

const getTime = (note)=>{
  return new Date(note).toDateString()
}

const ListItem = ({note}) => {
  return (
    <div className='notes-list-item'>
        <Link to={`/note/${note.id}`}>
            <h3>{note.title}</h3>
            <p><span>{getTime(note.updated)}</span></p>
        </Link>
    </div>
  )
}

export default ListItem