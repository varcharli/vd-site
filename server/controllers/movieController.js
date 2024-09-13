// controllers/movieController.js
const { Op } = require('sequelize');
const Movie = require('../models/Movie');
const Actor = require('../models/Actor');

// 创建电影
async function createMovie(data) {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    throw error;
  }
}

// 获取所有电影
async function getAllMovies(query) {
  try {
    const where = {};
    if (query.title) {
      where.title = { [Op.like]: `%${query.title}%` };
    }
    if (query.actor) {
      const actor = await Actor.findOne({ where: { name: { [Op.like]: `%${query.actor}%` } } });
      if (actor) {
        const movies = await actor.getMovies();
        return movies;
      } else {
        return [];
      }
    }
    const movies = await Movie.findAll({ where });
    return movies;
  } catch (error) {
    throw error;
  }
}

// 获取单个电影
async function getMovieById(id) {
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  } catch (error) {
    throw error;
  }
}

// 更新电影
async function updateMovie(id, data) {
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    await movie.update(data);
    return movie;
  } catch (error) {
    throw error;
  }
}

// 删除电影
async function deleteMovie(id) {
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    await movie.destroy();
    return movie;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};