// const Tag = sequelize.define('Tag', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     }
//   });
  
// Movie.belongsToMany(Tag, { through: 'MovieTags' });
// Tag.belongsToMany(Movie, { through: 'MovieTags' });

import { Tag,Movie } from '../models/db.js';// Adjust the path as necessary

// Create a new tag
export async function createTag(data) {
    const { name, userId } = data;
    if (!name) {
        throw new Error('Tag name is required.');
    }
    try {
        const newTag = await Tag.create({ name, userId });
        return newTag;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Retrieve all tags by user ID
export async function getTagsByUserId(userId) {
    try {
        const tags = await Tag.findAll({ 
            where: { userId },
            order: [['createdAt', 'DESC']], 
         });
        return tags;
    } catch (error) {
        throw new Error(error.message);
    }
}


// Retrieve a tag by ID
export async function getTagById(id) {
    try {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            throw new Error('Tag not found');
        }
        return tag;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Update a tag by ID
export async function updateTag(id, data) {
    const { name, userId } = data;
    if (!name) {
        throw new Error('Tag name is required.');
    }
    try {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            throw new Error('Tag not found');
        }
        tag.name = name;
        tag.userId = userId;
        await tag.save();
        return tag;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Delete a tag by ID
export async function deleteTag(id) {
    try {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            throw new Error('Tag not found');
        }
        await tag.destroy();
    } catch (error) {
        throw new Error(error.message);
    }
}

// Movie.belongsToMany(Tag, { through: 'MovieTags' });
// add<Tag>, remove<Tag>, set<Tag> , get<Tag>For<Movie> functions are auto generated by sequelize

// Add a tag to a movie
export async function addTagToMovie(movieId, tagId) {
    try {
        const movie = await Movie.findByPk(movieId);
        const tag = await Tag.findByPk(tagId);
        if (!movie) {
            throw new Error('Movie not found');
        }
        if (!tag) {
            throw new Error('Tag not found');
        }
        await movie.addTag(tag);
    } catch (error) {
        throw new Error(error.message);
    }
}

// Remove a tag from a movie
export async function removeTagFromMovie(movieId, tagId) {
    try {
        const movie = await Movie.findByPk(movieId);
        const tag = await Tag.findByPk(tagId);
        if (!movie) {
            throw new Error('Movie not found');
        }
        if (!tag) {
            throw new Error('Tag not found');
        }
        await movie.removeTag(tag);
    } catch (error) {
        throw new Error(error.message);
    }
}

// Set tags for a movie
export async function setTagsForMovie(movieId, tagIds) {
    try {
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }
        const tags = await Tag.findAll({
            where: {
                id: tagIds
            }
        });
        await movie.setTags(tags);
    } catch (error) {
        throw new Error(error.message);
    }
}

// Get tags for a movie
export async function getTagsForMovie(movieId) {
    try {
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }
        const tags = await movie.getTags();
        return tags;
    } catch (error) {
        throw new Error(error.message);
    }
}