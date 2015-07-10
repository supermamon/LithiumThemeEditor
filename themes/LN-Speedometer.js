(height, percentage, charging, low, color)
{
/* just keep these */
var canvas      = document.createElement("canvas"),
    context     = canvas.getContext("2d"),
    tintOpaque  = "rgba(" + color.join() + ",1)",
    tintTransP  = "rgba(" + color.join() + ",0)",
    tintTransL  = "rgba(" + color.join() + ",0)";


/* prepare the dimensions */
var barHeight   = Math.round(height * 7/8); 
var barWidth    = barHeight;

/* set the dimensions */
canvas.width    = barWidth;
canvas.height   = barHeight;

/* how thick is the border */
var borderWidth = 1;

/* prep */
var pi=Math.PI, cx = barWidth-2, cy = barHeight, r = barHeight*0.8;

/* background */
context.lineWidth   = barHeight*0.12;
context.beginPath();
context.strokeStyle = tintOpaque;
context.arc(cx,cy,r,pi,1.5*pi);
context.stroke();
/* red arc */
context.lineWidth   = barHeight*0.1;
context.beginPath();
context.strokeStyle = "#F00";
context.arc(cx,cy,r,(1+(0.5*0.00))*pi,(1+(0.5*0.20))*pi);
context.stroke();
/* yellow arc */
context.beginPath();
context.strokeStyle = "#FF0";
context.arc(cx,cy,r,(1+(0.5*0.21))*pi,(1+(0.5*0.50))*pi);
context.stroke();
/* green arc */
context.beginPath();
context.strokeStyle = "#0F0";
context.arc(cx,cy,r,(1+(0.5*0.51))*pi,(1+(0.5*1.00))*pi);
context.stroke();
/* pointer */
context.beginPath();
context.lineWidth   = barHeight*0.05;
context.strokeStyle = tintOpaque;
context.moveTo(cx,cy);
var 
    theta = pi*(1+0.5*percentage/100),
    reduce = context.lineWidth+2,
    ex = cx+(r-reduce)*Math.cos(theta),
    ey = cy+(r-reduce)*Math.sin(theta);
context.lineTo(ex,ey);
context.stroke();

/* text */
context.globalCompositeOperation = "xor";
context.fillStyle                = (charging ? '#0F0' : tintOpaque);
context.font                     = (barHeight*0.30) + "px Verdana";
context.textAlign                = "left";
context.textBaseline             = "top";
context.fillText(percentage,0,0);

if (charging) {
context.fillStyle                = '#0F0';
context.font                     = (barHeight*0.4) + "px Verdana";
context.textAlign                = "left";
context.textBaseline             = "top";
context.fillText('\u26a1',1,(barHeight*0.25));
}

if (low) {
context.fillStyle                = '#F00';
context.font                     = (barHeight*0.4) + "px Verdana";
context.textAlign                = "left";
context.textBaseline             = "top";
context.fillText('!',1,(barHeight*0.35));

}


/* send the image */
return canvas.toDataURL("image/png");
}