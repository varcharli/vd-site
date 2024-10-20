import bcrypt from 'bcrypt';
import { User } from '../models/db.js';
import dotenv from 'dotenv';
import playList from './playListController.js';

dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;

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

export const changePassword = async (ctx) => {
    const { id } = ctx.state.user;
    const { oldPassword, newPassword } = ctx.request.body;
    try {
        const user = await User.findByPk(id);
        console.log('------------changePassword user:', oldPassword, '/',newPassword);
        console.log('------------changePassword user:', user.passwordHash);
        const match = await bcrypt.compare(oldPassword, user.passwordHash);
        console.log('------------changePassword match:', match);
        if (!match) {
            ctx.status = 400;
            ctx.body = { message: 'Invalid password' };
            return;
        }
        console.log('------------changePassword newPassword:', newPassword,'/',saltRounds );
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);
        // console.log('------------changePassword passwordHash:', password);
        await User.update({ passwordHash }, { where: { id } });
        console.log('------------changePassword after update:', id);
        ctx.status = 200;
        ctx.body = { message: 'Password changed' };
    } catch (err) {
        console.log('------------changePassword err:', err);
        ctx.status = 400;
        ctx.body = { message: 'Error changing password', error: err.message };
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