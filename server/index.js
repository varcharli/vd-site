import Koa from 'koa';
import Router from 'koa-router';
import movieRoutes from './routes/movieRoutes.js';


const app = new Koa();
const router = new Router();

// router.use('/movies', movieRoutes.routes(), movieRoutes.allowedMethods());

router.get('/', async (ctx) => {
  await ctx.render('index', { title: '首页', message: '欢迎来到Koa首页!' });
});

app.use(router.routes())
  .use(movieRoutes.routes())
  .use(router.allowedMethods());



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});