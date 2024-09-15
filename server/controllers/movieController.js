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

// Get movies with query parameters
// title, actor, limit, offset, order

async function getAllMovies(query) {
  try {
    let movies;
    let where = {};
    let include = [];

    if (query.title) {
      where.title = {
        [Op.iLike]: `%${query.title}%`,
      };
    }

    if (query.actor) {
      include = [
        {
          model: Actor,
          where: {
            name: {
              [Op.iLike]: `%${query.actor}%`,
            },
          },
        },
      ];
    }

    const limit = query.limit ? parseInt(query.limit) : 10;
    const offset = query.offset ? parseInt(query.offset) : 0;
    const order = query.order ? query.order : [['createdAt', 'DESC']];

    movies = await Movie.findAll({
      where,
      include,
      limit,
      offset,
      order,
    });

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