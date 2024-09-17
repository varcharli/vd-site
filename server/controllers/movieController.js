// controllers/movieController.js
import { Op } from 'sequelize';
import { Movie } from '../models/db.js';

// 创建电影
const createMovie = async (data) => {
try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    throw error;
  }
}

// 获取电影列表，支持分页
// 获取电影列表，支持分页和标题部分字符查询
async function getMovies(query) {
  const page = parseInt(query.page, 10) || 1;
  const pageSize = parseInt(query.pageSize, 10) || 20;
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  // 获取标题查询参数
  const titleQuery = query.title || '';

  // 构建查询条件
  const where = {};
  if (titleQuery) {
    where.name = {
      [Op.like]: `%${titleQuery}%`
    };
  }

  const { count, rows: movies } = await Movie.findAndCountAll ({
    where, // 使用构建的查询条件
    limit,
    offset,
    order: [['releaseDate', 'DESC']], // 根据需要排序
  });

  const totalPages = Math.ceil(count / pageSize);

  return {
    movies,
    pagination: {
      page,
      pageSize,
      totalPages,
      totalRecords: count,
    },
  };
}

// 前端调用方法实例
// 获取标题包含 "Inception" 的电影列表，第 1 页，每页 10 条记录
// fetch('/movies?page=1&pageSize=10&title=Inception');

// async function fetchMovies(page, pageSize) {
//   const response = await fetch(`/movies?page=${page}&pageSize=${pageSize}`);
//   const data = await response.json();
//   console.log(data.movies);
//   console.log(data.pagination);
// }

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

export default {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};