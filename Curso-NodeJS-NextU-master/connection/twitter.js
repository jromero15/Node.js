var passport = require('passport');
var passportTwitter = require('passport-twitter');
var TwitterStrategy = passportTwitter.Strategy;

var Usuario = require('../db/user');

var twitterConnection = function(app){
	passport.use(
		new TwitterStrategy({
			consumerKey: '5Asu3ZKabH89hqnNvhLQWOTqJ',
			consumerSecret: 'gJknZDVH6Kh77LrREI69rNCT4eYulpaEoLb50xt9KNvPDqVXLx',
			callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
		},
		function(token, tokenSecret, profile, done){
			Usuario.findOne({
				'twitter.id': profile.id
			},
			function(err, user){
				if(err){
					return done(err);
					console.log(err);
				}
				if(!user){
					var usuario = new Usuario({
						username: profile.username,
						twitter: profile
					});
					var datos = JSON.stringify(eval("("+profile._raw+")"));
					usuario.nombre = JSON.parse(datos).name;

					usuario.save(function(err, user){
						if(err){
							done(err, null);
							return;
							console.log(err);
						}
						done(null, user);
					});
				}else{
					return done(err, user);
					console.log(err);
				}
			});
		}));
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter',{successRedirect: '/galery', failureRedirect: '/error', failureFlash: 'Error...'}));
};

module.exports = twitterConnection;