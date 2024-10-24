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
  prefix: '/api/movies',
});

router.post('/', async (ctx) => {
  try {
    // const data = JSON.parse(ctx.request.body);
    const data = ctx.request.body;
    const movie = await createFullMovie(data);
    ctx.body = movie;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

router.get('/', async (ctx) => {
  try {
    // const movies = await getAllMovies(ctx.query);
    // console.log('ctx.query', ctx.query);
    const user = ctx.state.user;
    const movies = await getMovies(ctx.query, { UserId: user?.id });

    ctx.body = movies;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

router.get('/:id', async (ctx) => {
  try {
    const user = ctx.state.user;
    const movie = await getMovieById(ctx.params.id, { UserId: user?.id });
    ctx.body = movie.toJSON();
  } catch (error) {
    ctx.status = 404;
    ctx.body = error.message;
  }
});

router.put('/:id', async (ctx) => {
  try {
    const user = ctx.state.user;
    if (!user) {
      ctx.status = 401;
      ctx.body = 'Unauthorized';
      return;
    }
    if (!user.isAdmin) {
      ctx.status = 403;
      ctx.body = 'Forbidden';
      return;
    }
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