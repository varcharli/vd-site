import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import models from "./client/models";
import MovieSlider from "./components/MovieSlider";
import './PlayList.css';
import { useGlobal } from './GlobalContext';

const PlayList = () => {
    const navigate = useNavigate();
    const { user } = useGlobal();
    const favoriteId = user.favoriteId;
    const watchLaterId = user.watchLaterId;
    const [watchLater, setWatchLater] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [userPlayList, setUserPlayList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 获取数据
        Promise.all([
            models.playList.getWatchLaterMovies(),
            models.playList.getFavoriteMovies(),
            models.playList.get()
        ]).then(([watchLaterData,
            favoriteData,
            userPlayListData
        ]) => {
            setWatchLater(watchLaterData.data);
            setFavorite(favoriteData.data);
            setUserPlayList(userPlayListData.data);
            setLoading(false); // 数据加载完成
        });
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }

    const handleGoToPlayList = (id) => {
        navigate(`/playLists/${id}`);
    }

    return (
        <div className='container'>
            <div className='container-body'>
                <div className='play-list-body'>
                    <div className='play-list-panel'>
                        <div className='play-list-header'>
                            <div onClick={() => handleGoToPlayList(watchLaterId)} className='play-list-title'>
                                Watch Later
                                <div className='play-list-subtitle'>{watchLater.length}</div>
                            </div>
                            <div onClick={() => handleGoToPlayList(watchLaterId)} className='view-all-button'>View all</div>
                        </div>
                        <MovieSlider key="watchLater" movies={watchLater} />
                    </div>

                    <div className='play-list-panel'>
                        <div className='play-list-header'>
                            <div onClick={() => handleGoToPlayList(favoriteId)} className='play-list-title'>
                                Favorite
                                <div className='play-list-subtitle'>{favorite.length}</div>
                            </div>

                            <div onClick={() => handleGoToPlayList(favoriteId)} className='view-all-button'>View all</div>
                        </div>
                        <MovieSlider key="favorite" movies={favorite} />
                    </div>
                    <div className='play-list-panel' >
                        <div className='play-list-header'>
                            <div className='play-list-title'>
                                Play List
                                <div className='play-list-subtitle'>{userPlayList.length}</div>
                            </div>

                            {/* <div className='view-all-button'>View all</div> */}
                        </div>
                        <ul>
                            {userPlayList.map(item => (
                                <li key={item.id}>{item.id}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayList;