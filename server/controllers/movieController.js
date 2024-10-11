// controllers/movieController.js
// import sequelize from 'sequelize';
import { Op, or } from 'sequelize';
import {
  sequelize,
  Movie,
  Actor,
  Director,
  Tag,
  DownloadLink,
  PlayLink,
  PlayList,
  PlayListMovies,
  RelatedPicture,
} from '../models/db.js';
import playList from './playListController.js';

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
    // console.log('data is createFullMovie:', data.directorNames);
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
        const pic = await RelatedPicture.create({ link: relatedPicture });
        return pic;
      }));
      await movie.setRelatedPictures(relatedPictures.map(relatedPicture => relatedPicture.id));
    }


    return movie;
  } catch (error) {
    // console.log('create error:', error);
    throw error;
  }
}

// 获取电影列表，支持分页
// 获取电影列表，支持分页和标题部分字符查询
async function getMovies(query, { UserId = null }) {
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
  console.log('------------------1getMovies 2');
  // 获取标签ID查询参数: tagIds=1,2,3
  const tagIds = query.tagIds ? query.tagIds.split(',').map(id => parseInt(id, 10)) : [];
  // 构建包含标签的查询条件
  const include = [];
  if (tagIds.length > 0) {
    include.push({
      model: Tag,
      where: {
        id: {
          [Op.in]: tagIds
        }
      },
      through: {
        attributes: [] // 不需要中间表的属性
      }
    });
  }

  //init values
  let hasGetMovies = false;
  let count = 0;
  let movies = [];
  console.log('------------------2getMovies 2');
  //获取播放列表ID查询参数
  const playListId = query.playListId ? parseInt(query.playListId, 10) : null;
  if (playListId) {
    console.log('------------------21 getMovies 2 UserId:',UserId);
    if (!UserId) {
      throw new Error('UserId is required');
    }
    console.log('------------------221getMovies 2');
    if (playList.checkPlayListOwner({ UserId, PlayListId: playListId })) {
      console.log('------------------22getMovies 2');
      try{
        const query = `select a.* from "Movies" a 
        INNER JOIN "PlayListMovies" b 
        ON a."id" = b."MovieId" 
        WHERE b."PlayListId" = :playListId 
        Order by b."createdAt" desc`;
      const [results, metadata] = await sequelize.query(query, {
        replacements: { playListId },
        // if use select type then return rows only without metadata
        // type: sequelize.QueryTypes.SELECT
      });
      count = results.length;
      movies=results;
      hasGetMovies = true;
      } catch (error) {
        console.error('------------------getMovies error:', error);
        throw error;
      }
    } else {
      console.log('------------------3331getMovies 2');
      throw new Error('You are not the owner of the playList');
    }
  }
  console.log('------------------3getMovies 2');
  if (!hasGetMovies) {
    const re = await Movie.findAndCountAll({
      where,
      include,
      limit,
      offset,
      order: [['releaseDate', 'DESC']],
    });
    count = re.count;
    movies = re.rows;
  }

  console.log('---------end find movies:', movies);


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
    // console.log('data is createMovie');
    // console.log('data', data);
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
async function getMovieById(id, { UserId }) {
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

    // isFavorite
    const isFavorite = await playList.movieIsFavorite({ UserId, MovieId: id });
    movie.dataValues.isFavorite = isFavorite;
    const isWatchLater = await playList.movieIsWatchLater({ UserId, MovieId: id });
    movie.dataValues.isWatchLater = isWatchLater;

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