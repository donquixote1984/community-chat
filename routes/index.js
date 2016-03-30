var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test',function(req,res,next){
  res.render('test',{title:'Test'})
})

router.get('/cities', function(req, res, next){
	models.City.findAll().then(function(cities){
	res.json(cities)
	})
})

router.get('/community/:id', function(req, res, next){
	models.City.findById(req.params.id,{include:models.Community}).then(function(city){
		res.json(city.Communities);
	})
})

router.get('/buildings/:id', function(req, res, next){
	models.Community.findById(req.params.id, {include:models.Building}).then(function(community){
		res.json(community.Buildings);
	})
})
module.exports = router;
