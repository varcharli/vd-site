
// controllers/playLinkController.js
import { PlayLink } from '../models/db.js';

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
  createPlayLink,
  updatePlayLink,
  deletePlayLink
};