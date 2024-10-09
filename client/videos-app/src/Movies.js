import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import './Movies.css';
import { ErrorInfo, MovieBox } from './components';
import api from './client/api';

const Movies = () => {

  const cstPageSize = 12

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page'), 10) || 1;
  const pageSize = parseInt(queryParams.get('pageSize'), 10) || cstPageSize;
  const [pagination, setPagination] = useState({
    page,
    pageSize,
    totalPages: 0,
    totalRecords: 0,
  });

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchMovies = async (queryString) => {
    try {
      if (queryString === undefined) { queryString = ''; }
      const response = await api.getMovies(
        { page: pagination.page, pageSize: pagination.pageSize, title: queryString });

      const data = response.data;
      setMovies(data.movies);
      setPagination(data.pagination);
    } catch (error) {
      setError('连接服务器出现错误：' + error.message + ' --- ' + error.response.data);
    }
  };

  useEffect(() => {
    // console.log('location.search:', location.search);
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    const page = parseInt(queryParams.get('page'), 10) || 1;
    const pageSize = parseInt(queryParams.get('pageSize'), 10) || 10;

    setPagination(prev => ({
      ...prev,
      page,
      pageSize,
    }));
    // console.log('search query:', query);
    pagination.page = page;
    fetchMovies(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handlePageChange = (newPage) => {
    // console.log('newPage:', newPage);
    queryParams.set('page', newPage);
    navigate(`?${queryParams.toString()}`);
    // window.location.reload();
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
        {error &&
          <ErrorInfo info={error} />
        }
        <ul className='ul-movies'>
          {movies.map((movie, index) => (
            <li>
              <MovieBox index={index} movie={movie} />
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