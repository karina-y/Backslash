(function () {
    "use strict";

    angular.module(APPNAME)
    .controller("editImageController", EditImageController);

    EditImageController.$inject = ['$scope', '$baseController', '$closetService', '$uibModal', '$timeout'];

    function EditImageController(
        $scope
        , $baseController
        , $closetService
        , $uibModal
        , $timeout) {

        var vm = this;
        $baseController.merge(vm, $baseController);
        vm.$closetService = $closetService;
        vm.$scope = $scope;
        vm.$uibModal = $uibModal;
        vm.$timeout = $timeout;

        vm.currentImage = null;
        vm.editVisibility = false;
        vm.imageForm = null;
        vm.imageResults = null;
        vm.imgTags = [];
        vm.items = null;
        vm.currentImage = {
            "fileName": fileName
            , "tags":
                {
                    "colors": []
                    , "material": []
                    , "tops": []
                    , "bottoms": []
                    , "dresses": []
                    , "onePieces": []
                    , "outerwear": []
                    , "occasion": []
                    , "season": []
                    , "style": []
                    , "accessories": []
                    , "bags": []
                    , "ftwrHeight": []
                    , "ftwrStyle": []
                }
        };
        vm.pins = null;
        vm.selectedTags = [];
        vm.tags = [];
        vm.taggedImages = [];
        vm.tagVisibility = false;

        vm.concatTags = _concatTags;
        vm.deleteSingleImage = _deleteSingleImage;
        vm.getSelectedTags = _getSelectedTags;
        vm.getAllTags = _getAllTags;
        vm.deleteSuccess = _deleteSuccess;
        vm.openModal = _openModal;
        vm.updateImageData = _updateImageData;
        vm.updateSuccess = _updateSuccess;

        $closetService.getSelectedTags(fileId, vm.getSelectedTags, vm.error);

        //find a way to make this more efficient
        function _concatTags() {
            var concatTags = [];
            var tagsArr = [];

            if (vm.currentImage && vm.currentImage.tags) {
                concatTags = Object.values(vm.currentImage.tags).concat();

                for (var i = 0; i < concatTags.length; i++) {
                    tagsArr = tagsArr.concat(concatTags[i]);
                }

                for (var j = 0; j < tagsArr.length; j++) {
                    vm.imgTags[j] = { "TagId": parseInt(tagsArr[j]) };
                }
            }
        }

        function _deleteSingleImage() {
            $closetService.deleteImage(fileId, vm.deleteSuccess, vm.tryAgainError);
        }

        function _deleteSuccess() {
            window.location.replace("/profile/home");
        }

        function _getAllTags(data) {
            vm.tags = JSON.parse(data.data);
        }

        function _getSelectedTags(data) {
            vm.selectedTags = JSON.parse(data.data);

            for (var i = 0; i < vm.selectedTags.length; i++) {

                var tag = vm.currentImage.tags;
                var tagId = vm.selectedTags[i].TagId.toString();

                switch (vm.selectedTags[i].Tag.TagCategoryId) {
                    case 1:
                        tag.colors.push(tagId);
                        break;
                    case 2:
                        tag.material.push(tagId);
                        break;
                    case 3:
                        tag.tops.push(tagId);
                        break;
                    case 4:
                        tag.bottoms.push(tagId);
                        break;
                    case 5:
                        tag.onePieces.push(tagId);
                        break;
                    case 6:
                        tag.outerwear.push(tagId);
                        break;
                    case 7:
                        tag.occasion.push(tagId);
                        break;
                    case 8:
                        tag.season.push(tagId);
                        break;
                    case 9:
                        tag.style.push(tagId);
                        break;
                    case 10:
                        tag.accessories.push(tagId);
                        break;
                    case 11:
                        tag.bags.push(tagId);
                        break;
                    case 12:
                        tag.ftwrHeight.push(tagId);
                        break;
                    case 13:
                        tag.ftwrStyle.push(tagId);
                        break;
                }
            }

            //do i need this?
            vm.$timeout(function () {
                $closetService.getAllTags(vm.getAllTags, vm.error);
            }, 0);
        }

        function _openModal(message) {
            var modalInstance = vm.$uibModal.open({
                animation: true,
                templateUrl: 'modalContent.html',
                controller: 'modalController as mc',
                windowClass: vm.modalClass,
                size: 'open',
                resolve: {
                    modalItem: function () {
                        return message;
                    }
                }
            });
        }

        function _tryAgainError() {
            vm.editVisibility = true;
            vm.tagVisibility = false;
            vm.openModal("error_generic_tryAgain");
        }

        function _updateImageData() {
            vm.concatTags();

            var fileData = {
                FileName: vm.currentImage.fileName
                , FileId: fileId
                , FileTags: vm.imgTags
            };

            var file = angular.toJson({ file: fileData });

            $closetService.updateFile(file, "closet", vm.updateSuccess, vm.tryAgainError);
        }

        function _updateSuccess() {
            window.location.replace("/profile/home");
        }
    }
})();


(function () {
    "use strict";

    angular.module(APPNAME)
    .controller('modalController', ModalController);

    ModalController.$inject = ['$scope', '$baseController', '$uibModalInstance', 'modalItem']

    function ModalController(
        $scope
        , $baseController
        , $uibModalInstance
        , modalItem
        ) {

        var vm = this;

        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
        vm.$uibModalInstance = $uibModalInstance;
        vm.modalMsg = modalItem;

        vm.cancel = function () {
            vm.$uibModalInstance.close();
        };
    }
})();