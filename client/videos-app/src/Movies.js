// src/Movies.js
import React, { useState, useEffect } from 'react';
import './index.css';
import './Movies.css';
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPGS-34Rg6iSkhVKJybQygmHqiKUMPkrEtKQ&s
import defaultImage from './assets/null_movie.jpeg'; // 引入默认图片

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const colors = [
    'rgb(254, 228, 203)',
    'rgb(209, 213, 219)',
    'rgb(187, 247, 208)',
    'rgb(191, 219, 254)',
    'rgb(254, 202, 202)',
    'rgb(233, 213, 255)'
  ];


  useEffect(() => {
    // fetch('/movies')
    fetch('/movies?limit=100')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="container">
      {/* <h1>Movies</h1> */}
      <div className='container-title'>
        Movies
      </div>
      <div className='container-content'>
        {error && <p>Error: {error}</p>}
        <ul className='ul-movies'>
          {movies.map((movie, index) => (
            <li key={movie.id} style={{ backgroundColor: colors[index % colors.length] }}>
              <img src={movie.imageUrl || defaultImage} alt={movie.title} />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>{movie.genre}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Movies;