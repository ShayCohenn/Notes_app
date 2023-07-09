import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.js';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`container ${darkMode ? 'dark' : ''}`}>
        <div className='app'>
          <Header toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" exact Component={NotesListPage} />
            <Route path="/note/:id" Component={NotePage} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
