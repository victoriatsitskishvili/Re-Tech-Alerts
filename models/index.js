const User = require('./user');
const Comment = require('./comment');
const Post = require('./post');


Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Comment,
  Post
};