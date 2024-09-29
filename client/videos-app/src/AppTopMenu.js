import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import user from './assets/user.png';
import './AppTopMenu.css';
import { logout } from './client/auth';
import logo from './assets/logo.png'; // 引入 LOGO 图像
import { ButtonInput } from './components';
// import './custom-bootstrap.scss';

const TopMenu = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const handleSearch = () => {
        // navigate('/movies', { state: { query } });
        navigate(`/movies?query=${query}`);
    };


    const handleLogout = () => {
        // 清除用户数据并重定向到登录页面
        logout();
        // window.location.href = '/login';
    };

    const handleToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const closeMenu = () => {
        setShowDropdown(false);
    };



    const [query, setQuery] = useState('');
    return (
        <div className="top-menu">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <button className="icon-button-menu">
                <i className="fas fa-bars"></i>
            </button>
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
                <Dropdown show={showDropdown} onToggle={handleToggle}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown-toggle">
                        <i className="fas fa-user"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate('/userinfo')}>UserInfo</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        <Dropdown.Item onClick={()=> { closeMenu();}}>Close Menu</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default TopMenu;