import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import models from "./client/models";
import MovieSlider from "./components/MovieSlider";
import './PlayList.css';
import { useGlobal } from './GlobalContext';
import { PlayListBox } from './components';

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
                                稍后观看
                                <div className='play-list-subtitle'>{watchLater.length}</div>
                            </div>
                            <div onClick={() => handleGoToPlayList(watchLaterId)} className='view-all-button'>View all</div>
                        </div>
                        <MovieSlider key="watchLater" movies={watchLater} />
                    </div>

                    <div className='play-list-panel'>
                        <div className='play-list-header'>
                            <div onClick={() => handleGoToPlayList(favoriteId)} className='play-list-title'>
                                收藏夹
                                <div className='play-list-subtitle'>{favorite.length}</div>
                            </div>

                            <div onClick={() => handleGoToPlayList(favoriteId)} className='view-all-button'>View all</div>
                        </div>
                        <MovieSlider key="favorite" movies={favorite} />
                    </div>
                    <div className='play-list-panel' >
                        <div className='play-list-header'>
                            <div className='play-list-title'>
                                播放清单
                                <div className='play-list-subtitle'>{userPlayList.length}</div>
                            </div>
                        </div>
                        <div className='play-list-content'>
                            {userPlayList.map(item => (
                                <PlayListBox key={'play-list-'+item.id} 
                                    playList={item} 
                                    onClick={() => handleGoToPlayList(item.id)} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayList;