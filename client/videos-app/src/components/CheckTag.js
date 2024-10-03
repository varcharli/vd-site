// src/CheckTag.js
import React from 'react';
import './CheckTag.css';

const CheckTag = ({ tagName, status, onClick }) => {
  const getClassName = () => {
    switch (status) {
      case 'checked':
        return 'check-tag checked';
      case 'unchecked':
        return 'check-tag unchecked';
      case 'disabled':
        return 'check-tag disabled';
      default:
        return 'check-tag';
    }
  };

  return (
    <button className={getClassName()} onClick={onClick} disabled={status === 'disabled'}>
      {tagName}
    </button>
  );
};

export default CheckTag;