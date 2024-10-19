import MovieList from './MovieList';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import models from './client/models';
import { PageLoading } from './components';

const DirectorMovies = () => {
    const { id } = useParams();
    const directorId = parseInt(id);

    const [loading, setLoading] = useState(true);
    const [director, setDirector] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await models.director.getById(directorId);
                setDirector(response.data);
            } catch (error) {
                console.error('获取导演信息失败：', error);
            }
        };
        fetchData().then(() => setLoading(false));
    }, [directorId]);

    if (loading) {
        return <PageLoading />;
    }

    return (
        <div>

            <MovieList title={'导演：' + director.name}
                params={{ directors: directorId }}
            />
        </div>
    );
}

export default DirectorMovies;