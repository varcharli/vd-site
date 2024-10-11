import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../assets/null_movie.jpeg'; // 引入默认图片
import './MovieBox.css';

export const MovieBox = ({ index, movie = '' }) => {
    const navigate = useNavigate();

    const colors = [
        'rgb(254, 228, 203)',
        'rgb(209, 213, 219)',
        'rgb(187, 247, 208)',
        'rgb(191, 219, 254)',
        'rgb(254, 202, 202)',
        'rgb(233, 213, 255)'
    ];

    // const nullMovie = {
    //     id: index,
    //     name: '',
    //     releaseDate: '',
    //     posterUrl: '',
    // };
    const isNullMovie = !movie || !movie.id;
    const movieId = isNullMovie ? movie.id : index;

    const handleMovieClick = (id) => {
        if (isNullMovie) {
            return;
        }
        navigate(`/movies/${id}`);
    };
    const backgroundColor = isNullMovie ? 'rgba(0, 0, 0, 0.2)' : colors[index % colors.length];

    return (
        <div key={movieId}
            style={{ backgroundColor }}
            onClick={() => handleMovieClick(movie.id)}
            className="movie-box">
            {isNullMovie ? <div className="null-movie"></div>
                : (<>
                    <img
                        src={movie.posterUrl || defaultImage}
                        alt={movie.name}
                        onError={(e) => { e.target.src = defaultImage; }}
                        referrerPolicy="no-referrer"
                    />
                    <div className="movie-info">
                        <h2>{movie.name}</h2>
                        <p>{new Date(movie.releaseDate).toISOString().split('T')[0]}</p>
                    </div>
                </>)}
        </div>
    );
}