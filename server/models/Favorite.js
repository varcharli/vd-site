// models/Favorite.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Movie = require('./Movie');

const Favorite = sequelize.define('Favorite', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  movieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movie,
      key: 'id',
    },
  },
});

module.exports = Favorite;