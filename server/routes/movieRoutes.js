// routes/movieRoutes.js
import Router from 'koa-router';
import movieController from '../controllers/movieController.js';
import { koaBody } from 'koa-body';


const {
  createMovie,
  createFullMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = movieController;

const router = new Router({
  prefix: '/movies',
});

router.post('/',koaBody(), async (ctx) => {
  try {
    // const data = JSON.parse(ctx.request.body);
    const data = ctx.request.body;
    console.log('before parse data:', data);
    // const jsonData = JSON.parse(data);
    // console.log('jsonData:', jsonData);
    // 确认是否有数据

    const movie = await createMovie(data);
    ctx.body = movie;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

router.get('/', async (ctx) => {
  try {
    // const movies = await getAllMovies(ctx.query);
    console.log('ctx.query', ctx.query);

    const movies = await getMovies(ctx.query);

    ctx.body = movies;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

router.get('/:id', async (ctx) => {
  try {
    const movie = await getMovieById(ctx.params.id);
    ctx.body = movie;
  } catch (error) {
    ctx.status = 404;
    ctx.body = error.message;
  }
});

router.put('/:id', async (ctx) => {
  try {
    const movie = await updateMovie(ctx.params.id, ctx.request.body);
    ctx.body = movie;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

router.delete('/:id', async (ctx) => {
  try {
    const movie = await deleteMovie(ctx.params.id);
    ctx.body = movie;
  } catch (error) {
    ctx.status = 404;
    ctx.body = error.message;
  }
});

// module.exports = router;
export default router;