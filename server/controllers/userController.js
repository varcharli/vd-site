import bcrypt from 'bcrypt';
import { User } from '../models/db.js';
import dotenv from 'dotenv';
import playList from './playListController.js';

dotenv.config();
const saltRounds = process.env.SALT_ROUNDS || 10;

// 创建用户
export const createUser = async (ctx) => {
    const { name, password, isAdmin } = ctx.request.body;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    try {
        const user = await User.create({ name, passwordHash, isAdmin });
        ctx.status = 201;
        ctx.body = { message: 'User created', user };
    } catch (err) {
        ctx.status = 400;
        ctx.body = { message: 'Error creating user', error: err.message };
    }
};

// 删除用户
export const deleteUser = async (ctx) => {
    const { id } = ctx.params;
    const { isAdmin } = ctx.state.user;

    if (!isAdmin) {
        ctx.status = 403;
        ctx.body = { message: 'Permission denied' };
        return;
    }

    try {
        await User.destroy({ where: { id } });
        ctx.status = 200;
        ctx.body = { message: 'User deleted' };
    } catch (err) {
        ctx.status = 400;
        ctx.body = { message: 'Error deleting user', error: err.message };
    }
};

// 重置用户密码
export const resetPassword = async (ctx) => {
    const { id } = ctx.params;
    const { newPassword } = ctx.request.body;
    const { isAdmin } = ctx.state.user;

    if (!isAdmin) {
        ctx.status = 403;
        ctx.body = { message: 'Permission denied' };
        return;
    }

    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    try {
        await User.update({ passwordHash }, { where: { id } });
        ctx.status = 200;
        ctx.body = { message: 'Password reset' };
    } catch (err) {
        ctx.status = 400;
        ctx.body = { message: 'Error resetting password', error: err.message };
    }
};

// get current user info
export const getCurrentUser = async (ctx) => {
    const { id } = ctx.state.user;

    try {
        console.log('------------getCurrentUser id:', id);
        const user = await User.findByPk(id, {
            attributes: { exclude: ['passwordHash'] },
            // attributes: ['id', 'username'], 
        });
        // user.favoriteId = (await playList.getFavoritePlayList({UserId:id})).id;
        // user.watchLaterId = (await playList.getWatchLaterPlayList({UserId:id})).id;
        user.setDataValue('favoriteId', (await playList.getFavoritePlayList({ UserId: id })).id);
        user.setDataValue('watchLaterId', (await playList.getWatchLaterPlayList({ UserId: id })).id);
        ctx.status = 200;
        ctx.body = user;
    } catch (err) {
        ctx.status = 400;
        ctx.body = { message: 'Error getting user info', error: err.message };
    }
};