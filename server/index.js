const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')


const db  = mysql.createPool({
  host            : 'localhost',
  user            : 'andrii',
  password        : '1111',
  database        : 'CRUDDataBase'
});

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(cors());



app.listen(3001, () => {
  console.log(`Example app listening on port 3001`);
})


app.get('/api/get', (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
})


app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInser = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInser, [movieName, movieReview], (err, result) => {
      console.log(result);
    });
})

app.delete('/api/delete/:movieName', (req, res) => {
    const movieName = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName=?";
    db.query(sqlDelete, movieName, (err, result) => {
      console.log(result);
    });
})

app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate, [review, name], (err, result) => {
      console.log(result);
    });
})