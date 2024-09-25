import React from 'react';
import img from './assets/mistake.png';

const ErrorInfo= ({info}) => {
    const containerStyle = {
        // display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        color: '#888',
        fontSize: '1em',

    };

    let txtInfo = info || '载入错误，请稍后再试。';

    return (
        <div style={containerStyle}>
            <img src={img} alt="Error" style={{ width: '200px', height: '200px' }} />
            <p>{txtInfo}</p>
        </div>
    );
};

export default ErrorInfo;