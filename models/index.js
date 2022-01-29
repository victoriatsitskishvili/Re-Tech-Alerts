const User = require('./user');
const Comment = require('./comment');
const Post = require('./post');

//Make A BelongsTo a user:post, comment//
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
  
  //To associate a product with many//
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Comment,
  Post
};