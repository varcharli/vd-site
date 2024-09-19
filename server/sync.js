// sync.js
// import models from './models/db.js';
// const { sequelize } = models;
import { sequelize } from './models/db.js';


(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    await sequelize.close();
  }
})();