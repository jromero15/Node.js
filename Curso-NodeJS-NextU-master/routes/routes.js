var user = require('../controllers/userCtrl');
var Image = require('../controllers/imageCtrl');

 var rutas = function(app){
 	app.get('/registro', function(req, res){
 		res.render('registro');
 	});

 	app.get('/', function(req, res){ 
 		res.render('login');
 	});

 	app.get('/galery', Image.getImages, function(req, res){
 		res.render('index',{
			usuario: req.session.passport.user.usuario,
			images: req.images
		});
 	});

 	app.get('/error', function(req, res){
		res.send(req.session.flash.error[0]);
	});

 	app.post('/registro', user.registro, function(req, res){
 		res.redirect('/');
 	});

 	app.post('/upload', Image.uploadImage, function(req, res){
 		res.redirect('/galery');

 	});

 	app.get('/fileUp', function(req, res){
 		res.render('fileup');
 	});
 	app.get('/canvas/:imgName', function(req, res){
 		res.render('canvas', {
 			imgName: req.params.imgName,
 			usuario: req.session.passport.user.usuario,
 			twitName: req.session.passport.user.nombre
		 }); 
		
 	});

 };

 module.exports = rutas;