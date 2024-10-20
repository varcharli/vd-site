import Router from 'koa-router';
import {
    createUser,
    deleteUser,
    resetPassword,
    getCurrentUser,
    changePassword
} from '../controllers/userController.js';

const router = new Router({ prefix: '/api/users' });

router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id/password', resetPassword);
// getCurrentUser
router.get('/current', getCurrentUser);
router.put('/password', changePassword);

export default router;