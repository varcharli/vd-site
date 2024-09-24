// src/App.js
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

import Home from './Home';
import Movies from './Movies';
import MovieDetail from './MovieDetail';
import Favorite from './Favorite';
import History from './History';

import './Navbar.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import user from './assets/user.png';

function App() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // navigate('/movies', { state: { query } });
    navigate(`/movies?query=${query}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="main">
      <div className="App">
        <Navbar />
        <div className="content">
          <div className="top-menu">
            <button className="icon-button-menu">
              <i className="fas fa-bars"></i>
            </button>
            <div className='search-container'>
              <button className="search-icon"
                onClick={handleSearch}>
                <i className="fas fa-search"></i>
              </button>
              <input type="text" placeholder="Search Movies" className="search-box"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleKeyPress}
                onFocus={(e) => e.target.select()} // 添加 onFocus 事件处理程序
              />
            </div>
            <div className='menu-space' />
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
              <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;