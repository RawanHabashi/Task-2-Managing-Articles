//Rawan&Roaia-49.1
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

app.post('/articles', (req, res) => {
  const { title, content, author } = req.body;
  db.query('INSERT INTO articles (title, content, author) VALUES (?, ?, ?)', [title, content, author], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Article added', id: result.insertId });
  });
});

app.get('/articles', (req, res) => {
  db.query('SELECT * FROM articles', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});


module.exports = app;

