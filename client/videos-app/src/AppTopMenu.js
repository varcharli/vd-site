import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import user from './assets/user.png';
import './AppTopMenu.css';
import { logout } from './client/auth';
// import { Dropdown } from 'react-bootstrap';

const TopMenu = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const handleSearch = () => {
        // navigate('/movies', { state: { query } });
        navigate(`/movies?query=${query}`);
    };



    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // const handleLogout = () => {
    //     // 清除用户数据并重定向到登录页面
    //     logout();
    //     // window.location.href = '/login';
    // };

    // const toggleDropdown = () => {
    //     setShowDropdown(!showDropdown);
    // };

    const [query, setQuery] = useState('');
    return (
        <div className="top-menu">
            <button className="icon-button-menu">
                <i className="fas fa-bars"></i>
            </button>
            <div className='search-container'>
                <button className="search-icon"
                    onClick={handleSearch}>
                    <i className="fas fa-search"></i>
                </button>
                <input type="text" placeholder="Search Movies" className="search-box"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={handleKeyPress}
                    onFocus={(e) => e.target.select()} // 添加 onFocus 事件处理程序
                />
            </div>
            <div className='menu-space' />
            <div className="menu-icons">
                <button className="icon-button">
                    <i className="fas fa-share-alt"></i>
                </button>
                <button className="icon-button">
                    <i className="fas fa-plus"></i>
                </button>
                <button className="icon-button">
                    <i className="fas fa-envelope"></i>
                </button>
            </div>
            <div className="user-icon">
                <img src={user} alt="User" className="user-photo" />
            </div>
            {/* <nav>
                <ul>
                    <li>
                        <button className='icon-button' onClick={toggleDropdown}>
                            <i className="fas fa-user"></i>
                        </button>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <button onClick={() => navigate('/userinfo')}>UserInfo</button>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </li>
                </ul>
            </nav> */}
        </div>
    );
}

export default TopMenu;