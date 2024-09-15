// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Movies from './Movies';
import Favorite from './Favorite';
import History from './History';
import './Navbar.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import user from './assets/user.png';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <div className="top-menu">
          <button className="icon-button-menu">
            <i className="fas fa-bars"></i>
          </button>
          <input type="text" placeholder="Search Movies" className="search-box" />
            <div className='menu-space'/>
            <div className="menu-icons">
            <button className="icon-button">
                <i className="fas fa-share-alt"></i>
              </button>
              <button className="icon-button">
                <i className="fas fa-plus"></i>
              </button>
              <button className="icon-button">
                <i className="fas fa-envelope"></i>
              </button>
            </div>
            <div className="user-icon">
              <img src={user} alt="User" className="user-photo" />
            </div>
          </div>
        <div >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
        </div>
      </div>
    </Router>
  );
}

export default App;