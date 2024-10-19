// src/Favorite.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';
import models from './client/models';
import { TextButton ,IconButton} from './components/CommonButtons';


const History = () => {
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    models.history.get().then(response => {
      setHistories(response.data);
      console.log('response.data:', response.data);
      setIsLoading(false);
    });
  }
    , []);

  const handleGoMovie = (history) => {
    navigate(`/movies/${history.MovieId}`);
  }

  const handlePlay = async (history) => {
    window.open(history.url, '_blank');
    await models.history.update(history.id);
  }

  const handleDelete = async (history) => {
    const response = await models.history.remove(history.id);
    if (response.status === 204) {
      setHistories(histories.filter(item => item.id !== history.id));
    } else {
      alert('Delete failed');
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className='container-title'>
        History Movies
      </div>
      <div className='container-body'>
        <div className="card-list" >
          {histories.map(history => (
            <div key={history.id} className='history-card'>
              <div className='history-card-image'
                onClick={() => handleGoMovie(history)}
                title={`点击转向《${history.Movie.name}》`}
              >
                <img src={history.Movie.posterUrl} alt={history.Movie.name} />
              </div>
              <div className='history-card-content'>
                <div className='history-card-name'>
                  {history.Movie.name}
                  <IconButton icon="fas fa-close" onClick={() => handleDelete(history)} />
                </div>
                <div className='history-card-url'>
                <TextButton
                      onClick={() => handlePlay(history)}
                      text={history.title}
                      title={history.url}
                      icon="fas fa-play-circle"
                    />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;