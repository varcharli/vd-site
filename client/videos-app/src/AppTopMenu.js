import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import user from './assets/user.png';
import './AppTopMenu.css';
import { logout } from './client/auth';
import logo from './assets/logo.png'; // 引入 LOGO 图像
import { ButtonInput } from './components';
import { MyDropMenu } from './components';
// import './custom-bootstrap.scss';
import { useGlobal } from './GlobalContext';

const TopMenu = () => {
    const { user } = useGlobal();
    const navigate = useNavigate();
    // const [showDropdown, setShowDropdown] = useState(false);
    const handleSearch = () => {
        // navigate('/movies', { state: { query } });
        navigate(`/movies?query=${query}`);
    };


    const handleLogout = () => {
        // 清除用户数据并重定向到登录页面
        logout();
        // window.location.href = '/login';
    };

    const [query, setQuery] = useState('');
    return (
        <div className="top-menu">
            <div className="logo-container">
                <button className="icon-button-menu">
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div><span />
            <ButtonInput
                icon="fas fa-search"
                value={query}
                onClick={handleSearch}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Movies"
            />
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
            {/* <div className="user-icon">
                <img src={user} alt="User" className="user-photo" />
            </div> */}

            <div className="user-menu">
                < MyDropMenu
                    icon="fas fa-user"
                    items={[
                        { text: user.name +' Info' , onClick: () => navigate('/me') },
                        { text: 'Logout', onClick: handleLogout },
                        // { text: 'Close Menu', onClick: closeMenu },
                    ]}
                />

            </div>
            {/* <span>{user?.name+' '+user.favoriteId+' '+user.watchLaterId}</span> */}
        </div>
    );
}

export default TopMenu;