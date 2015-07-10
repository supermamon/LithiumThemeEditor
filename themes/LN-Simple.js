(height, percentage, charging, low, color)
{
/* just keep these */
var canvas      = document.createElement("canvas"),
    context     = canvas.getContext("2d"),
    tintOpaque  = "rgba(" + color.join() + ",1)",
    tintTransp  = "rgba(" + color.join() + ",0)";

/* want to force a custom tint? */	
//tintOpaque    = "rgba(255,127,64,1)";
//tintTransp    = "rgba(255,127,64,0)";
	
/* prepare the dimensions */
var barHeight   = Math.round(height * 0.50); 
var barWidth    = barHeight*2;

/* how thick is the border */
var borderWidth = 2;

/* inner dimensions */
var innerHeight = barHeight-borderWidth*2;
var innerWidth  = barWidth-borderWidth*2;

/* set the dimensions */
canvas.width    = barWidth;
canvas.height   = barHeight;

/* draw the borders */
context.lineWidth   = borderWidth;
context.strokeStyle = tintOpaque;
context.strokeRect(0, 0, barWidth, barHeight);

/* fill in the charge level */
context.fillStyle   = tintOpaque;
if (charging) {context.fillStyle = '#0F0';}

/* if not charging and low or not charging and level is 20% and below */
if (!charging && low || !charging && percentage <= 20) {
	context.fillStyle = "#F00"; 
}
context.fillRect(
	borderWidth, borderWidth, 
	Math.round(innerWidth*(percentage/100)), 
	innerHeight);

/* text */
context.globalCompositeOperation = "xor";
context.fillStyle                = tintOpaque;
context.font                     = (innerHeight*0.95) + "px Verdana";
context.textAlign                = "center";
context.textBaseline             = "middle";

context.fillText(
	percentage, 
	Math.round(borderWidth+innerWidth/2), 
	Math.round(borderWidth/2+borderWidth+innerHeight/2));
	
context.globalCompositeOperation  = "source-over";

/* send the image */
return canvas.toDataURL("image/png");
}