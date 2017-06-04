if (!backslash.outfitBuilder) {
    backslash.outfitBuilder = { services: {} };
}

var vm = this;
vm.canvas = null;

backslash.outfitBuilder.services.selectObjFromPicker = function (imageId) {

    //go through the _objects in vm.canvas
    for (var i = 0; i < vm.canvas._objects.length; i++) {
        var obj = vm.canvas._objects[i];

        if (obj.id == imageId) {
            vm.canvas.setActiveObject(canvas.item(i));
            var activeObject = vm.canvas.getActiveObject();
            vm.canvas.remove(activeObject);
        }
    }
}

backslash.outfitBuilder.services.addImage = function (imageUrl, minScale, maxScale) {
    var coord = getRandomLeftTop();

    //if already exists in canvas, don't add another
    for (var i = 0; i < vm.canvas._objects.length; i++) {
        var obj = vm.canvas._objects[i];
        if (obj.id == imageUrl)
            return;
    }


    fabric.Image.fromURL(imageUrl, function (image) {

        image.set({
            left: 0,
            top: 0,
            angle: 0,
            id: imageUrl
        })
        .scale(getRandomNum(minScale, maxScale))
        .setCoords();

        vm.canvas.add(image);
    }, {
        crossOrigin: 'Anonymous'
    });
};

backslash.outfitBuilder.services.getActiveStyle = function (styleName, object) {
    console.log("getactivestyle");
    object = object || vm.canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
};

backslash.outfitBuilder.services.setActiveStyle = function (styleName, value, object) {
    console.log("setactivestyle");
    object = object || vm.canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
        var style = {};
        style[styleName] = value;
        object.setSelectionStyles(style);
        object.setCoords();
    }
    else {
        object.set(styleName, value);
    }

    object.setCoords();
    vm.canvas.renderAll();
};

backslash.outfitBuilder.services.getActiveProp = function (name) {
    console.log("getactiveprop");
    var object = vm.canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
}

backslash.outfitBuilder.services.setActiveProp = function (name, value) {
    console.log("setActiveProp");
    var object = vm.canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    vm.canvas.renderAll();
}

backslash.outfitBuilder.services.confirmClear = function () {
    if (confirm('Are you sure?')) {
        vm.canvas.clear();
    }
};

backslash.outfitBuilder.services.rasterize = function () {
    if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
        window.open(vm.canvas.toDataURL('png'));
    }
};

backslash.outfitBuilder.services.exportRasterizedCanvas = function () {
    if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
        return vm.canvas.toDataURL('png');
    }
};

backslash.outfitBuilder.services.getSelected = function () {
    return vm.canvas.getActiveObject();
};

backslash.outfitBuilder.services.removeSelected = function () {
    var activeObject = vm.canvas.getActiveObject(),
        activeGroup = vm.canvas.getActiveGroup();

    if (activeGroup) {
        var objectsInGroup = activeGroup.getObjects();
        vm.canvas.discardActiveGroup();
        objectsInGroup.forEach(function (object) {
            vm.canvas.remove(object);
        });
    }
    else if (activeObject) {
        vm.canvas.remove(activeObject);
    }
};

backslash.outfitBuilder.services.sendBackwards = function () {
    var activeObject = vm.canvas.getActiveObject();
    if (activeObject) {
        vm.canvas.sendBackwards(activeObject);
    }
};

backslash.outfitBuilder.services.sendToBack = function () {
    var activeObject = vm.canvas.getActiveObject();
    if (activeObject) {
        vm.canvas.sendToBack(activeObject);
    }
};

backslash.outfitBuilder.services.bringForward = function () {
    var activeObject = vm.canvas.getActiveObject();
    if (activeObject) {
        vm.canvas.bringForward(activeObject);
    }
};

backslash.outfitBuilder.services.bringToFront = function () {
    var activeObject = vm.canvas.getActiveObject();
    if (activeObject) {
        vm.canvas.bringToFront(activeObject);
    }
};


backslash.outfitBuilder.services.initCustomization = function () {
    if (typeof Cufon !== 'undefined' && Cufon.fonts.delicious) {
        Cufon.fonts.delicious.offsetLeft = 75;
        Cufon.fonts.delicious.offsetTop = 25;
    }

    if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
        fabric.Object.prototype.cornerSize = 30;
    }

    fabric.Object.prototype.transparentCorners = false;

    if (document.location.search.indexOf('guidelines') > -1) {
        initCenteringGuidelines(vm.canvas);
        initAligningGuidelines(vm.canvas);
    }
}

backslash.outfitBuilder.services.getPreserveObjectStacking = function () {
    return vm.canvas.preserveObjectStacking;
};

backslash.outfitBuilder.services.setPreserveObjectStacking = function (value) {
    return vm.canvas.preserveObjectStacking = value;
};

backslash.outfitBuilder.services.watchCanvas = function (canvas) {

    var baseService = this;
    vm.canvas = canvas;

    function updateScope() {
        baseService.$timeout(function () {
            vm.canvas.renderAll();
        }, 0);

    }

    vm.canvas
      .on('object:selected', updateScope)
      .on('group:selected', updateScope)
      .on('path:created', updateScope)
      .on('selection:cleared', updateScope);
}