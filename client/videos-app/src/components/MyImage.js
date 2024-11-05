import React from 'react';
import defaultImage from '../assets/null_movie.png'; // 引入默认图片

export const MyImage = ({ src, alt, onLoad, width, height }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const toWidth = width || 100;
    const toHeight = height || 200;

    const handleLoaded = () => {
        setIsLoading(false);
        if (onLoad) {
            onLoad();
        }
    }

    return (
        <div>
            {isLoading
                ? <div style={{ width: toWidth, height: toHeight, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
                : null
            }
            <img
                style={isLoading ? { display: 'none' } : {}}
                src={src || defaultImage}
                alt={alt}
                onLoad={handleLoaded}
                onError={(e) => { e.target.src = defaultImage; }}
                referrerPolicy="no-referrer"
            />
        </div>

    );
}
