import Router from 'koa-router';
import { generateToken } from '../controllers/authController';
const router = new Router();

// 登录路由
router.post('/login', generateToken);

export default router;