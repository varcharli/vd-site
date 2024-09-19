import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  // const [query, setQuery] = useState('');
  const query = location.state?.query || '';
  const containerRef = useRef(null);

  useEffect(() => {
    fetchMovies(pagination.page, pagination.pageSize, query);
  }, [pagination.page, pagination.pageSize, query]);

  const handleMovieClick = (id) => {
    window.open(`/movie/${id}`, '_blank');
  };
  
  useEffect(() => {
    const calculatePageSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 20; // 减去padding
        const itemWidth = 200+20; // 假设每个项目的宽度是200px
        const itemsPerRow = Math.floor(containerWidth / itemWidth);
        const newPageSize = itemsPerRow * Math.ceil(pagination.pageSize / itemsPerRow);
        setPagination((prev) => ({ ...prev, pageSize: newPageSize }));
      }
    };

    calculatePageSize();
    window.addEventListener('resize', calculatePageSize);

    return () => {
      window.removeEventListener('resize', calculatePageSize);
    };
  }, [pagination.pageSize]);

  const fetchMovies = async (page, pageSize, query) => {
    try {
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
  
  const renderPageNumbers = () => {
    const { page, totalPages } = pagination;
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={page === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(1, page - 2);
      const endPage = Math.min(totalPages, page + 2);

      if (startPage > 1) {
        pageNumbers.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>
        );
        if (startPage > 2) {
          pageNumbers.push(<span key="start-ellipsis">...</span>);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={page === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(<span key="end-ellipsis">...</span>);
        }
        pageNumbers.push(
          <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="container">
      <div className='container-title'>
        Movies
        <span className='spacer' ></span>
        <span className='container-subtitle'>
          Total Records:
          &nbsp;
           {pagination.totalRecords}</span>
      </div>

      <div className='container-content' ref={containerRef}>
        {error && <p>Error: {error}</p>}
        <ul className='ul-movies'>
          {movies.map((movie, index) => (
            <li key={movie.id} 
            style={{ backgroundColor: colors[index % colors.length] }}
            onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={movie.posterUrl || defaultImage}
                alt={movie.name}
                onError={(e) => { e.target.src = defaultImage; }}
                referrerpolicy="no-referrer"
              />
              <div className="movie-info">
                <h2>{movie.name}</h2>
                <p>{new Date(movie.releaseDate).toISOString().split('T')[0]}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination">
          <button
            onClick={() => handlePageChange(1)}
            disabled={pagination.page === 1}
          >
            <i className="fas fa-angle-double-left"></i>
          </button>
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <i className="fas fa-angle-left"></i>
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
          >
            <i className="fas fa-angle-right"></i>
          </button>
          <button
            onClick={() => handlePageChange(pagination.totalPages)}
            disabled={pagination.page === pagination.totalPages}
          >
            <i className="fas fa-angle-double-right"></i>
          </button>
        </div>
    </div>
  );
};

export default Movies;