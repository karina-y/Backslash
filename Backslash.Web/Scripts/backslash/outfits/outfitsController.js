(function () {
    "use strict";

    angular.module(APPNAME)
    .controller("outfitsController", OutfitsController);

    OutfitsController.$inject = ['$scope', '$baseController', '$closetService', '$uibModal', '$outfitBuilderService'];

    function OutfitsController(
        $scope
        , $baseController
        , $closetService
        , $uibModal
        , $outfitBuilderService) {

        var vm = this;
        $baseController.merge(vm, $baseController);
        vm.$scope = $scope;
        vm.$closetService = $closetService;
        vm.$uibModal = $uibModal;
        vm.$outfitBuilderService = $outfitBuilderService;

        vm.completedOutfit = null;
        vm.fileName = null;
        vm.imageForm = null;
        vm.imageResults = null;
        vm.imgTags = [];
        vm.items = null;
        vm.newImage = {};
        vm.outfitCanvas = null;
        vm.pins = null;
        vm.tags = [];
        vm.taggedImages = [];
        vm.tagsSearchedCount = null;
        vm.titleImage = null;
        vm.titleImageClass = null;

        vm.concatTags = _concatTags;

        vm.addFile = _addFile;
        vm.addFileError = _addFileError;
        vm.buildOutfit = _buildOutfit;
        vm.getAllTags = _getAllTags;
        vm.getAllTagsError = _getAllTagsError;
        vm.getFilesByUserId = _getFilesByUserId;
        vm.getImageBySearch = _getImageBySearch;
        vm.loadError = _loadError;
        vm.openModal = _openModal;
        vm.openOutfitBuilderModal = _openOutfitBuilderModal;
        vm.resetForm = _resetForm;
        vm.searchSuccess = _searchSuccess;
        vm.uploadSuccess = _uploadSuccess;

        $closetService.getFilesByUserId("outfits", vm.getFilesByUserId, vm.error);
        $closetService.getAllTags(vm.getAllTags, vm.error);

        function _addFile() {
            if (vm.completedOutfit == null)
                return vm.openModal("error_closet_forgotFile.png")

            vm.concatTags();
            
            var file = new FormData();

            file.append("fileTags", angular.toJson(vm.imgTags));
            file.append("base64Image", vm.completedOutfit);
            file.append("fileName", vm.fileName);

            console.log("appending image");

            $closetService.addFile(file, "outfits", vm.uploadSuccess, vm.addFileError);
        }

        function _addFileError(response) {
            console.log("error uploading", response);
            vm.openModal("error_generic_tryAgain.png");
        }

        function _buildOutfit() {
            vm.openOutfitBuilderModal("");
        }

        function _concatTags() {
            var concatTags = [];
            var tagsArr = [];

            if (vm.newImage && vm.newImage.tags) {
                concatTags = Object.values(vm.newImage.tags).concat();

                for (var i = 0; i < concatTags.length; i++) {
                    tagsArr = tagsArr.concat(concatTags[i]);
                }

                for (var j = 0; j < tagsArr.length; j++) {
                    vm.imgTags[j] = { TagId: parseInt(tagsArr[j]) };
                }
            }
        }
        
        function _getAllTags(data) {
            vm.tags = JSON.parse(data.data);
        }

        function _getAllTagsError(response) {
            vm.openModal("error_generic_refresh.png");
        }

        function _getFilesByUserId(data) {
            vm.imageResults = JSON.parse(data.data);
        }

        function _getImageBySearch() {
            if (vm.newImage && vm.newImage.tags) {
                vm.concatTags();

                var query = angular.toJson({ file: { fileTags: vm.imgTags, fileDirectory: "outfits" } });

                $closetService.search("outfits", query, vm.searchSuccess, vm.loadError);
            }

            else {
                console.log("here");
                return vm.openModal("error_tags.png");
            }
        }

        function _loadError() {
            vm.openModal("error_closet_images_search.png");
        }

        function _openModal(message) {
            var modalInstance = vm.$uibModal.open({
                animation: true,
                templateUrl: 'profileModalContent.html',
                controller: 'profileModalController as pmc',
                windowClass: vm.modalClass,
                size: 'open',
                resolve: {
                    modalItem: function () {
                        return message;
                    }
                }
            });
        }

        function _openOutfitBuilderModal(message) {
            var modalInstance = vm.$uibModal.open({
                animation: true,
                templateUrl: 'outfitBuilderModalContent.html',
                controller: 'outfitBuilderModalController as omc',
                windowClass: vm.modalClass,
                size: 'xl',
                resolve: {
                    modalItem: function () {
                        return message;
                    }
                }
            }).result
                .then(function (response) {
                    if (response != null && response.success) {
                        vm.completedOutfit = response.completedOutfit;
                        vm.fileName = response.fileName;
                        vm.continueUpload = true;
                    }
                    else {

                    }
                });
        }

        function _resetForm() {
            vm.imageForm.$setPristine();
            vm.imageForm.$setUntouched();

            vm.newImage = null;
            vm.imgTags = [];
        }

        function _searchSuccess(data) {
            vm.imageResults = JSON.parse(data.data);
            vm.resetForm();
        }

        function _uploadSuccess() {
            console.log("upload succeeded");
            $closetService.getFilesByUserId("outfits", vm.getFilesByUserId, vm.error);
            vm.resetForm();
        }
    }
})();