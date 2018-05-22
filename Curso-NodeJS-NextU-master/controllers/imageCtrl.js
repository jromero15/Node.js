var Image = require('../db/image');
var path = require('path');
var formidable = require('formidable');

function uploadImage(req, res, next){
	console.log('inciando upload...');
	var form = new formidable.IncomingForm();
	form.parse(req);

	form.on('fileBegin', function(name, file){
		file.path = path.join(__dirname, '../public/img/', file.name);
		console.log(file.path);		
	});
	form.on('error', function(err){
		console.log(err);
	});
	form.on('file', function(name, file){
		console.log(file.path);
		console.log(file.name);
		var image = new Image({
			imgName: file.name,
			imgPath: file.path
		});

		image.save(function(err, images){
			if(!err){
				res.status(200);
				next();
			}else{
				res.status(400);
				res.send('Ha ocurrido un problema al guardar. Err file imageCtrl.');
				next();
			}
		});
	});
};

function getImages(req, res, next){
	Image.find({}).sort({}).exec(function(err, images){
		if(err){
			res.status(500).send('Error en la petición');
		}else{
			req.images = images;

		next();
		}
	});
};

module.exports = {
	getImages,
	uploadImage
}

