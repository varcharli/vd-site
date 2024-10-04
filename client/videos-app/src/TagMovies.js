import MovieList from './MovieList';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './client/api';
import { PageLoading } from './components';

const TagMovies = () => {
    const { id } = useParams();
    const tagId = parseInt(id);

    const [loading, setLoading] = useState(true);
    const [tag, setTag] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.getTagById(tagId);
                setTag(response.data);
            } catch (error) {
                console.error('获取标签信息失败：', error);
            }
        };
        fetchData().then(() => setLoading(false));
    }, [tagId]);

    if (loading) {
        return <PageLoading />;
    }

    return (
        <div>

            <MovieList title={'标签：' + tag.name}
                params={{ tagIds: tagId }}
            />
        </div>
    );
}

export default TagMovies;