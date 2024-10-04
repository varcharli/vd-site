import MovieList from './MovieList';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TagMovies = () => {
    const { id } = useParams();
    const tagId = parseInt(id);
    return (
        <div>
            <MovieList title={'标签'+tagId} />
        </div>
    );
    }

export default TagMovies;