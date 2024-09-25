import Koa from 'koa';
import Router from 'koa-router';
import {koaBody} from 'koa-body';
import movieRoutes from './routes/movieRoutes.js';
import playLinkRoutes from './routes/playLinkRoutes.js';
import jwt from 'koa-jwt';
import authRoutes from './routes/authRoutes.js';


const app = new Koa();
const router = new Router();
const secret = 'shared-secret';

// router.use('/movies', movieRoutes.routes(), movieRoutes.allowedMethods());

// router.get('/', async (ctx) => {
//   await ctx.render('index', { title: '首页', message: '欢迎来到Koa首页!' });
// });

// app.use(router.routes())
//   .use(movieRoutes.routes())
//   .use(playLinkRoutes.routes())
//   .use(router.allowedMethods());


router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());

app.use(jwt({ secret }).unless({ path: [/^\/auth/] }));

router.use(movieRoutes.routes(), movieRoutes.allowedMethods());
router.use(playLinkRoutes.routes(), playLinkRoutes.allowedMethods());

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});