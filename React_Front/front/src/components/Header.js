import React from 'react'
import { ReactComponent as Sun } from '../assets/sun.svg'

const Header = () => {
  return (
    <div className='app-header'>
    <h1>Note List</h1>
    <button><Sun/></button>
    </div>
  )
}
export default Header