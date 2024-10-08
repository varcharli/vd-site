import React, { useEffect, useState } from 'react';
import models from "./client/models";

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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <h2>Watch Later</h2>
                <ul>

                    {watchLater.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <h2>Favorite</h2>
                <ul>
                    {favorite.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <h2>PlayList</h2>
                <ul>
                    {userPlayList.map(item => (
                        <li key={item.id}>{item.id}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlayList;