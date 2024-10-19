import Router from "koa-router";
import { get, getById } from "../controllers/actorController.js";

const router = new Router({
    prefix: '/api/actors'
});

router.get('/', async (ctx) => {
    try {
        const actors = await get(ctx.query);
        ctx.body = actors;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

router.get('/:id', async (ctx) => {
    try {
        const actor = await getById(ctx.params.id);
        ctx.body = actor;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

export default router;