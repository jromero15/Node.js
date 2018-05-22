
DIBUJA = {
		canvas:  null,
		bandera: false,
		pos: {},
		img: new Image,
		ctx: null,
		inicio: function(img){
			if (this.canvas  && this.canvas.getContext) {
				this.ctx = this.canvas.getContext("2d");
				if (this.ctx){
					return this.ctx
				}else {
					alert("Canvas no soportado por el explorador.");
				}

			} else {
				alert("Canvas no soportado por el explorador.");
			}
		},
		ajusta: function(xx, yy){
			var posCanvas = this.canvas.getBoundingClientRect();
			var x = xx - posCanvas.left;
			var y = yy - posCanvas.top;
			return {x:x, y:y};
		},
		dibuja: function(inicio, fin){
			this.ctx.beginPath();
			this.ctx.strokeStyle;
			this.ctx.lineWidth;
			this.ctx.moveTo(inicio.x, inicio.y);
			this.ctx.lineTo(fin.x, fin.y);
			this.ctx.stroke();
		},
		cargarImagen: function(imgName){
			this.img.src = '/img/'+ imgName;
			this.ctx.drawImage(img, 0, 0);
		}
};

$(document).ready(function(){
	DIBUJA.canvas = document.getElementById("canvas");
	//eventos:
	DIBUJA.canvas.onmousedown= function(e){
		this.pos = DIBUJA.ajusta(e.clientX, e.clientY);
		this.bandera = true;
	};
	DIBUJA.canvas.onmouseup= function(e){
		this.bandera = false;
	};
	DIBUJA.canvas.onmousemove= function(e){
		if (this.bandera){
		var fin = DIBUJA.ajusta(e.clientX, e.clientY);
		DIBUJA.dibuja(this.pos, fin);
		this.pos = fin;
		}
	};

	DIBUJA.inicio();

	$('#color').change(function(){
		DIBUJA.ctx.strokeStyle = this.value;
	});
	$('#ancho').change(function(){
		DIBUJA.ctx.lineWidth = this.value;
	});

	//socket.io
	var socket = io();
	socket.emit('new user', usuario);

	if (usuario != null){
		socket.emit('new user', usuario);
	}

	$('#cargarImagen').click(function(event){
		socket.emit('image', {image: imagen});
		return false;
	});

	socket.on('image', function(info){
		if(info.image){
			var img = new Image();
			img.src =  'data:image/jpeg;base64,' + info.buffer;
			DIBUJA.img.src = img.src;
			img.onload = function(){
				DIBUJA.ctx.drawImage(DIBUJA.img, 0, 0);
			}
		
		}
	})
	socket.on('new user', function(usuarios){
		$('#cuerpo-online').html('');
		$.each(usuarios, function(i, usuario){
			$('#cuerpo-online').append($('<li>').text(usuario));
		});
	});
	socket.on('user gone', function(usuarios){
		$('#cuerpo-online').html('');
		$.each(usuarios, function(i, usuario){
			$('#cuerpo-online').append($('<li>').text(usuario));
		});
	})
})