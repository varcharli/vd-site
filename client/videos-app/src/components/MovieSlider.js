import React, { useState } from 'react';
import { MovieBox } from './index.js'; // 假设MovieBox组件已经存在
import './MovieSlider.css'; // 假设CSS文件已经存在

const MovieSlider = ({index=0, movies, displayCount = 4}) => {
    const [startIndex, setStartIndex] = useState(0);
    const keyIndex = index;
    const handlePrevClick = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - displayCount, 0));
    };

    const handleNextClick = () => {
        
        setStartIndex((prevIndex) => 
            prevIndex+displayCount
            // Math.min(prevIndex + displayCount, movies.length - displayCount)
    );
    };

    const displayedMovies = movies.slice(startIndex, startIndex + displayCount);

    return (
        <div className="movie-slider">
            <button className="nav-button" onClick={handlePrevClick} disabled={startIndex === 0}>
                <i className="fas fa-chevron-left"/>
            </button>
            <div className="movie-slider-container">
                {displayedMovies.map((movie, index) => (
                    <MovieBox key={keyIndex+' '+ index} index={index} movie={movie} />
                ))}
            </div>
            <button className="nav-button" onClick={handleNextClick} disabled={startIndex + displayCount >= movies.length}>
                <i className="fas fa-chevron-right"/>
            </button>
        </div>
    );
};

export default MovieSlider;