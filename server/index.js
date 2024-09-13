const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

//add movie routes at /routes/movieRoutes.js

const movieRoutes = require('./routes/movieRoutes');
router.use('/movies', movieRoutes.routes());

router.get('/', async (ctx) => {
  await ctx.render('index', { title: '首页', message: '欢迎来到Koa首页!' });
});

app.use(router.routes())
  .use(movieRoutes.routes())
  .use(router.allowedMethods());



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});