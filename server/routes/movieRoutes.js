// routes/movieRoutes.js
const Router = require('koa-router');
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');

const router = new Router({
  prefix: '/movies',
});

router.post('/', async (ctx) => {
  try {
    const movie = await createMovie(ctx.request.body);
    ctx.body = movie;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

router.get('/', async (ctx) => {
  try {
    // const movies = await getAllMovies(ctx.query);
    const movies=await getMovies(ctx.query);

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

module.exports = router;