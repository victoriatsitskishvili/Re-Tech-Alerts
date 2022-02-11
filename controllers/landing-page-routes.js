const router = require("express").Router();
const { Post } = require('../models');
const withAuth = require('../utility/auth');


//To get all//
router.get("/", withAuth, (req, res) => {
    Post.findAll({
      where: {
        userId: req.session.userId
      }
    })
      .then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        
        res.render("adminallposts", {
          layout: "homepage",
          posts
        });
      })
      .catch(err => {
        console.log(err);
        res.redirect("login");
      });
  });


  //To get a new post//
  router.get("/new", withAuth, (req, res) => {
    res.render("newpost", {
      layout: "homepage"
    });
  });
  

  // To edit a post //
  router.get("/edit/:id", withAuth, (req, res) => {
    console.log('edit');
    Post.findByPk(req.params.id)
      .then(dbPostData => {
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });
          
          res.render("editpost", {
            layout: "homepage",
            post
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
module.exports = router;