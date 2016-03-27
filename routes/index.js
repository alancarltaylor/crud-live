var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/albums', function(req, res, next){
  knex('albums').then(function(records){
    res.render('albums', {albums: records });
  });
});

var getGenres = function(){
  return[
    {value: 'pop', title: 'Pop' },
    {value: 'rock', title: 'Rock'},
    {value: 'rnb', title: 'R\'n\'B'}
  ]
}

router.get('/albums/creator', function(req, res, next){

  res.render('creator', { genres: getGenres() });
});

router.get('/albums/:id', function(req, res, next){
  knex('albums').where('id', req.params.id).then(function(record){
    res.render('thisAlbum', {album: record[0]})
  });
});

router.get('/albums/:id/update', function(req, res, next){
  knex('albums').where('id', req.params.id).then(function(record){
    res.render('update', {album: record[0], genres: getGenres() })
  });
});

router.post('/albums/:id/update', function(req, res, next){
  knex('albums')
  .where({id: req.params.id})
  .update(req.body)
  .then(function(){
    res.redirect('/albums');
  });
});

router.post('/albums/:id/delete', function(req, res, next){
  knex('albums')
    .where('id', req.params.id)
    .delete()
    .then(function(){
      res.redirect('/albums');
    });
});

router.post('/albums', function(req, res, next){
  knex('albums')
    .insert(req.body)
    .then(function(){
      res.redirect('/albums');
    });
});

module.exports = router;
