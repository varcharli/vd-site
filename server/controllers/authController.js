import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import { Op } from 'sequelize';
import { User } from '../models/db.js';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET;


// 生成token
export const generateToken = async (ctx) => {
    const { name, password } = ctx.request.body;
    console.log('ctx:'+ ctx.request.body);
    const user = await User.findOne({ where: { name } });

    if (!user) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid credentials' };
        return;
    }
    console.log('PassCheck: '+password + '  ' +user.passwordHash);
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid credentials' };
        return;
    }
    
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secret, { expiresIn: '1h' });
    // let expiredAt = new Date()+3600;
    // await Token.create({ token, UserId: user.id, expiredAt});

    ctx.body = { token };
};

// 验证token
export const verifyToken = async (ctx, next) => {
    const token = ctx.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secret);
        ctx.state.user = decoded;
        await next();
    } catch (err) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid token' };
    }
};