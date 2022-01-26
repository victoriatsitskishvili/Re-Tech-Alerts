const router = require("express").Router();
const { User, Comment, Post } = require("../models/");

// To get all the post from the main page //
router.get("/", (req, res) => {
    //You can read the whole table from the database with the findAll method//
  Post.findAll({
    include: [User],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("allposts", { posts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// To get a post //
router.get("/post/:id", (req, res) => {

    //The findByPk method obtains only a single entry from the table, using the provided primary key.//

  Post.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("single-post", { post });
      } else {
        res.status(500).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//To get a login//

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
      //lets you redirect the user to a different URL//
    res.redirect("/");
    return;
  }

  res.render("login");
});

//To get a sign-up//
router.get("/sign-up", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("sign-up");
});

module.exports = router;