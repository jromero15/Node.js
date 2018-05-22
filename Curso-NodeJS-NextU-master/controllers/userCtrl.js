var User = require('../db/user');
var _ = require('lodash');

exports.registro = function(req, res, next){

	var body = _.pick(req.body, ['usuario', 'password']);
	var user = new User(body);

	user.save(function(err, usuario){
		if(!err){
			res.status(201);
			next()
		}else{
			res.status(400);
			res.send('Ha ocurrido un problema al guadar. File userCtrl');
		}
	})
};