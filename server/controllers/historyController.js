import { History,Movie } from "../models/db.js";

export const get = async ({ UserId, limit = 30, offset = 0 }) => {
    try {
        const history = await History.findAll({
            where: {userId: UserId },
            limit: limit,
            offset: offset,
            order: [['playedAt', 'DESC']],
            include: [{
                model: Movie,
                attributes: ['posterUrl','name']
            }]
        });
        return history;
    } catch (error) {
        throw new Error(`Error fetching history: ${error.message}`);
    }
}

export const create = async ({ UserId, MovieId, url, title }) => {
    try {
        console.log('-------------------history search:', { UserId, MovieId, url, title });
        // if exists, update playedAt not create new record.
        const search = await History.findOne({ where: { userId:UserId , MovieId,url} });
        if (search) {
            search.playedAt = new Date();
            await search.save();
            return search;
        }
        console.log('----------------------history add :', { UserId, MovieId, url, title });
        const history = await History.create({
            userId: UserId,
            MovieId,
            url,
            title,
            playedAt: new Date()
        });
        return history;
    } catch (error) {
        console.log('----------------------history add error :', error);
        throw new Error(`Error creating history: ${error.message}`);
    }
}

export const remove = async (id) => {
    try {
        const history = await History.findByPk(id);
        if (history) {
            await history.destroy();
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(`Error deleting history: ${error.message}`);
    }
}

export const clear = async (UserId) => {
    try {
        await History.destroy({ where: {userId: UserId } });
        return true;
    } catch (error) {
        throw new Error(`Error clearing history: ${error.message}`);
    }
}

export const update = async (id) => {
    try {
        const history = await History.findByPk(id);
        if (history) {
            history.playedAt = new Date();
            await history.save();
            return history;
        }
        return null;
    } catch (error) {
        throw new Error(`Error updating history: ${error.message}`);
    }
}