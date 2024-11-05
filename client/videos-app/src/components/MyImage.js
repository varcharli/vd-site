import React from 'react';
import defaultImage from '../assets/null_movie.png'; // 引入默认图片

export const MyImage = ({ src, alt, onLoad }) => {
    const [isLoading, setIsLoading] = React.useState(true);

    const handleLoaded = () => {
        setIsLoading(false);
        if (onLoad) {
            onLoad();
        }
    }   

    return (
        <div>
            {isLoading
                ? <img src={defaultImage} alt="loading" />
                : null
            }
            <img
                src={src || defaultImage}
                alt={alt}
                onLoad={handleLoaded}
                onError={(e) => { e.target.src = defaultImage; }}
                referrerPolicy="no-referrer"
            />
        </div>

    );
}
