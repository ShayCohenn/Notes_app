import React from 'react';
import { ReactComponent as Sun } from '../assets/sun.svg';

const Header = ({ toggleDarkMode }) => {
  const handleClick = () => {
    toggleDarkMode();
  };

  return (
    <div className='app-header'>
      <h1>Note List</h1>
      <button onClick={handleClick}>
        <Sun />
      </button>
    </div>
  );
};

export default Header;
