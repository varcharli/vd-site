// seedMovies.js
// Generate 100 random movies and add them to the database.
// import { Sequelize } from 'sequelize';
import { Movie, sequelize }  from './models/db.js';

const generateRandomMovie = (index) => ({
  name: `Movie ${index}`,
  releaseDate: new Date(2000 + Math.floor(Math.random() * 21), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
  posterUrl: `https://example.com/poster${index}.jpg`,
  description: `Description for Movie ${index}`,
});

const seedMovies = async () => {
  try {
    await sequelize.sync({ force: true }); // 重置数据库
    const movies = [];
    for (let i = 1; i <= 100; i++) {
      movies.push(generateRandomMovie(i));
    }
    await Movie.bulkCreate(movies);
    console.log('100 movies have been added to the database.');
  } catch (error) {
    console.error('Error seeding movies:', error);
  } finally {
    await sequelize.close();
  }
};

seedMovies();