import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import defaultImage from './assets/null_movie.jpeg'; // 引入默认图片
import ImageGallery from './ImageGallery';
import PlayLink from './PlayLink';

import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const movieId = parseInt(id);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // play link operations
  const [showPlayLink, setShowPlayLink] = useState(false);
  const handlePlayLinkClick = () => {
    setShowPlayLink(true);
  };
  const handleClosePlayLink = () => {
    setShowPlayLink(false);
  };

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

    fetchMovieById(movieId);
  }, [movieId]);

  if (loading) {
    return <div id='loading'>Loading...</div>;
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

  // gallery 相关
  const relatedPictures = movie.relatedPictures || [];
  const relatedPictureLinks = relatedPictures.map((pic) => pic.link);
  relatedPictureLinks.push(movie.posterUrl);
  const posterIndex = relatedPictureLinks.indexOf(movie.posterUrl);

  const openGallery = (index) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };
  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <div className="container">
      <div className="movie-detail">
        <button className="back-button icon-big-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="movie-title">{movie.name}</h1>
        <div className="top">
          <div className="top-left">

            <img src={movie.posterUrl || defaultImage} alt={movie.name}
              onError={(e) => { e.target.src = defaultImage; }}
              referrerpolicy="no-referrer"
              onClick={() => openGallery(posterIndex)
              }
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
          <div className="button-bar">
            <button className='icon-big-button' onClick={handlePlayLinkClick} >
              <i className="fas fa-link"></i>
            </button>
            <button className='icon-big-button' >
              <i className="fas fa-tag"></i>
            </button>
            <button className='icon-big-button' >
              <i className="fas fa-download"></i>
            </button>
          </div>
          {showPlayLink && <PlayLink movieId={movieId} onClose={handleClosePlayLink} />}
          <h1>简介</h1>
          <p>{movie.description}</p>
          <div className="related-pictures">
            <h1>相册</h1>
            <div className="pictures-gallery">
              {relatedPictures.map((pic, index) => (
                <img key={index}
                  src={pic.link}
                  alt={pic.id}
                  onError={(e) => { e.target.src = defaultImage; }}
                  referrerpolicy="no-referrer"
                  onClick={() => openGallery(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isGalleryOpen && (
        <ImageGallery
          images={relatedPictureLinks}
          onClose={closeGallery}
          index={currentImageIndex}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};

export default MovieDetail;