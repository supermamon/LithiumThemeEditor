(height, percentage, charging, low, color)
{
var 
    canvas        = document.createElement("canvas"),
    context     = canvas.getContext("2d"),
    tintOpaque    = "rgba(" + color.join() + ",1)",
    tintTransp    = "rgba(" + color.join() + ",0)",
    tintTransl    = "rgba(" + color.join() + ",0.5)";

/* *************************************************************************** *
 * Customize your icon here
 * ****************************************************************************/
var 
// canvasType : proportions of the icon.
// Default is: rectangle
// Options are: 
//    rectangle 
//    square
canvasType        = "rectangle",
	
// canvasHeightRatio : ratio of the icon height vs the StatusBar height
canvasHeightRatio = 4/4,

// canvasWidthRatio : ratio of the icon width vs icon height
canvasWidthRatio  = 3, // vs Height

// slotCount : The number of blocks the icon is made of
// Forced to 1 if canvasType = "square"
slotCount   = 5,

// slotSpacing : Then space between blocks, in pixels
slotSpacing = 2,

// slotShape   : Default : rectangle
//Options
//   rectangle
//   circle
slotShape   = "radial",

// tintNormal : Color for the normal icon
tintNormal  = tintOpaque,

// tintCharged : Color for the charging icon
tintCharged = '#0F0',

// tintLowBat : Color for the low battery icon
tintLowBat  = '#F00',

// useCustomLowBatLevel :
useCustomLowBatLevel = true,

// useCustomLowBatLevel : customLowBatLevel
customLowBatLevel = 20

// debugging
fixingIt                 = false
;

/* *************************************************************************** *
 * No touching from this point
 * ****************************************************************************/

/* shape functions */
var fnShape = [];
fnShape['circle'] = function(s,f,cx,cy,r,a) {
    context.beginPath();
    context.arc(cx,cy,r,0,a);
    
    if (s) {context.stroke();}
    if (f) {context.fill();}
}
fnShape['rectangle'] = function(s,f,x,y,w,h) {
    if (s) {context.strokeRect(x, y, w, h);}
    if (f) {context.fillRect(x, y, w, h);}
}
fnShape['radial'] = function(s,f,cx,cy,r,a) {
    context.beginPath();

    context.arc(cx,cy,r*0.8,0,a);
    if (s && !f) {context.stroke();}
    //if (f) {context.fill();}
    var grd=context.createRadialGradient(cx,cy,radius*0.1,cx,cy,radius*1.5);

    if (f) {
    if (percentage<=20) { 
        grd.addColorStop(0,tintLowBat);
    } else if (charging) {
        grd.addColorStop(0,tintCharged) ;
    } else {
        grd.addColorStop(0,tintNormal);
    }
    }
    grd.addColorStop(1,tintTransp); 
    context.fillStyle = grd;
    context.fill();

}
 
// defaults
context.strokeStyle = tintOpaque;
context.fillStyle   = tintOpaque;
context.lineWidth   = 1;

if (canvasType!="rectangle" && canvasType!="square") {
    canvasType="rectangle"
}
var canvasHeight  = Math.round(height * canvasHeightRatio)
var canvasWidth = ((canvasType=="square") ? canvasHeight : canvasHeight*canvasWidthRatio)
canvas.width        = canvasWidth;
canvas.height        = canvasHeight;

// force 1 slot if icon is square
if (canvasType=="square") {
    slotCount = 1;
}

var     
    slotEnergy  = 100/slotCount,
    slotWidth   = (canvasWidth - (slotCount-1)*slotSpacing) / slotCount;

context.strokeStyle = tintOpaque;
context.fillStyle   = tintOpaque;

if (useCustomLowBatLevel) {
    if(percentage<=customLowBatLevel) {
		low = true;
	}
}

if (low) {
    context.strokeStyle = tintLowBat;
    context.fillStyle   = tintLowBat;
}
if (charging) {
    context.strokeStyle = tintCharged;
    context.fillStyle   = tintCharged;
}

for (var i=1;i<=slotCount;i++) {
    
    var slotTopLeft = (i-1)*slotSpacing+(i-1) * slotWidth;
    var fillIt = (percentage > ((i-1)*slotEnergy));

    switch (slotShape) {
    case "rectangle" : 
        fnShape['rectangle'](true,fillIt,slotTopLeft,0,slotWidth, canvasHeight);
        break;
            
    case "circle" : 
        var cx = slotTopLeft + slotWidth/2;
        var cy = canvasHeight/2;
        var ra = slotWidth/2;
        var an = 2*Math.PI;
        fnShape['circle'](true,fillIt,cx,cy,ra,an)
        break;
    case "radial" : 
        var cx = slotTopLeft + slotWidth/2;
        var cy = canvasHeight/2;
        var ra = slotWidth/2;
        var an = 2*Math.PI;
        fnShape['radial'](true,fillIt,cx,cy,ra,an)
        break;
    default:
        fnShape['rectangle'](true,fillIt,slotTopLeft,canvasHeight/2-slotWidth/2,slotWidth, slotWidth);
        break;
    }
        
}
if (fixingIt) {
	context.strokeStyle = '#F00';
	context.strokeRect(0, 0, canvasWidth, canvasHeight);
}

/* send the image */
return canvas.toDataURL("image/png");
}