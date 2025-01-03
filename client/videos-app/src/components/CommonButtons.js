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
export const RainbowButton = ({ colorIndex, onClick, icon, title, checked = false, checkedColor }) => {
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
    const bgColor = colors[colorIndex % colors.length];
    let color = 'var(--global-background-color)';
    if (checked) {
        color = checkedColor || 'white';
    }
    return (
        <button onClick={onClick} title={title} className="rainbow-button" style={{ backgroundColor: bgColor, color: color }}>
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

export const IconButton = ({ onClick, title, icon, checked, checkedColor="red" }) => {
    return (
        <button onClick={onClick} title={title} className="icon-button">
            <i className={icon} style={{ color: checked ? checkedColor : 'var(--global-text-color)',fontSize:"1.2rem" }}></i>
        </button>
    )
}