//Rawan&Roaia-49.1
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
app.use(bodyParser.json());

// a. הוספת מאמר חדש
app.post('/articles', (req, res) => {
  const { title, content, author } = req.body;
  db.query('INSERT INTO articles (title, content, author) VALUES (?, ?, ?)', [title, content, author], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Article added', id: result.insertId });
  });
});

// b. קבלת רשימה של כל המאמרים
app.get('/articles', (req, res) => {
  db.query('SELECT * FROM articles', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// c. קבלת מידע על מאמר לפי מזהה
app.get('/articles/:id', (req, res) => {
  db.query('SELECT * FROM articles WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results[0]);
  });
});

// d. מחיקת מאמר לפי מזהה
app.delete('/articles/:id', (req, res) => {
  db.query('DELETE FROM articles WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Article deleted' });
  });
});

// e. קבלת רשימה של מאמרים לפי שם המחבר
app.get('/articles/author/:author', (req, res) => {
  db.query('SELECT * FROM articles WHERE author = ?', [req.params.author], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// f. קבלת רשימה של מאמרים שנוצרו לאחר תאריך מסוים
app.get('/articles/after/:date', (req, res) => {
  db.query('SELECT * FROM articles WHERE created_at > ?', [req.params.date], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// g. קבל רשימה של מאמרים ממוינים לפי תאריך יצירה 
app.get('/articles/sorted/desc', (req, res) => {
  db.query('SELECT * FROM articles ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// h. קבלת מספר המאמרים במסד הנתונים
app.get('/articles/count', (req, res) => {
  db.query('SELECT COUNT(*) AS count FROM articles', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results[0]);
  });
});

// i. חפש מאמרים לפי מילת מפתח בכותרת
app.get('/articles/search/:keyword', (req, res) => {
  const keyword = `%${req.params.keyword}%`;
  db.query('SELECT * FROM articles WHERE title LIKE ?', [keyword], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// j. קבלת רשימת מחברים (ללא כפילויות)
app.get('/articles/authors/distinct', (req, res) => {
  db.query('SELECT DISTINCT author FROM articles', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// התחלת השרת
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
