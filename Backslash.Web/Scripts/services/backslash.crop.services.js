if (!backslash.crop) {
    backslash.crop = { services: {} };
}

var vm = this;
vm.canvas;
vm.$canvas;
vm.canvasOffset;
vm.canvasImg;
vm.ch;
vm.ctx;
vm.cw;
vm.offsetX;
vm.offsetY;
vm.points = [];


backslash.crop.services.initCropModal = function (result) {
    //canvas related variables
    vm.canvas = document.getElementById("cropCanvas");
    vm.ctx = vm.canvas.getContext("2d");
    vm.cw = null;
    vm.ch = null;
    vm.$canvas = $("#cropCanvas");
    vm.canvasOffset = vm.$canvas.offset();
    vm.offsetX = vm.canvasOffset.left;
    vm.offsetY = vm.canvasOffset.top;

    //an array to hold user's click-points that define the clipping area
    vm.points = [];

    //load the image
    vm.canvasImg = new Image();
    vm.canvasImg.crossOrigin = 'anonymous';
    vm.canvasImg.onload = backslash.crop.services.start;
    vm.canvasImg.src = result;
}


backslash.crop.services.start = function () {

    //resize canvas to fit the image
    vm.cw = vm.canvas.width = vm.canvasImg.width;
    vm.ch = vm.canvas.height = vm.canvasImg.height;

    //resize modal to fit canvas
    console.log("image width", vm.cw);
    console.log("image height", vm.ch);
    console.log("pre canvas width check");

    //if image width is greater than 90% of window width, resize it to 90% of the window width
    //reset canvas size according to image
    //resizes canvas but not to scale with mouse points
    if (vm.cw > (screen.width * .8)) {
        vm.cw = screen.width * .8;
        console.log(vm.$canvas);

        vm.$canvas.width(vm.cw);
        $("#cropCanvas").attr('width', vm.cw);
    }
    
    var modalDialogWidth = $(canvas.closest('.modal-dialog')).width();
    var modalDialogHeight = $(canvas.closest('.modal-dialog')).height();
    var modalWidth = vm.cw > 0 ? vm.cw + (vm.cw * .1) : modalDialogWidth + (modalDialogWidth * .1);
    var modalHeight = vm.ch > 0 ? vm.ch + (vm.ch * .1) : modalDialogHeight + (modalDialogHeight * .1);

    $(canvas.closest('.modal-dialog')).width(modalWidth < 800 ? 600 : modalWidth);
    $(canvas.closest('.modal-dialog')).height(modalHeight < 800 ? 'auto' : modalHeight);
    $(canvas.closest('.modal-body')).css('max-width', '100%');
    

    //draw the image at 25% opacity
    backslash.crop.services.drawImage(0.25);

    //listen for mousedown and button clicks
    $('#cropCanvas').mousedown(function (e) { backslash.crop.services.handleMouseDown(e); });
    $('#reset').click(function () { vm.points.length = 0; backslash.crop.services.drawImage(0.25); });
    //console.log("start")
}


backslash.crop.services.handleMouseDown = function (e) {
    //reset the offsets
    vm.canvasOffset = vm.$canvas.offset();
    vm.offsetX = vm.canvasOffset.left;
    vm.offsetY = vm.canvasOffset.top;

    //tell the browser that we're handling this event
    e.preventDefault();
    e.stopPropagation();

    //calculate mouseX & mouseY
    var mx = parseInt(e.clientX - vm.offsetX);
    var my = parseInt(e.offsetY);

    //push the clicked point to the points[] array
    vm.points.push({ x: mx, y: my });

    //console.log("handleMouseDown_1");
    //show the user an outline of their current clipping path
    backslash.crop.services.outlineIt();

    //if the user clicked back in the original circle
    //then complete the clip
    if (vm.points.length > 1) {
        var dx = mx - vm.points[0].x;
        var dy = my - vm.points[0].y;
        if (dx * dx + dy * dy < 10 * 10) {
            backslash.crop.services.clipIt();
        }
    }
    //console.log("handleMouseDown_2");
}


//redraw the image at the specified opacity
backslash.crop.services.drawImage = function (alpha) {
    //set some canvas styles
    vm.ctx.strokeStyle = '#EC7C7D';

    vm.ctx.clearRect(0, 0, vm.cw, vm.ch);
    vm.ctx.globalAlpha = alpha;

    vm.ctx.drawImage(vm.canvasImg, 0, 0);
    vm.ctx.globalAlpha = 1.00;
    //console.log("drawImage");
}


//show the current potential clipping path
backslash.crop.services.outlineIt = function () {
    backslash.crop.services.drawImage(0.25);
    vm.ctx.beginPath();
    vm.ctx.moveTo(vm.points[0].x, vm.points[0].y);
    for (var i = 0; i < vm.points.length; i++) {
        vm.ctx.lineTo(vm.points[i].x, vm.points[i].y);
    }
    //ctx.closePath();
    vm.ctx.stroke();
    vm.ctx.beginPath();
    vm.ctx.arc(vm.points[0].x, vm.points[0].y, 10, 0, Math.PI * 2);
    //ctx.closePath();
    vm.ctx.stroke();
    //console.log("outlineIt");
}


//clip the selected path to a new canvas
backslash.crop.services.clipIt = function () {

    //calculate the size of the user's clipping area
    var minX = 10000;
    var minY = 10000;
    var maxX = -10000;
    var maxY = -10000;
    for (var i = 1; i < vm.points.length; i++) {
        var p = vm.points[i];
        if (p.x < minX) { minX = p.x; }
        if (p.y < minY) { minY = p.y; }
        if (p.x > maxX) { maxX = p.x; }
        if (p.y > maxY) { maxY = p.y; }
    }
    var width = maxX - minX;
    var height = maxY - minY;

    //clip the image into the user's clipping area
    vm.ctx.save();
    vm.ctx.clearRect(0, 0, vm.cw, vm.ch);
    vm.ctx.beginPath();
    vm.ctx.moveTo(vm.points[0].x, vm.points[0].y);
    for (var i = 1; i < vm.points.length; i++) {
        var p = vm.points[i];
        vm.ctx.lineTo(vm.points[i].x, vm.points[i].y);
    }

    //ctx.closePath();
    vm.ctx.clip();
    vm.ctx.drawImage(vm.canvasImg, 0, 0);
    vm.ctx.restore();

    //create a new canvas
    var c = document.createElement('canvas');
    var cx = c.getContext('2d');

    //resize the new canvas to the size of the clipping area
    c.width = width;
    c.height = height;

    //draw the clipped image from the main canvas to the new canvas
    cx.drawImage(vm.canvas, minX, minY, width, height, 0, 0, width, height);

    //create a new Image() from the new canvas
    var clippedImage = new Image();

    clippedImage.onload = function () {
        //append the new image to the page
        //document.body.appendChild(clippedImage);

        $('#cropCanvas').hide();
        $('#cropResult').attr('src', clippedImage.src);
        $('#cropResult').show();

        //console.log("clippedImage.onload");
    }

    clippedImage.src = c.toDataURL();

    //clear the previous points
    vm.points.length = 0;

    //console.log("clipIt");
    //redraw the image on the main canvas for further clipping
    backslash.crop.services.drawImage(0.25);
}