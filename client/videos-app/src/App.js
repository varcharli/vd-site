// src/App.js
import React from 'react';
import { Route, Routes, Navigate,useLocation } from 'react-router-dom';


import Home from './Home';
import Movies from './Movies';
import MovieDetail from './MovieDetail';
import Favorite from './Favorite';
import History from './History';
import Login from './Login'; // 引入 Login 组件
import PrivateRoute from './components/PrivateRoute'; // 引入 PrivateRoute 组件

import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './AppNavbar';
import TopMenu from './AppTopMenu';

function App() {

  const location = useLocation();

  const pathLogin = '/login';
  const pathHome = '/';
  const pathMovies = '/movies';
  const pathFavorite = '/favorite';
  const pathHistory = '/history';
  
  function chkNeedNav() {
    return location.pathname === pathLogin;
  }
  const hideNav = chkNeedNav();

  return (
    <div className="main">
      <div className="App">
        { !hideNav && ( <Navbar />)}
        <div className="content">
        { !hideNav && ( <TopMenu />)}
          <main>
            <Routes>
              <Route path={pathLogin} element={<Login />} />
              <Route exact path={pathHome} element={<PrivateRoute />}>
                <Route exact path={pathHome} element={<Home />} />
              </Route>
              <Route path={pathMovies} element={<PrivateRoute />} >
                <Route path={pathMovies} element={<Movies />} />
              </Route>
              <Route path={pathMovies+"/:id"} element={<PrivateRoute />} >
                <Route path={pathMovies+"/:id"} element={<MovieDetail />} />
              </Route>
              <Route path={pathFavorite} element={<PrivateRoute />} >
                <Route path={pathFavorite} element={<Favorite />} />
              </Route>
              <Route path={pathHistory} element={<PrivateRoute />} >
                <Route path={pathHistory} element={<History />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>

  );
}

export default App;