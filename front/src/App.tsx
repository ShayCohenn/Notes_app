import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import './App.css';
import NotesListPage from './pages/NotesListPage';
import NotesPage from './pages/NotesPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { toggleDarkMode } from './redux/darkModeSlice';
import Login from './components/Login';
import { setLog } from './redux/LoginSlicer'; // Make sure to import your setLog action

function App() {
  const dispatch = useDispatch<AppDispatch>();

  // Load initial value from local storage, default to true if no value
  const storedDarkMode = localStorage.getItem('darkMode');
  const initialDarkMode = storedDarkMode !== null ? JSON.parse(storedDarkMode) : true;

  const [darkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    dispatch(toggleDarkMode()); // Dispatch the action to toggle dark mode
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    // Check for access token in local storage and set the login status accordingly
    const access = localStorage.getItem('access');
    if (access) {
      dispatch(setLog());
    }
  }, [dispatch, darkMode]);

  const loginStatus = useSelector((state: RootState) => state.login.status);

  const toggleDarkModeHandler = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`container ${darkMode ? 'dark' : ''}`}>
        <div className='app'>
          <Header toggleDarkMode={toggleDarkModeHandler} />
          <Routes>
            {/* Conditional rendering based on login status */}
            {loginStatus === 'logged' ? (
              <Route path="/" element={<NotesListPage />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}
            <Route path="/note/:id" element={<NotesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
