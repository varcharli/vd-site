// src/Movies.js

// Backend API: GET /api/movies
// return {
//   movies,
//   pagination: {
//     page,
//     pageSize,
//     totalPages,
//     totalRecords: count,
//   },


import React, { useState, useEffect } from 'react';
import './index.css';
import './Movies.css';
import defaultImage from './assets/null_movie.jpeg'; // 引入默认图片

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
  });
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchMovies(pagination.page, pagination.pageSize, query);
  }, [pagination.page, pagination.pageSize, query]);

  const fetchMovies = async (page, pageSize, query) => {
    try{
    const response = await fetch(`/movies?page=${page}&pageSize=${pageSize}&title=${query}`);
    const data = await response.json();
    setMovies(data.movies);
    setPagination(data.pagination);
    } catch (error) {
      setError(error.message);
    }
  };

  const colors = [
    'rgb(254, 228, 203)',
    'rgb(209, 213, 219)',
    'rgb(187, 247, 208)',
    'rgb(191, 219, 254)',
    'rgb(254, 202, 202)',
    'rgb(233, 213, 255)'
  ];

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
    fetchMovies(1, pagination.pageSize, query);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="container">
      {/* <h1>Movies</h1> */}
      <div className='container-title'>
        Movies
      </div>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        onKeyUp={handleKeyPress}
        placeholder="Search by title"
      />
      <button onClick={handleSearch}>Search</button>
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
      <div>
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
        >
          Previous
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;