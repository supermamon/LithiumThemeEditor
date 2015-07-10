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
var barHeight   = Math.round(height * 2/4); 
var barWidth    = barHeight*3;

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

/* background */

lW = barHeight*0.15;

context.strokeStyle   = "#CCC";
context.globalCompositeOperation  = "darker";

context.lineWidth = lW;
for (var i=lW;i<lW*30;i=i+lW*3) {
    context.moveTo(i,borderWidth);
    context.lineTo(i-lW*6,innerHeight);
    context.stroke();
}

/* fill in the charge level */
context.fillStyle   = tintOpaque;
if (charging) {context.fillStyle = '#0F0';}
if (!charging && low || !charging && percentage <= 20) {
	context.fillStyle = "#F00"; 
}

context.globalCompositeOperation = "source-atop";
context.fillRect(
	0, 0, 
	Math.round(barWidth*(percentage/100)), 
	barHeight);



/* text */
/*
context.globalCompositeOperation = "xor";
context.fillStyle                = tintOpaque;
context.font                     = (innerHeight*1.00) + "px Verdana";
context.textAlign                = "center";
context.textBaseline             = "middle";

context.fillText(
	percentage, 
	Math.round(borderWidth+innerWidth/2), 
	Math.round(borderWidth+innerHeight/2));
	
context.globalCompositeOperation  = "source-over";
*/
/* send the image */
return canvas.toDataURL("image/png");
}