Game = Class.extend({	init: function(ctx){		this.ctx = ctx;		this.size = this.ctx.canvas.width/10		this.matrix = new Matrix(this.ctx, this.size);		this.packman = new Packman(this.ctx, this.size, 0, 0);		this.moveInterval = null;		this.endInterval = null;		this.dote = new Dote(this.ctx, this.size);		this.score = 0;				this.move();		this.handleDote();	},		gameOver: function(){		var _this = this;		clearTimeout(this.endInterval);		this.endInterval = setTimeout(function(){			clearInterval(_this.moveInterval);			$('#gameOver').css('display', 'inline-block');		},10000)	},		handleDote: function(){				this.dote.getRandomPosition();		var isValid = false;		while(!isValid){			if (this.matrix.isValidPosition(this.dote.position[1], this.dote.position[0])){				isValid = true;			} else {				this.dote.getRandomPosition();			}		}		this.dote.draw();		this.gameOver();	},		move: function(){		this.handleDirection();		var _this = this;		this.moveInterval = setInterval(function(){			_this.ctx.clearRect(_this.packman.position[0] * _this.size, _this.packman.position[1] * _this.size, _this.size, _this.size);						if (_this.packman.isMoving && _this.packman.direction == 'd'){				if (_this.matrix.isValidPosition(_this.packman.position[1] + 1, _this.packman.position[0])){					_this.packman.position[1] += 1;					_this.packman.angle1 = 0.75;					_this.packman.angle2 = 0.25;				} else {					_this.packman.isMoving = false;				}			}			if (_this.packman.isMoving && _this.packman.direction == 'u'){				if (_this.matrix.isValidPosition(_this.packman.position[1] - 1, _this.packman.position[0])){					_this.packman.position[1] -= 1;					_this.packman.angle1 = 1.75;					_this.packman.angle2 = 1.25;				} else {					_this.packman.isMoving = false;				}			}			if (_this.packman.isMoving && _this.packman.direction == 'l'){				if (_this.matrix.isValidPosition(_this.packman.position[1], _this.packman.position[0] - 1)){					_this.packman.position[0] -= 1;					_this.packman.angle1 = 1.25;					_this.packman.angle2 = 0.75;				} else {					_this.packman.isMoving = false;				}			}			if (_this.packman.isMoving && _this.packman.direction == 'r'){				if (_this.matrix.isValidPosition(_this.packman.position[1], _this.packman.position[0] + 1)){					_this.packman.position[0] += 1;					_this.packman.angle1 = 0.25;					_this.packman.angle2 = 1.75;				} else {					_this.packman.isMoving = false;				}			}			_this.packman.draw()						if (_this.packman.position[0] == _this.dote.position[0] && _this.packman.position[1] == _this.dote.position[1]){				_this.handleDote();				_this.score++;				$('#score').text('Your score: ' + _this.score);			}		},100)	},		handleDirection: function(){		var _this = this;		document.addEventListener('keydown',function(e){			switch(e.keyCode){				case 37:					_this.packman.isMoving = true;					_this.packman.direction = 'l';					break;				case 38:					_this.packman.isMoving = true;					_this.packman.direction = 'u';					break;				case 39:					_this.packman.isMoving = true;					_this.packman.direction = 'r';					break;				case 40:					_this.packman.isMoving = true;					_this.packman.direction = 'd';					break;			}		},false)	}})