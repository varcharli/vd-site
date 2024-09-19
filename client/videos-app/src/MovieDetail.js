import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import defaultImage from './assets/null_movie.jpeg'; // 引入默认图片

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

  return (
    <div className="movie-detail">
      <h1>{movie.name}</h1>
      <img src={movie.posterUrl || defaultImage} alt={movie.name} 
      onError={(e) => { e.target.src = defaultImage; }}
      referrerpolicy="no-referrer"
      />
      <p>{movie.description}</p>
      <p>Release Date: {movie.releaseDate}</p>
      <p>Rating: {movie.rating}</p>
      <p>posterUrl:{movie.posterUrl}</p>
    </div>
  );
};

export default MovieDetail;