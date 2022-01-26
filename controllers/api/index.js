const router = require('express').Router();
const { User } = require('../../models');

//To create a user //
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
          //id//
        req.session.userId = dbUserData.id;
        //user name//
        req.session.username = dbUserData.username;
        // needs to be loggedin//
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// To get a specific user // 
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(500).json({ message: 'User not found!' });
      return;
    }

    // To validate the password //
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(500).json({ message: 'Wrong password!' });
      return;
    }

    // To validate a successful login// 
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are signed in!' });
    });
  });
});

// To log out //
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res
        .status(204)
        .json({ message: 'You are signed out!' })
        .end();
    });
  } else {
    res.status(500).end();
  }
});

// To delete a user // 
router.delete('/user/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;