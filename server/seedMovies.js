// seedMovies.js
// Generate 100 random movies and add them to the database.
const { Sequelize } = require('sequelize');
const Movie = require('./models/Movie');
const sequelize = require('./db');

const generateRandomMovie = (index) => ({
  title: `Movie ${index}`,
  genre: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'][Math.floor(Math.random() * 5)],
  releaseYear: 2000 + Math.floor(Math.random() * 21),
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