import './App.css';
import Header from './components/Header.js';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className='app'>
          <Header />
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
