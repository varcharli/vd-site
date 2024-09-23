// routes/playLinkRoutes.js
import Router from 'koa-router';
import {
  getPlayLinks,
  createPlayLink,
  updatePlayLink,
  deletePlayLink,
}from '../controllers/playLinkController.js';
import { koaBody } from 'koa-body';

// const {
//   createPlayLink,
//   updatePlayLink,
//   deletePlayLink,
// } = playLinkController;

const router = new Router({
  prefix: '/playLinks',
});

// get movie's playLinks
router.get('/', async (ctx) => {
  try {
    const playLinks = await getPlayLinks(ctx.query);
    ctx.body = playLinks;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});


// 创建新的 playLink
router.post('/', koaBody(), async (ctx) => {
  try {
    const data = ctx.request.body;
    const playLink = await createPlayLink(data);
    ctx.body = playLink;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

// 更新现有的 playLink
router.put('/:id', koaBody(), async (ctx) => {
  try {
    const id = ctx.params.id;
    const data = ctx.request.body;
    const playLink = await updatePlayLink(id, data);
    ctx.body = playLink;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

// 删除现有的 playLink
router.delete('/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const playLink = await deletePlayLink(id);
    ctx.body = playLink;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

export default router;