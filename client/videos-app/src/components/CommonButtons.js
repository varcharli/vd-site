import React from 'react';
import './CommonButtons.css';

// 窗口关闭按钮
export const WindowCloseButton = ({ onClick, title, icon }) => {
    icon = icon || 'fas fa-times';
    return (
        <button onClick={onClick} title={title} className="window-close-button">
            <i className={icon}></i>
        </button>
    )
};

// 彩虹按钮
export const RainbowButton = ({ colorIndex, onClick, icon, title }) => {
    const colors = [
        'var(--rainbowColor1)',
        'var(--rainbowColor2)',
        'var(--rainbowColor3)',
        'var(--rainbowColor4)',
        'var(--rainbowColor5)',
        'var(--rainbowColor6)',
        'var(--rainbowColor7)',
    ];
    colorIndex = colorIndex || 0;
    const color = colors[colorIndex % colors.length];
    return (
        <button onClick={onClick} title={title} className="rainbow-button" style={{ backgroundColor: color }}>
            <i className={icon}></i>
        </button>
    );
};

// 菜单按钮
export const MenuButton = ({ iconClass, onClick, title }) => (
    <button onClick={onClick} title={title} className="menu-button">
        <i className={iconClass}></i>
    </button>
);

export const TextButton = ({ onClick, text, title, icon }) => {
    return (
        <button onClick={onClick}
            title={title}
            className="text-button">
            {icon && (<i className={icon}></i>)}
            {text}
        </button>
    )
};