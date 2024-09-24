import React from 'react';
import img from './assets/no_record.png';

const NoRecords = () => {
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

    return (
        <div style={containerStyle}>
            <img src={img} alt="No records" style={{ width: '200px', height: '200px' }} />
            <p>没有记录，请添加新记录。</p>
        </div>
    );
};

export default NoRecords;