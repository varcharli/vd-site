import React from 'react';
import './PlayListBox.css';
import nullImage from './assets/null_image.png';

export const PlayListBox = ({ playList,onClick }) => {
    const image = playList.posterUrl || nullImage;
    return (
        <div className="playlist-box" 
        onClick={onClick}
        style={{ backgroundImage: `url(${image})` }}>
            <div className="playlist-info">
                <div>{playList.name}</div>
                <div className='count'>共{playList.movieCount}个影视</div>
            </div>
        </div>
    );
};
