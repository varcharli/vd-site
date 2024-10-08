// playListController.js

import { PlayList,Movie } from '../models/db.js'; // 导入PlayList模型
const FavoriteListName = 'Favorite';
const WatchLaterListName = 'Watch Later';
import { Op } from 'sequelize';


// 创建播放列表
const createPlayList = async (data) => {
    try {
        data.createBySystem = false;
        const playList = await PlayList.create(data);
        return playList;
    } catch (error) {
        throw new Error(`Error creating PlayList: ${error.message}`);
    }
};

const createSystemPlayList = async ({UserId, systemTag}) => {
    try {
        if (!UserId) {
            throw new Error('UserId is required');
        }
        const playList = await PlayList.create(
            {
                UserId,
                name: systemTag,
                createBySystem: true
            }
        );
        return playList;
    } catch (error) {
        throw new Error(`Error creating PlayList: ${error.message}`);
    }
}

const getSystemPlayList = async ({UserId, systemTag}) => {
    try {
        if (!UserId) {
            throw new Error('UserId is required');
        }
        const playList = await PlayList.findOne(
            {
                where: { UserId, name: systemTag, createBySystem: true }
            }
        );
        if (!playList) {
            return await createSystemPlayList({UserId, systemTag});
        }
        return playList;
    } catch (error) {
        throw new Error(`Error fetching PlayList: ${error.message}`);
    }
}

const getFavoritePlayList = async ({UserId}) => {
    return await getSystemPlayList({UserId,systemTag: FavoriteListName});
}

const getWatchLaterPlayList = async ({UserId}) => {
    return await getSystemPlayList({UserId,systemTag: WatchLaterListName});
}



// 获取所有播放列表, 不包括系统创建的播放列表
const getAllPlayLists = async ({UserId}) => {
    try {
        if (!UserId) {
            throw new Error('UserId is required');
        }
        const playLists = await PlayList.findAll(
            {
                where: {
                    UserId,
                    [Op.or]: [
                        { createBySystem: false },
                        { createBySystem: null }
                    ]
                },
                order: [['createdAt', 'DESC']]
            }
        );
        return playLists;
    } catch (error) {
        throw new Error(`Error fetching PlayLists: ${error.message}`);
    }
};

// 获取特定播放列表
const getPlayListById = async ({ id, UserId }) => {
    try {
        const playList = await PlayList.findByPk(id);
        if (!playList) {
            throw new Error('PlayList not found');
        }
        if (playList.UserId !== UserId) {
            throw new Error('Not authorized to access this PlayList');
        }

        return playList;
    } catch (error) {
        throw new Error(`Error fetching PlayList: ${error.message}`);
    }
};

// 更新播放列表
const updatePlayList = async ({ id, data, UserId }) => {
    try {
        // const playList = await PlayList.findByPk(id);
        const playList = await getPlayListById({ id, UserId });
        if (!playList) {
            throw new Error('PlayList not found');
        }
        await playList.update(data);
        return playList;
    } catch (error) {
        throw new Error(`Error updating PlayList: ${error.message}`);
    }
};

// 删除播放列表
const deletePlayList = async ({ id, UserId }) => {
    try {
        // const playList = await PlayList.findByPk(id);
        const playList = await getPlayListById({ id, UserId });
        if (!playList) {
            throw new Error('PlayList not found');
        }
        await playList.destroy();
    } catch (error) {
        throw new Error(`Error deleting PlayList: ${error.message}`);
    }
};

// Use for show 4 movie images in the playList box
const getMoviesFromPlayList = async ({ id, UserId, limit }) => {
    try {
        const playList = await getPlayListById({ id, UserId });
        const movies = await playList.getMovies(
            {
                limit,
                order: [[{ model: PlayListMovies, as: 'PlayListMovies' }, 'createdAt', 'DESC']]
            }
        );
        return movies;
    } catch (error) {
        throw new Error(`Error fetching Movies from PlayList: ${error.message}`);
    }
}

const getMoviesFromFavorite= async ({ UserId }) => {
    try {
        console.log('getMoviesFromFavorite UserId:', UserId);
        const playList = await getFavoritePlayList({UserId});
        console.log('getMoviesFromFavorite playList:', playList);
        const movies = await playList.getMovies();
        console.log('getMoviesFromFavorite movies:', movies);
        return movies;
    } catch (error) {
        throw new Error(`Error fetching Movies from PlayList: ${error.message}`);
    }
}

const getMoviesFromWatchLater = async ({ UserId }) => {
    try {
        const playList = await getWatchLaterPlayList({UserId});
        const movies = await playList.getMovies();
        return movies;
    } catch (error) {
        throw new Error(`Error fetching Movies from PlayList: ${error.message}`);
    }
}



const addMovieToPlayList = async ({ id, MovieId, UserId }) => {
    try {
        const playList = await getPlayListById({ id, UserId });
        const movie = await Movie.findByPk(MovieId);
        await playList.addMovie(movie);
        playList.movieCount = await playList.countMovies();
        playList.posterUrl = movie.posterUrl;   // update posterUrl with the latest added movie.But not remove when movie removed.
        await playList.save();
    } catch (error) {
        throw new Error(`Error adding Movie to PlayList: ${error.message}`);
    }
}

const removeMovieFromPlayList = async ({ id, MovieId, UserId }) => {
    try {
        const playList = await getPlayListById({ id, UserId });
        const movie = await Movie.findByPk(MovieId);
        // console.log('removeMovieFromPlayList movie:'+ movie + ' playList:'+ playList + ' MovieId:'+ MovieId + ' UserId:'+ UserId);
        await playList.removeMovie(movie);
    } catch (error) {
        throw new Error(`Error removing Movie from PlayList: ${error.message}`);
    }
}

const movieIsFavorite = async ({ UserId, MovieId }) => {
    try {
        const playList = await getFavoritePlayList({ UserId });
        const movies = await playList.getMovies({ where: { id: MovieId } });
        return movies.length > 0;
    } catch (error) {
        throw new Error(`Error checking if Movie is in Favorite: ${error.message}`);
    }
}

const movieIsWatchLater = async ({ UserId, MovieId }) => {
    try {
        const playList = await getWatchLaterPlayList({ UserId });
        const movies = await playList.getMovies({ where: { id: MovieId } });
        return movies.length > 0;
    } catch (error) {
        throw new Error(`Error checking if Movie is in Watch Later: ${error.message}`);
    }
}

export default {
    createPlayList,
    getAllPlayLists,
    getPlayListById,
    updatePlayList,
    deletePlayList,
    getMoviesFromPlayList,
    addMovieToPlayList,
    removeMovieFromPlayList,
    getFavoritePlayList,
    getWatchLaterPlayList,
    getMoviesFromFavorite,
    getMoviesFromWatchLater,
    movieIsFavorite,
    movieIsWatchLater,
};