(height, percentage, charging, low, color) 
{
/* prepare */
var canvas  = document.createElement("canvas"),
	context = canvas.getContext("2d"),
	tint 	= "rgba(" + color.join() + ",1)",
	tintTrans= "rgba(" + color.join() + ",0)";

/* prepare the dimensions */
var barHeight = Math.round(height * 2/6);

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
//  context.strokeRect(0, 0, barWidth, barHeight);

var topLeft, cx,cy;
for (var i=1;i<=blockCount;i++) {

	topLeft = (i-1)*spacing+(i-1) * blockWidth;
	cx = topLeft + blockWidth/2;
	cy = barHeight/2;
	radius = blockWidth/2-1;
	//    context.strokeRect( (i-1)*spacing+(i-1)*blockWidth, 0, blockWidth, barHeight);

	context.beginPath();
	context.arc(cx,cy,radius,0,2*Math.PI);

	if (percentage<=5) { 
		context.fillStyle = tintTrans;
		context.strokeStyle = '#F00';
	} else if (percentage<=10) { 
		context.fillStyle = '#F00';
		context.strokeStyle = '#F00';
	} else if (percentage<=20) {
		context.fillStyle = '#F60';
		context.strokeStyle = '#F60';
	} else if (percentage<=60) {
		context.fillStyle = '#FE0';
		context.strokeStyle = '#FE0';
	} else if (percentage<=80) {
		context.fillStyle = '#CF0';
		context.strokeStyle = '#CF0';
	} else if (percentage<=100) {
		context.fillStyle = '#0F0';
		context.strokeStyle = '#0F0';
	}  
	if (charging) { 
		context.fillStyle = '#0F0';
		context.strokeStyle = '#0F0';
	}

	if (percentage > ((i-1)*percentPerBlock)) {
		context.fill();
	} else {
		context.fillStyle   = "rgba(180,180,180,0.7)";
		context.strokeStyle = tint;
		context.fill();
        }
	context.stroke();

}

/* send the image back */
return canvas.toDataURL("image/png");

//end
}