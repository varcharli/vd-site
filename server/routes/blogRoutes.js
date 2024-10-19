import {
    get,
    getById,
    create,
    update,
    remove,
} from '../controllers/blogController.js';

import Router from "koa-router";

const router = new Router({
    prefix: '/api/blogs'
});

const getUserId = (ctx) => {
    return ctx.state.user.id;
}

router.get('/', async (ctx) => {
    try {
        const UserId = getUserId(ctx);
        const query = { ...ctx.query, UserId };
        const blogs = await get(query);
        ctx.body = blogs;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

router.get('/:id', async (ctx) => {
    try {
        const UserId = getUserId(ctx);
        const blog = await getById({ id: ctx.params.id, UserId });
        ctx.body = blog;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

router.post('/', async (ctx) => {
    try {
        const UserId = getUserId(ctx);
        const blog = await create({ ...ctx.request.body, UserId });
        ctx.body = blog;
        ctx.status = 201;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

router.put('/:id', async (ctx) => {
    try {
        const UserId = getUserId(ctx);
        const blog = await update({ id: ctx.params.id, ...ctx.request.body, UserId });
        ctx.body = blog;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

router.delete('/:id', async (ctx) => {
    try {
        const UserId = getUserId(ctx);
        await remove({ id: ctx.params.id, UserId });
        ctx.status = 204;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

export default router;
