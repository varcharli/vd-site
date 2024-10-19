import { Director } from "../models/db.js";

// 获取所有演员
export const get = async (query) => {
  try {
    const directors = await Director.findAll({ where: query, order: [['name', 'ASC']] });
    return directors;
  } catch (error) {
    throw new Error(`Error fetching actors: ${error.message}`);
  }
}

// 获取单个演员
export const getById = async (id) => {
  try {
    const director = await Director.findByPk(id);
    if (!director) {
      throw new Error('Director not found');
    }
    return director;
  } catch (error) {
    throw new Error(`Error fetching actor: ${error.message}`);
  }
}