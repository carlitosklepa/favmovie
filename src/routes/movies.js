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
  res.send('recibido');
})

router.get('/', async (req, res) => {
  const movies = await pool.query('SELECT * FROM movies');
  res.render('movies/list', { movies });
})

module.exports = router;
