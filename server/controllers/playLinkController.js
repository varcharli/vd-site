
// controllers/playLinkController.js
import { PlayLink } from '../models/db.js';

const getPlayLinks = async (query) => {
  try {
    const playLinks = await PlayLink.findAll({ where: query, order: [['name', 'ASC']] });
    return playLinks;
  } catch (error) {
    throw new Error(`Error fetching playLinks: ${error.message}`);
  }
}


// 创建新的 playLink
const createPlayLink = async (data) => {
  try {
    const playLink = await PlayLink.create(data);
    return playLink;
  } catch (error) {
    throw new Error(`Error creating playLink: ${error.message}`);
  }
};

// 更新现有的 playLink
const updatePlayLink = async (id, data) => {
  try {
    const playLink = await PlayLink.findByPk(id);
    if (!playLink) {
      throw new Error('PlayLink not found');
    }
    await playLink.update(data);
    return playLink;
  } catch (error) {
    throw new Error(`Error updating playLink: ${error.message}`);
  }
};

// 删除现有的 playLink
const deletePlayLink = async (id) => {
  try {
    const playLink = await PlayLink.findByPk(id);
    if (!playLink) {
      throw new Error('PlayLink not found');
    }
    await playLink.destroy();
    return playLink;
  } catch (error) {
    throw new Error(`Error deleting playLink: ${error.message}`);
  }
};

// 导出函数
export {
  getPlayLinks,
  createPlayLink,
  updatePlayLink,
  deletePlayLink
};