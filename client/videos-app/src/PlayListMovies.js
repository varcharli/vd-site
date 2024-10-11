import MovieList from './MovieList';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './client/api';
import { PageLoading } from './components';
import models from './client/models';

const PlayListMovies = () => {
    const { id } = useParams();
    const playListId = parseInt(id);

    const [loading, setLoading] = useState(true);
    const [playList, setPlayList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await models.playList.getById(playListId);
                // console.log('getPlayListById response:',response);
                setPlayList(response.data);
            } catch (error) {
                console.error('获取列表信息失败：', error);
            }
        };
        fetchData().then(() => setLoading(false));
    }, [playListId]);

    if (loading) {
        return <PageLoading />;
    }

    return (
        <div>

            <MovieList title={'标签：' + playList.name}
                params={{ playListId }}
            />
        </div>
    );
}

export default PlayListMovies;