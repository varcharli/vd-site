import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import api from './client/api';
import defaultImage from './assets/null_movie.jpeg'; // 引入默认图片
import ImageGallery from './ImageGallery';
import PlayLink from './PlayLink';
import Tags, { TagField } from './Tags';
import { PageLoading } from './components';

import './MovieDetail.css';
import { RainbowButton, WindowCloseButton, TextButton } from './components/CommonButtons';
import { ErrorInfo } from './components';

import models from './client/models';
import { useGlobal } from './GlobalContext';

const MovieDetail = () => {
  const { user } = useGlobal();
  const { id } = useParams();
  const movieId = parseInt(id);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // play link operations
  const [playLinks, setPlayLinks] = useState([]);
  const handlePlayLinksUpdate = (updatedPlayLinks) => {
    setPlayLinks(updatedPlayLinks);
  };
  const [showPlayLink, setShowPlayLink] = useState(false);
  const handlePlayLinkClick = (link) => {
    window.open(link, '_blank');
  };

  const [isTagsPopupOpen, setIsTagsPopupOpen] = useState(false);

  const handleOpenTagsPopup = () => {
    setIsTagsPopupOpen(true);
  };
  const handleCloseTagsPopup = () => {
    setIsTagsPopupOpen(false);
  };
  const [tags, setTags] = useState([]);
  const handleTagsUpdate = (updatedTags) => {
    setTags(updatedTags);
  };

  const navigateTag = (tagId) => {
    navigate(`/tags/${tagId}`);
  };

  useEffect(() => {
    const fetchMovieById = async (id) => {
      try {
        // const response = await axios.get(`/api/movies/${id}`);
        const response = await api.getMovieById(id);
        // console.log('fetchMovieById response:', response);
        setMovie(response.data);
        await fetchPlayLinks();
        await fetchTags();
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPlayLinks = async () => {
      try {
        // const response = await axios.get(`/api/playLinks?MovieId=${movieId}`);
        const response = await api.getPlayLinks(movieId);
        setPlayLinks(response.data);
      } catch (error) {
        // console.error('Error fetching playLinks:', error);
        setError('Error fetching playLinks:' + error.message);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await api.getTagsForMovie(movieId);
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };



    fetchMovieById(movieId);
  }, [movieId]);

  useEffect(() => {
    if(!movie) {
      setIsFavorite(false);
      setIsWatchLater(false);
      return;
    }

    setIsFavorite(movie.isFavorite);
    setIsWatchLater(movie.isWatchLater);
  }, [movie]);


  const handleFovorite = async () => {
    // 收藏
    try {
      if (isFavorite) {
        await models.playList.removeFavoriteMovie({user, movieId});
      } else {
        await models.playList.addFavoriteMovie({user, movieId});
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  }

  const handelWatchLater = async () => {
    try {
      if (isWatchLater) {
        await models.playList.removeWatchLaterMovie({user, movieId});
      } else {
        await models.playList.addWatchLaterMovie({user, movieId});
      }
      setIsWatchLater(!isWatchLater);
    } catch (error) {
      console.error('Error adding watch later:', error);
    }
  }

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    // return <div>Error: {error}</div>;
    return <ErrorInfo info={error} />
  }

  if (!movie) {
    // return <div>Movie not found</div>;
    return <ErrorInfo info='Movie not found.' />
  }

  // 确保 directors 和 actors 是数组
  const directors = movie.directors || [];
  const actors = movie.actors || [];
  // setTags(movie.tags || []);
  // const tags = movie.tags || [];


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

  const openPlayLink = () => {
    setShowPlayLink(true);
  };
  const closePlayLink = () => {
    setShowPlayLink(false);
  };



  return (
    <div className="container">
      <div className='container-title'>
        <div styles={"flex:1"}>
          <WindowCloseButton
            onClick={() => navigate(-1)}
            icon="fas fa-arrow-left"
          />
        </div>
        <div styles={"flex:5"}>
          <h1 className="movie-title">{movie.name}</h1>
        </div>
        <div styles={"flex:1"}>
          <span />
        </div>
      </div>
      <div className="movie-detail">
        <div className="top">
          <div className="top-left">
            <img src={movie.posterUrl || defaultImage} alt={movie.name}
              onError={(e) => { e.target.src = defaultImage; }}
              referrerPolicy="no-referrer"
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
            <p><span className='label' >日期：</span><span>{movie.releaseDate}</span> </p>
            <p><span className='label' >评分：</span> {movie.rating}</p>
            <p>
              <span className="horizontal-list">
                <span className='label' >来源：</span>
                <span><a href={movie.fromUrl} >点击跳转</a></span>
              </span>
            </p>
            <div>
              <span className="horizontal-list">
                {/* <span className='label' >标签：</span> */}
                {/* <TagField tags={tags} onClick={handleOpenTagsPopup} /> */}
                <TagField tags={tags}
                  onManage={handleOpenTagsPopup}
                  onNavigateTag={navigateTag}
                />
                {/* <button onClick={handleOpenTagsPopup}>Manage Tags</button> */}
              </span>
            </div>
          </div>
        </div>
        <div className="down">
          <div className='down-header'>
            <div className="play-panel">
              {playLinks && playLinks.length > 0 && (
                <div className="play-panel">
                  {/* <div><h1>播放</h1></div>   */}
                  {playLinks.map((playLink, index) => (
                    <TextButton
                      key={index}
                      // colorIndex={4} 
                      onClick={() => handlePlayLinkClick(playLink.link)}
                      text={playLink.name}
                      title={playLink.link}
                      icon="fas fa-play-circle"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="button-bar">
              <RainbowButton colorIndex={0} onClick={openPlayLink} icon="fas fa-link" title="播放链接" />
              <RainbowButton colorIndex={1} 
              icon="fas fa-heart" 
              title="收藏" 
              onClick={handleFovorite}
              checked={isFavorite} 
              checkedColor="red" />
              <RainbowButton colorIndex={2} 
              icon="fas fa-clock" 
              title="稍后观看" 
              onClick={handelWatchLater}
              checked={isWatchLater}
              checkedColor="red"
              />
            </div>
          </div>
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
                  referrerPolicy="no-referrer"
                  onClick={() => openGallery(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showPlayLink && <PlayLink
        MovieId={movieId}
        onPlayLinksUpdate={handlePlayLinksUpdate}
        onClose={closePlayLink}
      />}
      {isGalleryOpen && (
        <ImageGallery
          images={relatedPictureLinks}
          onClose={closeGallery}
          index={currentImageIndex}
          referrerPolicy="no-referrer"
        />
      )}
      {isTagsPopupOpen && (
        <Tags movieId={movieId}
          onClose={handleCloseTagsPopup}
          onUpdate={handleTagsUpdate} />
      )}
    </div>
  );
};

export default MovieDetail;