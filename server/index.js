const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 路由
router.get('/', async (ctx) => {
  ctx.body = {
    title: '首页',
    message: '欢迎来到Koa首页!'
  };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});