import MovieList from './MovieList';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import models from './client/models';
import { PageLoading } from './components';

const ActorMovies = () => {
    const { id } = useParams();
    const actorId = parseInt(id);

    const [loading, setLoading] = useState(true);
    const [actor, setActor] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await models.actor.getById(actorId);
                setActor(response.data);
            } catch (error) {
                console.error('获取演员信息失败：', error);
            }
        };
        fetchData().then(() => setLoading(false));
    }, [actorId]);

    if (loading) {
        return <PageLoading />;
    }

    return (
        <div>

            <MovieList title={'演员：' + actor.name}
                params={{ actors: actorId }}
            />
        </div>
    );
}

export default ActorMovies;