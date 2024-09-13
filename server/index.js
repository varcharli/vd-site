const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 设置模板引擎中间件
app.use(views(path.join(__dirname, 'views'), {
  extension: 'ejs'
}));

// 路由
router.get('/', async (ctx) => {
  await ctx.render('index', { title: '首页', message: '欢迎来到Koa首页!' });
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});