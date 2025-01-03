// src/App.js
import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';


import Home from './Home';
import Movies from './Movies';
import MovieDetail from './MovieDetail';
// import Favorite from './Favorite';
import History from './History';
import Login from './Login'; // 引入 Login 组件
import Tag from './TagMovies';
import PlayList from './PlayList';
import PlayListMovies from './PlayListMovies';
import ActorMovies from './ActorMovies';
import DirectorMovies from './DirectorMovies';
import Blog from './Blog';
import MyProfile from './MyProfile';
import PrivateRoute from './components/PrivateRoute'; // 引入 PrivateRoute 组件
import MovieForm from './MovieForm.js';

import './custom-bootstrap.scss';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from './AppNavbar';
import TopMenu from './AppTopMenu';

function App() {

  const location = useLocation();

  const pathLogin = '/login';
  const pathHome = '/';
  const pathMovies = '/movies';
  // const pathFavorite = '/favorite';
  const pathHistory = '/history';
  const pathTag = '/tags';
  const pathPlayList = '/playLists';
  const pathActor = '/actors';
  const pathDirector = '/directors';
  const pathMe='/me';


  function chkNeedNav() {
    return location.pathname === pathLogin;
  }
  const hideNav = chkNeedNav();


  return (
    <div className="main">
      <div className="App">
        <div className="App-menu">
          {!hideNav && (<TopMenu />)}
        </div>
        <div className="App-body">
          {!hideNav && (<Navbar />)}

          <div className="content">

            <main>
              <Routes>
                <Route path={pathLogin} element={<Login />} />
                <Route exact path={pathHome} element={<PrivateRoute />}>
                  <Route exact path={pathHome} element={<Blog />} />
                </Route>
                <Route path={pathMovies} element={<PrivateRoute />} >
                  <Route path={pathMovies} element={<Movies />} />
                </Route>
                <Route path={pathMovies + "/:id"} element={<PrivateRoute />} >
                  <Route path={pathMovies + "/:id"} element={<MovieDetail />} />
                </Route>
                <Route path={pathTag + "/:id"} element={<PrivateRoute />} >
                  <Route path={pathTag + "/:id"} element={<Tag />} />
                </Route>
                {/* <Route path={pathFavorite} element={<PrivateRoute />} >
                  <Route path={pathFavorite} element={<Favorite />} />
                </Route> */}
                <Route path={pathHistory} element={<PrivateRoute />} >
                  <Route path={pathHistory} element={<History />} />
                </Route>
                <Route path={pathPlayList} element={<PrivateRoute />} >
                  <Route path={pathPlayList} element={<PlayList />} />
                </Route>
                <Route path={pathPlayList + "/:id"} element={<PrivateRoute />} >
                  <Route path={pathPlayList + "/:id"} element={<PlayListMovies />} />
                </Route>
                <Route path={pathActor + "/:id"} element={<PrivateRoute />} >
                  <Route path={pathActor + "/:id"} element={<ActorMovies/>} />
                </Route>
                <Route path={pathDirector + "/:id"} element={<PrivateRoute />} >
                  <Route path={pathDirector + "/:id"} element={<DirectorMovies/>} />
                </Route>
                <Route path={pathMe} element={<PrivateRoute />} >
                  <Route path={pathMe} element={<MyProfile />} />
                </Route>
                <Route path={pathMovies + "/new"} element={<PrivateRoute />} >
                  <Route path={pathMovies + "/new"} element={<MovieForm />} />
                </Route>
                <Route path={pathMovies + "/:id/edit"} element={<PrivateRoute />} >
                  <Route path={pathMovies + "/:id/edit"} element={<MovieForm />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div> </div>
        <div className="App-footer">
        </div>
      </div>
    </div>

  );
}

export default App;