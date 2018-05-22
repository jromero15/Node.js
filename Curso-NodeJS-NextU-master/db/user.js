const models = require('./mongoose');
const validator = require('validator');
const Schema = models.Schema;

var UserSchema = new Schema({
	usuario: String,
	password: String,
	twitter: Schema.Types.Mixed,
	nombre: String

});

var User = models.model('User', UserSchema);

module.exports = User;