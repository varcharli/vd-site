import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import defaultImage from './assets/null_movie.jpeg'; // 引入默认图片

import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieById = async (id) => {
      try {
        const response = await fetch(`/movies/${id}`);
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieById(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  // 确保 directors 和 actors 是数组
  const directors = movie.directors || [];
  const actors = movie.actors || [];
  const tags = movie.tags || [];

  return (
    <div className="container">
      <div className="movie-detail">
        <h1 className="movie-title">{movie.name}</h1>
        <div className="top">
          <div className="top-left">

            <img src={movie.posterUrl || defaultImage} alt={movie.name}
              onError={(e) => { e.target.src = defaultImage; }}
              referrerpolicy="no-referrer"
            />
          </div>
          <div className="top-mid"></div>
          <div className="top-right">
            <p>
              <span className="horizontal-list">
                <span className='label' > 导演：</span> {directors.length > 0 ? (
                  directors.map((director, index) => (
                    <span key={index}>
                      <a href={`/directors/${director.id}`}>{director.name}</a>
                    </span>
                  ))
                ) : (
                  ""
                )}
              </span>
            </p>
            <p>
              <span className="horizontal-list">
                <span className='label' >演员：</span>
                {actors.length > 0 ? (
                  actors.map((actor, index) => (
                    <span key={index}>
                      <a href={`/actors/${actor.id}`}>{actor.name}</a>
                    </span>
                  ))
                ) : (
                  ""
                )}</span>
            </p>

            <p>
              <span className="horizontal-list">
                <span className='label' >标签：</span>
                {tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span key={index}>
                      <a href={`/tags/${tag.id}`}>{tag.name}</a>
                    </span>
                  ))
                ) : (
                  ""
                )}
              </span>
            </p>

            <p><span className='label' >日期：</span><span>{movie.releaseDate}</span> </p>
            <p><span className='label' >评分：</span> {movie.rating}</p>
            <p>
              <span className="horizontal-list">
                <span className='label' >来源：</span>
                <span><a href={movie.fromUrl} >点击跳转</a></span>
              </span>
            </p>
          </div>
        </div>
        <div className="down">
          <h1>简介</h1>
          <p>{movie.description}</p>
        </div>
      </div></div>
  );
};

export default MovieDetail;