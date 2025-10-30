const express = require('express');
const app = express();

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`);
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world 1')
})