 var passport = require('passport');
 var passportLocal = require('passport-local');
 var localStrategy = passportLocal.Strategy;
 var User = require('../db/user'); 

 var localConnection = function(app){
 	passport.use('user', new localStrategy({
 		usernameField: 'usuario',
 		passwordField: 'password'
 	},
 	function(username, password, done){
 		User.findOne({usuario: username}, function(err, user){
 			if(err){return done(err);}
 			if(!user){
 				return done(null, false, {message: 'Nombre de usuario incorrecto.'});
			}else{
				if(user.password != password){
					return done(null, false, {message: 'Password incorrecto'});
				}else{
					return done(null, user);
				}
			}
 		});
 	}
 	));
 	app.post('/login',  passport.authenticate('user', {successRedirect: '/galery', failureRedirect: '/error', failureFlash: 'Usuario o Password invalidos'}));
 };

 module.exports = localConnection;