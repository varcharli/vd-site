// src/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faStar, faHistory } from '@fortawesome/free-solid-svg-icons'; // 使用 solid 样式图标
import './AppNavbar.css';


const Navbar = () => {
  return (
    <nav className="navbar">

      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            <FontAwesomeIcon icon={faHome} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" activeClassName="active">
            <FontAwesomeIcon icon={faFilm} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlists" activeClassName="active">
            <FontAwesomeIcon icon={faStar} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" activeClassName="active">
            <FontAwesomeIcon icon={faHistory} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;