import Router from 'koa-router';
import { createUser, deleteUser, resetPassword } from '../controllers/userController.js';
// import { verifyToken } from '../controllers/authController.js';

const router = new Router({ prefix: '/api/users' });

router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id/password', resetPassword);

export default router;