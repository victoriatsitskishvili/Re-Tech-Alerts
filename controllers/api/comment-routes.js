const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utility/auth");

router.post("/", withAuth, (req, res) => {
    // Create a comment // 
  Comment.create({ ...req.body, userId: req.session.userId })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;