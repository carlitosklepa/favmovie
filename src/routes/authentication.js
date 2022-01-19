const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (req, res) => {
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

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.get('/profile', (req, res) => {
  res.send("Mi perfil");
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
