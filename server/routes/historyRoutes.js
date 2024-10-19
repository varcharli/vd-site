import {
    get,
    create,
    remove,
    clear,
    update
} from '../controllers/historyController.js';
import Router from "koa-router";

const router = new Router({
    prefix: '/api/history'
});

// get all history items
router.get('/', async (ctx) => {
    try {
        const UserId = ctx.state.user.id;
        const query = { ...ctx.query, UserId };
        const history = await get(query);
        ctx.body = history;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// create a new history item
router.post('/', async (ctx) => {
    try {
        const UserId = ctx.state.user.id;
        const { MovieId, url, title } = ctx.request.body;
        const history = await create({ UserId, MovieId, url, title });
        ctx.body = history;
        ctx.status = 201;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// remove a history item
router.delete('/:id', async (ctx) => {
    try {
        const history = await remove(ctx.params.id);
        if (history) {
            ctx.status = 204;
        } else {
            ctx.status = 404;
        }
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// Clear all history
router.delete('/', async (ctx) => {
    try {
        const UserId = ctx.state.user.id;
        const history = await clear(UserId);
        if (history) {
            ctx.status = 204;
        } else {
            ctx.status = 404;
        }
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// Update a history item
router.put('/:id', async (ctx) => {
    try {
        const history = await update(ctx.params.id);
        ctx.body = history;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

export default router;