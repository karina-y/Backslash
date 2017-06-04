(function () {
    "use strict";

    angular.module(APPNAME)
    .controller('outfitBuilderModalController', OutfitBuilderModalController);

    OutfitBuilderModalController.$inject = [
        '$scope'
        , '$baseController'
        , '$uibModalInstance'
        , 'modalItem'
        , '$fileReaderService'
        , '$outfitBuilderService'
        , '$closetService'
        , '$timeout']

    function OutfitBuilderModalController(
        $scope
        , $baseController
        , $uibModalInstance
        , modalItem
        , $fileReaderService
        , $outfitBuilderService
        , $closetService
        , $timeout
        ) {

        var vm = this;

        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
        vm.$uibModalInstance = $uibModalInstance;
        vm.$fileReaderService = $fileReaderService;
        vm.$outfitBuilderService = $outfitBuilderService;
        vm.$closetService = $closetService;
        vm.$timeout = $timeout;
        vm.modalMsg = modalItem;

        vm.fullOutfit = null;
        vm.outfitName = null;
        vm.imageResults = null;
        vm.optionSelected = null;
        vm.outfitCanvas = null;
        vm.selectedImages = [];

        vm.addLayer = _addLayer;
        vm.bringFront = _bringFront;
        vm.cancel = _cancel;
        vm.error = _error;
        vm.getFilesByUserId = _getFilesByUserId;
        vm.initCanvas = _initCanvas;
        vm.rasterize = _rasterize;
        vm.readFile = _readFile;
        vm.removeImage = _removeImage;
        vm.resetCanvas = _resetCanvas;
        vm.saveOutfitImage = _saveOutfitImage;
        vm.updateCanvas = _updateCanvas;


        $closetService.getFilesByUserId("closet", vm.getFilesByUserId, vm.error);

        function _addLayer() {
            vm.$outfitBuilderService.addTestImage();
        }

        function _error(response) {
            console.log("error", response);
        }

        function _getFilesByUserId(data) {
            vm.imageResults = JSON.parse(data.data);

            $timeout(function () {
                //when an option is selected from the image picker
                $('#outfitImagePicker').imagepicker({
                    selected: function (option) {
                        vm.selectedImages.push(option.value());
                        vm.updateCanvas(option.value());
                        vm.optionSelected = true;
                    },
                    clicked: function (option, event) {
                        if (event.deselected)
                            $outfitBuilderService.selectObjFromPicker(option.value());
                    }
                });

                $('#outfitImagePicker').data('picker').sync_picker_with_select();
            }, 0);
        }

        function _initCanvas() {
            vm.outfitCanvas = new fabric.Canvas('outfitCanvas');
            $outfitBuilderService.initCustomization();
            $outfitBuilderService.watchCanvas(vm.outfitCanvas);
        }

        function _rasterize() {
            $outfitBuilderService.rasterize();
        }

        function _removeImage() {
            $outfitBuilderService.removeSelected();
        }

        function _bringFront() {
            $outfitBuilderService.bringForward();
        }

        function _readFile() {
            //$scope.progress = 0;
            var file = document.getElementById("tempFile").files[0];

            vm.outfitName = file.name;

            vm.$fileReaderService.readAsDataURL(file)
                .then(function (result) {
                    vm.$outfitBuilderService.initCropModal(result);
                });
        };

        function _resetCanvas() {
            //vm.fullOutfit = null;
            $('#cropResult').hide();
            $('#cropCanvas').show();
        }

        function _updateCanvas(imageUrl) {
            $outfitBuilderService.addImage(imageUrl, 0.1, 0.25);
        }

        function _cancel() {
            vm.$uibModalInstance.close();
        };

        function _saveOutfitImage() {
            var response = {};
            response.success = true;
            response.completedOutfit = $outfitBuilderService.exportRasterizedCanvas();
            response.fileName = "testing outfit upload";

            vm.$uibModalInstance.close(response);
        }
    }
})();