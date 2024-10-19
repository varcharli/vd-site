import { where } from 'sequelize';
import { Blog ,User} from '../models/db.js';

export const get = async ({ UserId, limit = 30, offset = 0 }) => {
    try {
        console.log('-------------------blog search:', { UserId, limit, offset });
        const blogs = await Blog.findAll({
            where: { UserId },
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['name']
            }]
        });
        console.log('-------------------blog search:', blogs);
        return blogs;
    } catch (error) {
        console.log('----------------------blog search error :', error);
        throw new Error(`Error fetching blogs: ${error.message}`);
    }
}

export const getById = async ({ id, UserId }) => {
    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            throw new Error('Blog not found');
        }
        if (blog.UserId !== UserId) {
            throw new Error('You are not authorized to view this blog');
        }
        return blog;
    } catch (error) {
        throw new Error(`Error fetching blog: ${error.message}`);
    }
}

export const create = async ({ UserId, title, content }) => {
    try {
        const blog = await Blog.create({
            UserId,
            title,
            content,
        });
        return blog;
    } catch (error) {
        throw new Error(`Error creating blog: ${error.message}`);
    }
}

export const update = async ({ id, title, content, UserId }) => {
    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            throw new Error('Blog not found');
        }
        if (blog.UserId !== UserId) {
            throw new Error('You are not authorized to update this blog');
        }
        blog.title = title;
        blog.content = content;
        await blog.save();
        return blog;
    } catch (error) {
        throw new Error(`Error updating blog: ${error.message}`);
    }
}

export const remove = async ({ id, UserId }) => {
    try {
        const blog = await Blog.findByPk(id);
        if (blog) {
            if (blog.UserId !== UserId) {
                throw new Error('You are not authorized to delete this blog');
            } else {
                await blog.destroy();
            }
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(`Error deleting blog: ${error.message}`);
    }
}