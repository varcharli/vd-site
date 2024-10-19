import { get, getById } from '../controllers/directorController.js';
import Router from 'koa-router';

const router = new Router({
    prefix: '/api/directors'
});

router.get('/', async (ctx) => {
    try {
        const directors = await get(ctx.query);
        ctx.body = directors;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
}
);

router.get('/:id', async (ctx) => {
    try {
        const director = await getById(ctx.params.id);
        ctx.body = director;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

export default router;