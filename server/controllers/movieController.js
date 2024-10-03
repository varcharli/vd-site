// controllers/movieController.js
import { Op } from 'sequelize';
import {
  Movie,
  Actor,
  Director,
  Tag,
  DownloadLink,
  PlayLink,
  RelatedPicture
} from '../models/db.js';

// 创建电影
// createMovie 方法接收一个对象参数，包含电影的所有信息，包括导演、演员和标签等。
// directorNames: 导演姓名 (可选)
// actorNames: 演员姓名列表 (可选)
// tagNames: 标签名称列表 (可选)
const createFullMovie = async (data) => {
  try {

    // 检查 movie.name 是否存在
    if (!data.name) {
      throw new Error('Movie name is required.data:' + data);
    }

    // 创建电影
    // const movie = await Movie.create({
    //   name: data.name,
    //   releaseDate: data.releaseDate,
    //   posterUrl: data.posterUrl,
    //   description: data.description
    // });

    // 创建或是更新电影
    const movie = await createOrUpdateMovie(data);

    // 查找或创建导演并关联
    let directors = [];
    console.log('data is createFullMovie:', data.directorNames);
    if (data.directorNames && data.directorNames.length > 0) {
      directors = await Promise.all(data.directorNames.map(async (directorName) => {
        const [director] = await Director.findOrCreate({
          where: { name: directorName },
          defaults: { name: directorName }
        });
        return director;
      }));
    }

    // 关联导演
    if (directors.length > 0) {
      await movie.setDirectors(directors.map(director => director.id));
    }

    // 查找或创建演员并关联
    if (data.actorNames && data.actorNames.length > 0) {
      const actors = await Promise.all(data.actorNames.map(async (actorName) => {
        const [actor] = await Actor.findOrCreate({
          where: { name: actorName },
          defaults: { name: actorName }
        });
        return actor;
      }));
      await movie.setActors(actors.map(actor => actor.id));
    }

    // 查找或创建标签并关联
    if (data.tagNames && data.tagNames.length > 0) {
      const tags = await Promise.all(data.tagNames.map(async (tagName) => {
        const [tag] = await Tag.findOrCreate({
          where: { name: tagName },
          defaults: { name: tagName }
        });
        return tag;
      }));
      await movie.setTags(tags.map(tag => tag.id));
    }

    // 查找或创建关联的图片 RelatedPicture
    // if only set null to relatedPictures.Then need a clean operation for relatedPictures.
    // Delete all relatedPictures when relatedPicture's movieId is null.
    // console.log('data.relatedPictures:', data.relatedPictures);

    if (data.relatedPictures && data.relatedPictures.length > 0) {
      // Clear all related pictures
      await movie.setRelatedPictures([]);
      const relatedPictures = await Promise.all(data.relatedPictures.map(async (relatedPicture) => {
        const pic = await RelatedPicture.create({link: relatedPicture });
        return pic;
      }));
      await movie.setRelatedPictures(relatedPictures.map(relatedPicture => relatedPicture.id));
    }


    return movie;
  } catch (error) {
    console.log('create error:', error);
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

  const { count, rows: movies } = await Movie.findAndCountAll({
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


// 创建电影
async function createMovie(data) {
  try {
    // 检查 movie.name 是否存在
    if (!data.name) {
      throw new Error('Movie name is required');
    }
    console.log('data is createMovie');
    console.log('data', data);
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    throw error;
  }
}

async function createOrUpdateMovie(data) {
  // 检查 movie.name 是否和现有的movie.name重复
  // 如果重复，更新现有的movie
  // 如果不重复，创建新的movie
  const movie = await Movie.findOne({
    where: {
      name: data.name
    }
  });
  if (movie) {
    return movie.update(data);
  } else {
    return Movie.create(data);
  }
}

// 获取单个电影
async function getMovieById(id) {
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error('Movie not found');
    }


    // 获取关联的导演ID和导演姓名
    const directors = await movie.getDirectors();
    movie.dataValues.directors = directors.map(director => ({
      id: director.id,
      name: director.name
    }));
    // console.log('directors:', movie.directors);

    // 获取关联的演员ID和演员姓名
    const actors = await movie.getActors();
    movie.dataValues.actors = actors.map(actor => ({
      id: actor.id,
      name: actor.name
    }));
    // console.log('actors:', actors);
    // console.log('movie actors:', movie.actors);

    // 获取关联的标签ID和标签名称
    const tags = await movie.getTags();
    movie.dataValues.tags = tags.map(tag => ({
      id: tag.id,
      name: tag.name
    }));

    // relatedPictures
    const relatedPictures = await movie.getRelatedPictures();
    movie.dataValues.relatedPictures = relatedPictures.map(relatedPicture => ({
      id: relatedPicture.id,
      link: relatedPicture.link
    }));

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
  createFullMovie,
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};