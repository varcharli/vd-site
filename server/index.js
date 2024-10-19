import Koa from 'koa';
import Router from 'koa-router';
import {koaBody} from 'koa-body';
import movieRoutes from './routes/movieRoutes.js';
import playLinkRoutes from './routes/playLinkRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import playListRoutes from './routes/playListRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jwt from 'koa-jwt';
import authRoutes from './routes/authRoutes.js';
import actorRoutes from './routes/actorRoutes.js';
import directorRoutes from './routes/directorRoutes.js';
import { createInitialUser } from './initUser.js';
import dotenv from 'dotenv';
dotenv.config();

const app = new Koa();
const router = new Router();
const secret = process.env.JWT_SECRET;

router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());

app.use(jwt({ secret }).unless({ path: [/^\/auth/] }));
// app.use(jwt({ secret }));

router.use(movieRoutes.routes(), movieRoutes.allowedMethods());
router.use(playLinkRoutes.routes(), playLinkRoutes.allowedMethods());
router.use(tagRoutes.routes(), tagRoutes.allowedMethods());
router.use(playListRoutes.routes(), playListRoutes.allowedMethods());
router.use(userRoutes.routes(), userRoutes.allowedMethods());
router.use(actorRoutes.routes(), actorRoutes.allowedMethods());
router.use(directorRoutes.routes(), directorRoutes.allowedMethods());

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3000;
const startServer = async () => {
  await createInitialUser(); // init user if first time running
  app.listen(port, () => {
      console.log('Server running on http://localhost:'+port);
  });
};

startServer();