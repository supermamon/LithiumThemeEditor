(height, percentage, charging, low, color)
{
    var colorString = "rgb(" + color.join() + ")",
        scale = Math.floor(height / 20),
        halfHearts = Math.ceil(percentage / 5),
        fullHeartData,
        halfHeartData,
        emptyHeartData,
        finalCanvas = document.createElement("canvas"),
        finalContext = finalCanvas.getContext("2d");
    function initHeart(canvas, context) {
        canvas.width = scale * 8;
        canvas.height = scale * 7;
        context.fillStyle = colorString;
        context.fillRect(0, 0, scale * 8, scale * 7);
        context.clearRect(0, 0, scale, scale);
        context.clearRect(scale * 3, 0, scale, scale);
        context.clearRect(scale * 7, 0, scale, scale);
        context.clearRect(0, scale * 4, scale, scale);
        context.clearRect(scale * 7, scale * 4, scale, scale);
        context.clearRect(0, scale * 5, scale * 2, scale * 2);
        context.clearRect(scale * 6, scale * 5, scale * 2, scale * 2);
        context.clearRect(scale * 2, scale * 6, scale, scale);
        context.clearRect(scale * 5, scale * 6, scale, scale);
    }
    if(halfHearts > 1) {
        var fullHeartCanvas = document.createElement("canvas"),
            fullHeartContext = fullHeartCanvas.getContext("2d");
        initHeart(fullHeartCanvas, fullHeartContext);
        fullHeartData = fullHeartContext.getImageData(0, 0, scale * 8, scale * 7);
    }
    if(halfHearts % 2 == 1) {
        var halfHeartCanvas = document.createElement("canvas"),
            halfHeartContext = halfHeartCanvas.getContext("2d")
        initHeart(halfHeartCanvas, halfHeartContext);
        halfHeartContext.clearRect(scale * 4, scale, scale * 3, scale * 3);
        halfHeartContext.clearRect(scale * 4, scale * 4, scale * 2, scale);
        halfHeartContext.clearRect(scale * 4, scale * 5, scale, scale);
        halfHeartData = halfHeartContext.getImageData(0, 0, scale * 8, scale * 7);
    }
    if(halfHearts < 19) {
        var emptyHeartCanvas = document.createElement("canvas"),
            emptyHeartContext = emptyHeartCanvas.getContext("2d");
        initHeart(emptyHeartCanvas, emptyHeartContext);
        emptyHeartContext.clearRect(scale, scale, scale * 2, scale);
        emptyHeartContext.clearRect(scale * 4, scale, scale * 3, scale);
        emptyHeartContext.clearRect(scale, scale * 2, scale * 6, scale * 2);
        emptyHeartContext.clearRect(scale * 2, scale * 4, scale * 4, scale);
        emptyHeartContext.clearRect(scale * 3, scale * 5, scale * 2, scale);
        emptyHeartData = emptyHeartContext.getImageData(0, 0, scale * 8, scale * 7);
    }
    finalCanvas.width = scale * 44;
    finalCanvas.height = scale * 16;
    for(var i = 0; i < 10; i++) {
        finalContext.putImageData((halfHearts >= (i + 1) * 2) ? fullHeartData : (halfHearts - (i * 2) == 1) ? halfHeartData : emptyHeartData, (i % 5) * scale * 9, i < 5 ? scale * 9 : 0);
    }
    return finalCanvas.toDataURL("image/png");
}