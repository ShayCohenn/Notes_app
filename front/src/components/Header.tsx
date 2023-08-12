import React from 'react';
import Brightness6Icon from '@mui/icons-material/Brightness6';

interface HeaderProps {
  toggleDarkMode: () => void; 
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode }) => {
  return (
    <div className='app-header'>
      <h1>Note List</h1>
      <button onClick={toggleDarkMode}>
        <Brightness6Icon/>
      </button>
    </div>
  );
}

export default Header;
