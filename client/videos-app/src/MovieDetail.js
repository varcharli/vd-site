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

  const directors = movie.directors || [];
  const actors = movie.actors || [];
  const tags = movie.tags || [];

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
      <p>Directors: {directors && directors.length > 0 ? (
        <ul>
          {directors.map((director, index) => (
            <li key={index}>
              <a href={`/directors/${director.id}`}>{director.name}</a>
            </li>
          ))}
        </ul>
      ) : (
        "N/A"
      )}</p>
      <p>Actors: {actors && actors.length > 0 ? (
        <ul>
          {actors.map((actor, index) => (
            <li key={index}>
              <a href={`/actors/${actor.id}`}>{actor.name}</a>
            </li>
          ))}
        </ul>
      ) : (
        "N/A"
      )}
      </p>

      <p>Tags: {tags && tags.length > 0 ? (
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              <a href={`/tags/${tag.id}`}>{tag.name}</a>
            </li>
          ))}
        </ul>
      ) : (
        "N/A"
      )}
      </p>

      {/* <p>posterUrl:{movie.posterUrl}</p> */}
    </div>
  );
};

export default MovieDetail;