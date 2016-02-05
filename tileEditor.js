(function(){
	var canv = document.getElementById('canv');
	var context = canv.getContext('2d');
	var i, j, max = 9, squareSize = 60;
	var xPoints = [], yPoints = [], tiles = [];
	var mouseX, mouseY;
	var coordTile = {"x": "", "y": ""};
	var noFill = true;
	var l = document.getElementById("leftBtn");
	var r = document.getElementById("rightBtn");
	var u = document.getElementById("upBtn");
	var d = document.getElementById("downBtn");
	var resetter = document.getElementById("resetBtn");
	var inactive = "green", active ="purple", normal ="black", background = "gray";
	var canClickTiles = true, uhOh = false;;

	function drawBase(){
		for(i = 0; i < xPoints.length; i++){
			context.fillRect(xPoints[i], yPoints[i], squareSize, squareSize);
			context.strokeRect(xPoints[i], yPoints[i], squareSize, squareSize);
			context.fill();
			context.stroke();
		}
	}

	function init(){
		context.fillStyle = inactive;
		context.strokeStyle = normal;
		for(i=0; i < max; i++){
			for(j = 0; j < max ; j++){
				xPoints.push((i*squareSize)+(squareSize/2));
				yPoints.push(((j*squareSize)+(squareSize/2)));
			}
		}
		drawBase();

	}

	function dealWithClicks(x, y){
		coordTile = {"x": "", "y": ""};

		for(i = 0; i < xPoints.length; i++){
			noFill = true;
			if((x > xPoints[i])&& (x < (xPoints[i] + squareSize))){
				//console.log("got match on x");
      			if((y > yPoints[i]) && (y < (yPoints[i] + squareSize))){
					//console.log("got match on y");
					coordTile.x = xPoints[i];
					coordTile.y = yPoints[i];

						if(tiles.length === 0){
							//console.log("tiles empty: should be filling purple");
							tiles.push(coordTile);
							context.fillStyle = active;
							noFill = false;

						}
						else{
							for(j = 0; j < tiles.length && noFill; j++){
								if(xPoints[i] === tiles[j].x && yPoints[i] === tiles[j].y){
									//console.log("tiles not empty: should be filling green");
									tiles.splice(j, 1);
									context.fillStyle = inactive;
									noFill = false;
								}
								else{
									//console.log("tiles not empty: should be filling purple");
									//context.clearRect(xPoints[i], yPoints[j], squareSize, squareSize);
									tiles.push(coordTile);
									context.fillStyle = active;
									noFill = false;
								}
							}
						}
					context.fillRect(xPoints[i], yPoints[i], squareSize, squareSize);
					context.strokeRect(xPoints[i], yPoints[i], squareSize, squareSize);
					context.fill();
					context.stroke();
					//console.log(JSON.stringify(tiles));
				}

			}
		}
	}

	function drawUpdate(){
		canClickTiles = false;
		context.fillStyle = inactive;
		context.strokeStyle = background;
		drawBase();
		context.fillStyle = active;
		context.strokeStyle = normal;
		for(i = 0; i < tiles.length; i++){
			context.fillRect(tiles[i].x, tiles[i].y, squareSize, squareSize);
			context.strokeRect(tiles[i].x, tiles[i].y, squareSize, squareSize);
			context.fill();
			context.stroke();
		}
	}
	/* in the following functions, the uhOh Boolean indicates that we've nudged
	 the shape outside of the active square area on the canvas*/
	l.onclick = function(){
		for(i = 0; i < tiles.length; i++){
			tiles[i].x -= 5;
			if(tiles[i].x < (squareSize/2)){
				uhOh= true;
			}
		}
		if(uhOh){
			for(i = 0; i < tiles.length; i++){
				tiles[i].x += 5;
			}
			uhOh = false;
		}
		drawUpdate();
	};
	r.onclick = function(){
		for(i = 0; i < tiles.length; i++){
			tiles[i].x += 5;
			if(tiles[i].x > canv.width - (squareSize/2)){
				uhOh = true;
			}
		}
		if(uhOh){
			for(i = 0; i < tiles.length; i++){
				tiles[i].x -= 5;
			}
			uhOh = false;
		}
		drawUpdate();
	};
	u.onclick = function(){
		for(i = 0; i < tiles.length; i++){
			tiles[i].y -= 5;
			if(tiles[i].y < (squareSize/2)){
				uhOh = true;
			}
		}
		if(uhOh){
			for(i = 0; i < tiles.length; i++){
				tiles[i].y += 5;
			}
			uhOh = false;
		}
		drawUpdate();
	};
	d.onclick = function(){
		for(i = 0; i < tiles.length; i++){
			tiles[i].y += 5;
			if(tiles[i].y > canv.height - (squareSize/2)){
				uhOh = true;
			}
		}
		if(uhOh){
			for(i = 0; i < tiles.length; i++){
				tiles[i].y -= 5;
			}
			uhOh = false;
		}
		drawUpdate();
	};

	resetter.onclick = function(){
		if(tiles.length > 0){
			console.log("resetting editor");
			for(i = 0; i < tiles.length; i++){
				tiles.pop();
			}
			context.strokeStyle = normal;
			context.fillStyle = inactive;
			drawBase();
			canClickTiles = true;
		}
	};
	canv.addEventListener('click', function (e) {
     mouseX = Number(e.pageX - this.offsetLeft);
     mouseY = Number(e.pageY - this.offsetTop);
     //console.log(mouseX + ', ' + mouseY);
	  if(canClickTiles){
      	dealWithClicks(mouseX, mouseY);
	   }
   });

	init();
	//console.log("x points: " + JSON.stringify(xPoints));
	//console.log("y points: "+JSON.stringify(yPoints));
}());
