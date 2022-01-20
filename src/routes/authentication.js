const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render("auth/signup");
})

/*
router.post('/signup', (req, res) => {
  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  });
  res.send('recibido');
})

router.get('/profile', (req, res) => {
  res.send("Mi perfil");
})
*/
//OTRA FORMA DE HACER LO DE ARRIBA:

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render("auth/signin");
})

router.post('/signin', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render("profile");
})

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/signin');
})

/*
router.post('/add', async (req, res) => {
  const { title, url, description } = req.body;
  const newMovie = {
    title,
    url,
    description
  };
  await pool.query('INSERT INTO movies set ?', [newMovie]);
  req.flash('success', 'Película agregada exitosamente');
  res.redirect('/movies');
})
*/

module.exports = router;
