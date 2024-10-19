import { Actor } from "../models/db.js";

// 获取所有演员
export const get = async (query) => {
  try {
    const actors = await Actor.findAll({ where: query, order: [['name', 'ASC']] });
    return actors;
  } catch (error) {
    throw new Error(`Error fetching actors: ${error.message}`);
  }
}

// 获取单个演员
export const getById = async (id) => {
  try {
    const actor = await Actor.findByPk(id);
    if (!actor) {
      throw new Error('Actor not found');
    }
    return actor;
  } catch (error) {
    throw new Error(`Error fetching actor: ${error.message}`);
  }
}