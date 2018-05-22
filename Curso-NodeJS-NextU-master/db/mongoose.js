const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/nodeNexU');

console.log('Conectado a mongodb');

module.exports = mongoose;