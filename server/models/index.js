// models/index.js
const sequelize = require('../db');
const Movie = require('./Movie');
const User = require('./User');
const Favorite = require('./Favorite');
const Actor = require('./Actor');

// 电影和演员多对多关系
Movie.belongsToMany(Actor, { through: 'MovieActors' });
Actor.belongsToMany(Movie, { through: 'MovieActors' });

// 用户和收藏多对多关系
User.belongsToMany(Movie, { through: Favorite });
Movie.belongsToMany(User, { through: Favorite });

module.exports = {
  sequelize,
  Movie,
  User,
  Favorite,
  Actor,
};