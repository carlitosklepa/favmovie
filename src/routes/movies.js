const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res) => {
  res.render('movies/add');
})

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

router.get('/', async (req, res) => {
  const movies = await pool.query('SELECT * FROM movies');
  res.render('movies/list', { movies });
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM movies WHERE ID = ?', [id]);
  res.redirect('/movies');
})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const movies = await pool.query('SELECT * FROM movies WHERE ID = ?', [id]);
  res.render('movies/edit', {movie: movies[0]});
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;
  const newMovie = {
    title,
    url,
    description
  };
  await pool.query('UPDATE movies set ? WHERE id = ?', [newMovie, id]);
  res.redirect('/movies');
})

module.exports = router;
