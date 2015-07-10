(height, percentage, charging, low, color) 
{
var canvas  = document.createElement("canvas"),
	context = canvas.getContext("2d"),
	tint 	= "rgba(" + color.join() + ",1)";

var barHeight = Math.round(height * 3/10);

var 
	blockCount = 5,
	percentPerBlock = 100/blockCount,
	blockWidth = barHeight,
	spacing = 4;

var barWidth = (blockWidth + spacing)*blockCount;

/* how thick is the border */
var borderWidth = 1;

/* set the dimensions */
canvas.width = barWidth;
canvas.height = barHeight;

/* drawing settings  */
context.lineWidth = borderWidth;
context.strokeStyle = tint;
context.fillStyle = tint;

var topLeft, cx,cy;
for (var i=1;i<=blockCount;i++) {

	topLeft = (i-1)*spacing+(i-1) * blockWidth;
	cx = topLeft + blockWidth/2;
	cy = barHeight/2;
	radius = blockWidth/2-1;
	//    context.strokeRect( (i-1)*spacing+(i-1)*blockWidth, 0, blockWidth, barHeight);

	context.beginPath();
	context.arc(cx,cy,radius,0,2*Math.PI);

	if (percentage<=20) { 
		context.fillStyle = '#F00';
		context.strokeStyle = '#F00';
	}
	if (charging) { 
		context.fillStyle = '#0F0';
		context.strokeStyle = '#0F0';
	}

	if (percentage > ((i-1)*percentPerBlock)) {
		context.fill();
	}
	context.stroke();

}

/* send the image back */
return canvas.toDataURL("image/png");

//end
}