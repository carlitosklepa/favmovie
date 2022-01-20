const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
  res.render('movies/add');
})

router.post('/add', isLoggedIn, async (req, res) => {
  const { title, url, description } = req.body;
  const newMovie = {
    title,
    url,
    description,
    user_id: req.user.id
  };
  await pool.query('INSERT INTO movies set ?', [newMovie]);
  req.flash('success', 'Película agregada exitosamente');
  res.redirect('/movies');
})

router.get('/', isLoggedIn, async (req, res) => {
  const movies = await pool.query('SELECT * FROM movies WHERE user_id = ?', [req.user.id]);
  res.render('movies/list', { movies });
})

router.get('/delete/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM movies WHERE ID = ?', [id]);
  req.flash('success', 'Película eliminada exitosamente');
  res.redirect('/movies');
})

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const movies = await pool.query('SELECT * FROM movies WHERE ID = ?', [id]);
  res.render('movies/edit', {movie: movies[0]});
})

router.post('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;
  const newMovie = {
    title,
    url,
    description
  };
  await pool.query('UPDATE movies set ? WHERE id = ?', [newMovie, id]);
  req.flash('success', 'Película editada exitosamente');
  res.redirect('/movies');
})

module.exports = router;
