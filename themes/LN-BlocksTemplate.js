(height, percentage, charging, low, color) 
{
/* ************************************************************************** *
 *                  Lithium Building Blocks Theme Template                    *
 *                            version 1.0.0                                   *
 *                            by @supermamon                                  *
 *                                                                            *          
 * This is a customizable template that you can use to create your own theme. *
 * Additional instructions are in the comments. If you have any questions,    *
 * contact be via Twitter (@supermamon) or PM me on Reddit /u/supermamon.     *
 *                                                                            *          
 * Enjoy!                                                                     *
 *                                                                            *
 * ************************************************************************** */
 
var DEBUG_SHOW_GUIDELINES = false;         // show enclosing borders

var 
    barHeight  = Math.round(height * 4/8), // How high do you want your icons to be?
    blockCount = 5,                        // how many do you want?
    blockWidth = barHeight*1.0,            // how skinny/fat do you want them?
    spacing    = 3;                        // how far away are they from each other?

/* drawBlock function

   This is the function that's being called to draw each block. 
   3 samples for starters
   Parameters are self-explanatory (I hope)
   
*/
function drawBlock(topX, topY, blockWidth, blockHeight, blockNumber, blockCount) { 
   drawTriangles(topX, topY, blockWidth, blockHeight, blockNumber, blockCount)
   //drawDots(topX, topY, blockWidth, blockHeight, blockNumber, blockCount)
   //drawSquares(topX, topY, blockWidth, blockHeight, blockNumber, blockCount)
   
}

function drawTriangles(topX, topY, blockWidth, blockHeight, blockNumber, blockCount) { 
    if (percentage >= (blockCount*blockNumber/blockCount*10)) {
        if (percentage<=20) { context.fillStyle = '#F00'}
        if (charging) { context.fillStyle = '#0F0'}
        context.strokeStyle = context.fillStyle;
    }  

    var path = new Path2D();
    path.moveTo(topX               , topY+blockHeight); // bottom left
    path.lineTo(topX+blockWidth    , topY+blockHeight); //bottom right
    path.lineTo(topX+blockWidth/2  , topY); // top center
    path.lineTo(topX               , topY+blockHeight); // bottom left
    context.stroke(path);

    if (percentage >= (blockCount*blockNumber/blockCount*10)) {
        context.fill(path);
    }  
}
function drawDots(topX, topY, blockWidth, blockHeight, blockNumber, blockCount) { 
    context.beginPath();
    cx = topX + blockWidth/2;
    cy = topY + blockHeight/2;
    radius = blockWidth/2-1;
    context.arc(cx,cy,radius,0,2*Math.PI);
    if (percentage >= (blockCount*blockNumber/blockCount*10)) {
        if (percentage<=20) { context.fillStyle = '#F00'}
        if (charging) { context.fillStyle = '#0F0'}
        context.fill();
    }
    context.stroke();
}

function drawSquares(topX, topY, blockWidth, blockHeight, blockNumber, blockCount) { 
    context.beginPath();
    context.strokeRect( (i-1)*spacing+(i-1)*blockWidth, 0, blockWidth, barHeight);
    if (percentage >= (blockCount*blockNumber/blockCount*10)) {
        if (percentage<=20) { context.fillStyle = '#F00'}
        if (charging) { context.fillStyle = '#0F0'}
        context.fillRect( topX, topY, blockWidth, blockHeight);
    }
    context.stroke();
}

/* ************************************************************************** */
/*      DON'T EDIT BEYOND THIS LINES UNLESS YOU KNOW WHAT YOU ARE DOING       */
/* ************************************************************************** */

// setup the canvas
var canvas  = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    tintOpaque    = "rgba(" + color.join() + ",1)",
    tintTransp    = "rgba(" + color.join() + ",0)",
    tintTransl    = "rgba(" + color.join() + ",0.5)",
    barWidth      = (blockWidth + spacing)*blockCount;

canvas.height       = barHeight;
canvas.width        = barWidth;
context.lineWidth   = 1;
 
// draw the guidelines
if (DEBUG_SHOW_GUIDELINES) {
	context.strokeStyle = tintOpaque;
    context.strokeRect(0, 0, barWidth, barHeight);
}
    
// loop through each block
for (var i=1;i<=blockCount;i++) {

    // defaults. can be overriden by the drawBlock function
    context.strokeStyle = tintOpaque;
    context.fillStyle   = tintOpaque;

    // draw the guidelines 
    if (DEBUG_SHOW_GUIDELINES) {
        context.strokeRect( (i-1)*spacing+(i-1)*blockWidth, 0, blockWidth, barHeight);
    }
	
    // draw block
    drawBlock((i-1)*spacing+(i-1) * blockWidth, 0, blockWidth, barHeight, i, blockCount)
    
} // each block


// send the image back
return canvas.toDataURL("image/png");
}