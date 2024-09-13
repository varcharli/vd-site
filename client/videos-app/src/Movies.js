// src/Movies.js
import React, { useState, useEffect } from 'react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title} - Directed by {movie.director}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;