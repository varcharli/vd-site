import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'mysql', // 或者其他数据库，如 'postgres', 'sqlite', 'mssql'
// });

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  }
);



// 定义电影模型
const Movie = sequelize.define('Movie', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  releaseDate: {
    type: DataTypes.STRING,
    allowNull: true
  },
  //list page poster url
  posterUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  //detail page poster url
  bigPosterUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  //movie serial number
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  fromUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  indexes: [
    {
      fields: ['name']
    },
    {
      fields: ['releaseDate']
    }
  ],
  order: [['releaseDate', 'DESC']]
});

// 定义演员模型
const Actor = sequelize.define('Actor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// 定义导演模型
const Director = sequelize.define('Director', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// 定义标签模型
const Tag = sequelize.define('Tag', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// 定义历史模型
const History = sequelize.define('History', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// 定义用户模型
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordMd5: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Download links
const DownloadLink = sequelize.define('DownloadLink', {
  link: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

// Play links
const PlayLink = sequelize.define('PlayLink', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false
  },
  memo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}
,);

// related pictures
const RelatedPicture = sequelize.define('RelatedPicture', {
  link: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// 定义关系
Movie.belongsToMany(Actor, { through: 'MovieActors' });
Actor.belongsToMany(Movie, { through: 'MovieActors' });

Movie.belongsToMany(Director, { through: 'MovieDirectors' });
Director.belongsToMany(Movie, { through: 'MovieDirectors' });

Movie.belongsToMany(Tag, { through: 'MovieTags' });
Tag.belongsToMany(Movie, { through: 'MovieTags' });

Movie.hasMany(History);
History.belongsTo(Movie);

User.hasMany(History);
History.belongsTo(User);

DownloadLink.belongsTo(Movie);
Movie.hasMany(DownloadLink);

PlayLink.belongsTo(Movie);
Movie.hasMany(PlayLink);

RelatedPicture.belongsTo(Movie);
Movie.hasMany(RelatedPicture);

export {
  sequelize,
  Movie,
  User,
  Tag,
  Actor,
  Director,
  History,
  DownloadLink,
  PlayLink,
  RelatedPicture
};