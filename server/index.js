import Koa from 'koa';
import Router from 'koa-router';
import {koaBody} from 'koa-body';
import movieRoutes from './routes/movieRoutes.js';
import playLinkRoutes from './routes/playLinkRoutes.js';
import jwt from 'koa-jwt';
import authRoutes from './routes/authRoutes.js';
import { createInitialUser } from './initUser.js';
import dotenv from 'dotenv';
dotenv.config();

const app = new Koa();
const router = new Router();
const secret = process.env.JWT_SECRET;

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
// app.use(jwt({ secret }));

router.use(movieRoutes.routes(), movieRoutes.allowedMethods());
router.use(playLinkRoutes.routes(), playLinkRoutes.allowedMethods());

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());


// app.listen(3000, () => {
//   await createInitialUser();
//   console.log('Server is running on http://localhost:3000');
// });

const startServer = async () => {
  await createInitialUser(); // init user if first time running
  app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
  });
};

startServer();