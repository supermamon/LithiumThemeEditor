(height, percentage, charging, low, color) 
{
/* prepare */
var canvas  = document.createElement("canvas"),
	context = canvas.getContext("2d"),
	tint = "rgba(" + color.join() + ",1)";

/* prepare the dimensions */
/* barHeight = three-quarters of the statusBar */
var barHeight = Math.round(height * 1/4);

var 
	blockCount = 5,
	blockWidth = barHeight,
	spacing = 4;

/* barWidth = 4 times the height */
var barWidth = (blockWidth + spacing)*blockCount;

/* how thick is the border */
var borderWidth = 1;

/* set the dimensions */
canvas.width = barWidth;
canvas.height = barHeight;

/* draw the borders */
context.lineWidth = borderWidth;
context.strokeStyle = tint;
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

if (percentage >= (blockCount*i/blockCount*10)) {
	if (percentage<=20) { context.fillStyle = '#F00'}
	if (charging) { context.fillStyle = '#0F0'}
	context.fill();
}
context.stroke();

}

/* send the image back */
return canvas.toDataURL("image/png");

//end
}