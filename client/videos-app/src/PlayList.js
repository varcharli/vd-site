import React, { useEffect, useState } from 'react';
import models from "./client/models";
import MovieSlider from "./components/MovieSlider";
import './PlayList.css';

const PlayList = () => {
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

    return (
        <div className='container'>
            <div className='container-body'>
                <div className='play-list-body'>
                    <div className='play-list-panel' >
                        <h2>Watch Later {watchLater.length}</h2>
                        <MovieSlider key="watchLater" movies={watchLater} />
                    </div>
                    <div className='play-list-panel'>
                        <h2>Favorite {favorite.length} </h2>
                        <MovieSlider key="favorite" movies={favorite} />
                    </div>
                    <div className='play-list-panel' >
                        <h2>PlayList {userPlayList.length}  </h2>
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