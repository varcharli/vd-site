import Router from 'koa-router';
// import { generateToken } from '../controllers/authController';
import { generateToken } from '../controllers/authController.js';
const router = new Router();

// 登录路由
router.post('/login', generateToken);

export default router;