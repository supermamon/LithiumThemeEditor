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
canvasHeightRatio = 3/4,

// canvasWidthRatio : ratio of the icon width vs icon height
canvasWidthRatio  = 5, // vs Height

// slotCount : The number of blocks the icon is made of
// Forced to 1 if canvasType = "square"
slotCount   = 5,

// slotSpacing : Then space between blocks, in pixels
slotSpacing = 3,

// slotShape   : Default : rectangle
//Options
//   rectangle
//   circle
slotShape   = "circle",

// tintNormal : Color for the normal icon
tintNormal  = tintOpaque,

// tintCharged : Color for the charging icon
tintCharged = '#0F0',

// tintLowBat : Color for the low battery icon
tintLowBat  = '#F00',

// debugging
fixingIt    = true;

/* *************************************************************************** *
 * No touching from this point
 * ****************************************************************************/

/* shape functions */
var fnShape = [];
fnShape['circle'] = function(s,f,cx,cy,r,a,s) {
    context.beginPath();
    context.arc(cx,cy,r,0,a);
    
    if (s) {context.stroke();}
    if (f) {context.fill();}
}
fnShape['rectangle'] = function(s,f,x,y,w,h) {
    if (s) {context.strokeRect(x, y, w, h);}
    if (f) {context.fillRect(x, y, w, h);}
}
 
// defaults
context.strokeStyle = tintOpaque;
context.fillStyle   = tintOpaque;

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
    default:
    }
        
}
if (fixingIt) {
	context.strokeStyle = '#F00';
	context.strokeRect(0, 0, canvasWidth, canvasHeight);
}

/* send the image */
return canvas.toDataURL("image/png");
}