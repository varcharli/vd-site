// playListRoutes.js

import Router from 'koa-router';
import playListController from '../controllers/playListController.js';

const router = new Router({
    prefix: '/api/playLists'
});

// 创建播放列表
router.post('/', async (ctx) => {
    try {
        let data = ctx.request.body;
        data.UserId = ctx.state.user.id;
        const playList = await playListController.createPlayList(data);
        ctx.status = 201;
        ctx.body = playList;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// 获取所有播放列表
router.get('/', async (ctx) => {
    try {
        const UserId = ctx.state.user.id;
        const playLists = await playListController.getAllPlayLists({UserId});
        ctx.status = 200;
        ctx.body = playLists;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// get favorite playList
router.get('/favorite', async (ctx) => {
    try {
        const UserId = ctx.state.user.id;
        const playLists = await playListController.getFavoritePlayList({UserId});
        ctx.status = 200;
        ctx.body = playLists;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.get('/favorite/movies', async (ctx) => {
    try {
        const UserId = ctx.state.user.id;
        const movies = await playListController.getMoviesFromFavorite({UserId});
        ctx.status = 200;
        ctx.body = movies;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// get watch later playList
router.get('/watchLater', async (ctx) => {
    try {
        const UserId = ctx.state.user.id;
        const playLists = await playListController.getWatchLaterPlayList({ UserId });
        ctx.status = 200;
        ctx.body = playLists;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.get('/watchLater/movies', async (ctx) => {
    try {
        const UserId = ctx.state.user.id;
        console.log('watch later UserId:', UserId);
        const movies = await playListController.getMoviesFromWatchLater({ UserId });
        ctx.status = 200;
        ctx.body = movies;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// 获取特定播放列表
router.get('/:id', async (ctx) => {
    try {
        const UserId = ctx.state.user.id;
        const playList = await playListController.getPlayListById({ id: ctx.params.id, UserId });
        ctx.status = 200;
        ctx.body = playList;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// 更新播放列表
router.put('/:id', async (ctx) => {
    try {
        const id = ctx.params.id;
        const data = ctx.request.body;
        const UserId = ctx.state.user.id;
        const playList = await playListController.updatePlayList({ id, data, UserId });
        ctx.status = 200;
        ctx.body = playList;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// 删除播放列表
router.delete('/:id', async (ctx) => {
    try {
        const id = ctx.params.id;
        const UserId = ctx.state.user.id;
        await playListController.deletePlayList({ id, UserId });
        ctx.status = 204;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// 获取播放列表中的电影
router.get('/:id/movies', async (ctx) => {
    try {
        const UserId = ctx.state.user.id;
        const movies = await playListController.getMoviesFromPlayList({ id: ctx.params.id, UserId });
        ctx.status = 200;
        ctx.body = movies;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// 添加电影到播放列表
router.post('/:id/movies', async (ctx) => {
    try {
        const id = ctx.params.id;
        const UserId = ctx.state.user.id;
        const { MovieId } = ctx.request.body;
        await playListController.addMovieToPlayList({ id, MovieId, UserId });
        ctx.status = 201;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// 从播放列表中移除电影
router.delete('/:id/movies/:movieId', async (ctx) => {
    try {
        const id = ctx.params.id;
        const UserId = ctx.state.user
        const MovieId = ctx.params.movieId;
        await playListController.removeMovieFromPlayList({ id, MovieId, UserId });
        ctx.status = 204;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

export default router;