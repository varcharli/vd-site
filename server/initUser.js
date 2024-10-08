import bcrypt from 'bcrypt';
import { User } from './models/db.js';
import dotenv from 'dotenv';
dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;

export const createInitialUser = async () => {
    const name = process.env.INIT_USER_NAME;
    const password = process.env.INIT_USER_PASSWORD;
    const isAdmin = process.env.INIT_USER_IS_ADMIN === 'true';

    if (!name || !password) {
        console.error('Please provide INIT_USER_NAME and INIT_USER_PASSWORD in the .env file');
        return;
    }

    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
        // console.log('Initial user already exists');
        return;
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    try {
        const user = await User.create({ name, passwordHash, isAdmin });
        // console.log('Initial user created:', user);
    } catch (err) {
        console.error('Error creating initial user:', err.message);
    }
};