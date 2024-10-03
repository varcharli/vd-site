import React, { useState, useEffect,useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';
import './Movies.css';
import defaultImage from './assets/null_movie.jpeg'; // 引入默认图片

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const isInitialRender = useRef(true);
  const [error, setError] = useState(null);
  const cstPageSize = 12
  const location = useLocation();
  const query = location.state?.query;
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: cstPageSize,
    totalPages: 0,
    totalRecords: 0,
  });

  // const navigate = useNavigate();
  // const [query, setQuery] = useState(''); 
  // const containerRef = useRef(null);

  // useEffect(() => {
  //   fetchMovies(pagination.page, pagination.pageSize, query);
  // }, [pagination.page, pagination.pageSize, query]);
  const fetchMovies = async (queryString) => {
    try {
      if (queryString === undefined) { queryString = ''; }
      const response = await fetch(`/api/movies?page=${pagination.page}&pageSize=${pagination.pageSize}&title=${queryString}`);
      const data = await response.json();
      setMovies(data.movies);
      setPagination(data.pagination);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (query) {
      console.log('query in effect:', query);
      fetchMovies(query);

    } else {
      const savedPagination = JSON.parse(localStorage.getItem('pagination'));
      if (savedPagination) {
        setPagination(savedPagination);
        pagination.page = parseInt(savedPagination.page, 10);
        fetchMovies(query);
      } else {
        fetchMovies('');
      }
    }
  }, [query]);


  function savePagination() {
    localStorage.setItem('pagination', JSON.stringify(pagination));
    console.log('set item pagination:', pagination);
  }  // Save pagination state to localStorage whenever it changes
  
  // useEffect(() => {
  //     // savePagination();
  //   // fetchMovies(query);
  //   localStorage.setItem('pagination', JSON.stringify(pagination));
  //   console.log('set item pagination:', pagination);
  // }, [pagination]);




  const colors = [
    'rgb(254, 228, 203)',
    'rgb(209, 213, 219)',
    'rgb(187, 247, 208)',
    'rgb(191, 219, 254)',
    'rgb(254, 202, 202)',
    'rgb(233, 213, 255)'
  ];

  const handleMovieClick = (id) => {
    // window.open(`/movie/${id}`, '_blank');
    window.location.href = `/movie/${id}`;
  };

  const handlePageChange = (newPage) => {
    pagination.page = newPage;
    savePagination();
    setPagination((prev) => ({ ...prev, page: newPage }));
    fetchMovies(query);
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

      <div className='container-body' >
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
                <h2 className='movie-name'>{movie.name}</h2>
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