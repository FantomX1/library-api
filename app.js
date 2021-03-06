var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;

if (process.env.ENV === 'Test') {
  db = mongoose.connect('mongodb://localhost/libraryAPI_test');
} else {
  db = mongoose.connect('mongodb://localhost/libraryAPI');
}
var Book = require('./models/bookModel');


var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8000;

var bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log('Gulp is running on port ' + port);
});

module.exports = app;