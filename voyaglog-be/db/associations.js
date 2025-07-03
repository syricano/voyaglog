import sequelize from './index.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

User.hasMany(Post, {
  foreignKey: {
    allowNull: false,
    name: 'authorId'
  },
  as: 'posts',
  onDelete: 'CASCADE',
  hooks: true,
  
});
Post.belongsTo(User, { foreignKey: { allowNull: false, name: 'authorId' }, as:'author', onDelete: 'CASCADE' });

