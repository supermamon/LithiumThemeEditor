(height, percentage, charging, low, color) 
{

    /* just keep these */
    var canvas  = document.createElement("canvas"),
        context = canvas.getContext("2d"),
      	tint = "rgba(" + color.join() + ",1)";

    /* prepare the dimensions */
    /* barHeight = three-quarters of the statusBar */
    var barHeight = Math.round(height *6/12);

    /* barWidth = 4 times the height */
    var barWidth = barHeight*2.5;

    /* how thick is the border */
    var borderWidth = 2;

var battTop = borderWidth*2+2;

    /* inner dimensions */
    var innerHeight = barHeight-borderWidth*2;
    var innerWidth  = barWidth-borderWidth*2-battTop;


    /* set the dimensions */
    canvas.width = barWidth;
    canvas.height = barHeight;

    /* draw the borders */
    context.lineWidth = borderWidth;
    
    context.strokeStyle = tint;
    context.strokeRect(0, 0, barWidth-battTop , barHeight);

    context.strokeRect(barWidth-battTop, barHeight/3, 4 , barHeight/3);

    /* draw the charge */
    context.fillStyle = tint;
    if (charging) {
        context.fillStyle = '#0f0';
    }
    if (!charging && low || !charging && percentage <= 20) {
        context.fillStyle = "#F00"; /* red */
    }
    context.fillRect(
		borderWidth, borderWidth, 
		Math.round(innerWidth*(percentage/100)), 
		innerHeight);

    /* some text */
    context.globalCompositeOperation = "xor";
    context.fillStyle = tint;
    context.font = (innerHeight*0.80) + "px Helvetica";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(
		percentage, //text
		Math.round(barWidth/2-4), 
		Math.round(barHeight/2)
    );
    context.globalCompositeOperation = "source-over";


    /* send the image back */
    return canvas.toDataURL("image/png");
}