var express = require('express');
var path = require('path');
var movies = require(__dirname+'/../models/movies');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/index.html'));
  //res.render('index', { title: 'Express' });
});


router.get('/getMovie/:movieId', function(req, res, next) {
  var movieC = new movies.movieController(res);
  movieC.getMovie(req.params.movieId);

});


router.get('/getMovies/', function(req, res, next) {
  var movieC = new movies.movieController(res);
  movieC.getMovieList();
  //res.render('index', { title: 'Express' });
});


router.post('/saveMovie/', function(req, res, next) {
  var movieC = new movies.movieController(res);
  movieC.saveMovie(req.body.movie);
  //res.render('index', { title: 'Express' });
});
module.exports = router;
