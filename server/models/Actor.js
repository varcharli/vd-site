// models/Actor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Actor = sequelize.define('Actor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Actor;