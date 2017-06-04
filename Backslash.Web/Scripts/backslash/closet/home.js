//(function () {
//    "use strict";

//    angular.module(APPNAME)
//     .factory('$closetService', ClosetServiceFactory);

//    ClosetServiceFactory.$inject = ['$baseService'];

//    function ClosetServiceFactory($baseService) {
//        var aClosetServiceObject = backslash.closet.services;
//        var newService = $baseService.merge(true, {}, aClosetServiceObject, $baseService);
//        return newService;
//    }
//})();

//(function () {
//    "use strict";

//    angular.module(APPNAME)
//     .factory('$fileReaderService', FileReaderServiceFactory);

//    FileReaderServiceFactory.$inject = ['$baseService'];

//    function FileReaderServiceFactory($baseService) {
//        var aFileReaderServiceFactory = backslash.fileReader.services;
//        var newService = $baseService.merge(true, {}, aFileReaderServiceFactory, $baseService);
//        return newService;
//    }
//})();


//(function () {
//    "use strict";

//    angular.module(APPNAME)
//     .factory('$cropService', CropServiceFactory);

//    CropServiceFactory.$inject = ['$baseService'];

//    function CropServiceFactory($baseService) {
//        var aCropServiceFactory = backslash.crop.services;
//        var newService = $baseService.merge(true, {}, aCropServiceFactory, $baseService);
//        return newService;
//    }
//})();

//(function () {
//    "use strict";

//    angular.module(APPNAME)
//        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

//            $routeProvider.when('/', {
//                templateUrl: '/Scripts/pages/Closet.html',
//                controller: 'closetController',
//                controllerAs: 'cc'
//            }).when('/outfits', {
//                templateUrl: '/Scripts/pages/Outfits.html',
//                controller: 'outfitsController',
//                controllerAs: 'oc'
//            });

//            $locationProvider.html5Mode(false);
//        }]);
//})();


//(function () {
//    "use strict";

//    angular.module(APPNAME)
//    .controller("profileController", ProfileController);


//    ProfileController.$inject = ['$scope', '$baseController'];

//    function ProfileController(
//        $scope
//        , $baseController) {

//        var vm = this;
//        $baseController.merge(vm, $baseController);
//        vm.$scope = $scope;

//        vm.audreyVisibility = false;
//        vm.chanelVisibility = false;

//        vm.tabs = [
//            { link: '#/', label: 'Closet' },
//            { link: '#/outfits', label: 'Outfits' }
//        ];

//        vm.selectedTab = vm.tabs[0];
//        vm.tabClass = _tabClass;
//        vm.setSelectedTab = _setSelectedTab;

//        function _tabClass(tab) {
//            if (vm.selectedTab.label == "Outfits") {
//                vm.audreyVisibility = false;
//                vm.chanelVisibility = true;
//            }

//            else if (vm.selectedTab.label == "Closet") {
//                vm.audreyVisibility = true;
//                vm.chanelVisibility = false;
//            }


//            if (vm.selectedTab == tab) {
//                return "active";
//            }

//            else {
//                return "";
//            }
//        }

//        function _setSelectedTab(tab) {
//            vm.selectedTab = tab;
//        }
//    }
//})();


//(function () {
//    "use strict";

//    angular.module(APPNAME)
//    .controller("closetController", ClosetController);

//    ClosetController.$inject = ['$scope', '$baseController', '$closetService', '$uibModal'];

//    function ClosetController(
//        $scope
//        , $baseController
//        , $closetService
//        , $uibModal) {

//        var vm = this;
//        $baseController.merge(vm, $baseController);
//        vm.$scope = $scope;
//        vm.$closetService = $closetService;
//        vm.$uibModal = $uibModal;

//        vm.imageForm = null;
//        vm.imageResults = null;
//        vm.imgTags = [];
//        vm.items = null;
//        vm.newImage = {};
//        vm.pins = null;
//        vm.tags = [];
//        vm.taggedImages = [];
//        vm.tagsSearchedCount = null;
//        vm.titleImage = null;
//        vm.titleImageClass = null;

//        vm.concatTags = _concatTags;

//        vm.getAllTags = _getAllTags;
//        vm.getAllTagsError = _getAllTagsError;
//        vm.getFilesByUserId = _getFilesByUserId;
//        vm.loadError = _loadError;
//        vm.getImageBySearch = _getImageBySearch;
//        vm.openModal = _openModal;
//        vm.openCropModal = _openCropModal;
//        vm.resetForm = _resetForm;
//        vm.searchSuccess = _searchSuccess;
//        vm.addFile = _addFile;
//        vm.addFileError = _addFileError;
//        vm.uploadSuccess = _uploadSuccess;

//        $closetService.getFilesByUserId(vm.getFilesByUserId, vm.error);
//        $closetService.getAllTags(vm.getAllTags, vm.error);


//        function _addFile() {
//            //var singleFile = document.getElementById("file").files[0];

//            //if (singleFile == null)
//            //    vm.openModal("error_closet_forgotFile.png");
            
//            //else {
//                vm.concatTags();

//                //var fullImageData = {
//                //    Tags: vm.imgTags
//                //};

//                var file = new FormData();

//                //file.append("file", singleFile);

//                file.append("fileTags", angular.toJson(vm.imgTags));

//                file.append("base64Image", $('#cropResultHidden').val().toString());

//                file.append("fileName", $('#fileNameHidden').val().toString());

//                console.log("appending image");

//                $closetService.addFile(file, "closet", vm.uploadSuccess, vm.addFileError);
//            //}
//        }

//        function _addFileError(response) {
//            vm.openModal("error_generic_tryAgain.png");
//        }

//        function _concatTags() {
//            var concatTags = [];
//            var tagsArr = [];

//            if (vm.newImage && vm.newImage.tags) {
//                concatTags = Object.values(vm.newImage.tags).concat();

//                for (var i = 0; i < concatTags.length; i++) {
//                    tagsArr = tagsArr.concat(concatTags[i]);
//                }

//                for (var j = 0; j < tagsArr.length; j++) {
//                    vm.imgTags[j] = { TagId: parseInt(tagsArr[j]) };
//                }
//            }
//        }

//        function _getAllTags(data) {
//            vm.tags = JSON.parse(data.data);
//        }

//        function _getAllTagsError(response) {
//            vm.openModal("error_generic_refresh.png");
//        }

//        function _getFilesByUserId(data) {
//            vm.imageResults = JSON.parse(data.data);
//        }

//        function _getImageBySearch() {
//            if (vm.newImage && vm.newImage.tags) {
//                vm.concatTags();

//                var fileTags = {
//                    "tags": vm.imgTags
//                };

//                var query = angular.toJson({ tags: vm.imgTags });

//                $closetService.search(query, vm.searchSuccess, vm.loadError);
//            }

//            else {
//                return vm.openModal("error_tags.png");
//            }
//        }

//        function _loadError() {
//            vm.openModal("error_closet_images_search.png");
//        }

//        function _openModal(message) {
//            var modalInstance = vm.$uibModal.open({
//                animation: true,
//                templateUrl: 'modalContent.html',
//                controller: 'modalController as mc',
//                windowClass: vm.modalClass,
//                size: 'open',
//                resolve: {
//                    modalItem: function () {
//                        return message;
//                    }
//                }
//            });
//        }

//        function _openCropModal(image) {
//            var modalInstance = vm.$uibModal.open({
//                animation: true,
//                templateUrl: 'cropModalContent.html',
//                controller: 'modalController as mc',
//                windowClass: vm.modalClass,
//                size: 'open',
//                resolve: {
//                    modalItem: function () {
//                        return image;
//                    }
//                }
//            });
//        }

//        function _resetForm() {
//            vm.imageForm.$setPristine();
//            vm.imageForm.$setUntouched();

//            vm.newImage = null;
//            vm.imgTags = [];
//        }

//        function _searchSuccess(data) {
//            vm.imageResults = JSON.parse(data.data);
//            vm.resetForm();
//        }

//        function _uploadSuccess() {
//            $closetService.getFilesByUserId(vm.getFilesByUserId, vm.error);
//            vm.resetForm();
//        }
//    }
//})();


//(function () {
//    "use strict";

//    angular.module(APPNAME)
//    .controller("outfitsController", OutfitsController);

//    OutfitsController.$inject = ['$scope', '$baseController', '$closetService', '$uibModal'];

//    function OutfitsController(
//        $scope
//        , $baseController
//        , $closetService
//        , $uibModal) {

//        var vm = this;
//        $baseController.merge(vm, $baseController);
//        vm.$scope = $scope;
//        vm.$closetService = $closetService;
//        vm.$uibModal = $uibModal;

//        vm.imageForm = null;
//        vm.imageResults = null;
//        vm.imgTags = [];
//        vm.items = null;
//        vm.newImage = {};
//        vm.pins = null;
//        vm.tags = [];
//        vm.taggedImages = [];
//        vm.tagsSearchedCount = null;
//        vm.titleImage = null;
//        vm.titleImageClass = null;

//        vm.concatTags = _concatTags;

//        vm.getAllTags = _getAllTags;
//        vm.getAllTagsError = _getAllTagsError;
//        vm.getFilesByUserId = _getFilesByUserId;
//        vm.loadError = _loadError;
//        vm.getImageBySearch = _getImageBySearch;
//        vm.openModal = _openModal;
//        vm.resetForm = _resetForm;
//        vm.searchSuccess = _searchSuccess;
//        vm.addFile = _addFile;
//        vm.addFileError = _addFileError;
//        vm.uploadSuccess = _uploadSuccess;

//        $closetService.getFilesByUserId(vm.getFilesByUserId, vm.error);
//        $closetService.getAllTags(vm.getAllTags, vm.error);


//        function _addFile() {
//            var singleFile = document.getElementById("file").files[0];

//            if (singleFile == null) {
//                vm.openModal("error_closet_forgotFile.png");
//            }
//            else {
//                vm.concatTags();

//                var fullImageData = {
//                    Tags: vm.imgTags
//                };

//                var file = new FormData();

//                file.append("file", singleFile);

//                file.append("fileData", angular.toJson(vm.imgTags));

//                $closetService.addFile(file, "outfits", vm.uploadSuccess, vm.addFileError);
//            }
//        }

//        function _addFileError(response) {
//            vm.openModal("error_generic_tryAgain.png");
//        }

//        function _concatTags() {
//            var concatTags = [];
//            var tagsArr = [];

//            if (vm.newImage && vm.newImage.tags) {
//                concatTags = Object.values(vm.newImage.tags).concat();

//                for (var i = 0; i < concatTags.length; i++) {
//                    tagsArr = tagsArr.concat(concatTags[i]);
//                }

//                for (var j = 0; j < tagsArr.length; j++) {
//                    vm.imgTags[j] = { TagId: parseInt(tagsArr[j]) };
//                }
//            }
//        }

//        function _getAllTags(data) {
//            vm.tags = JSON.parse(data.data);
//        }

//        function _getAllTagsError(response) {
//            vm.openModal("error_generic_refresh.png");
//        }

//        function _getFilesByUserId(data) {
//            vm.imageResults = JSON.parse(data.data);
//        }

//        function _getImageBySearch() {
//            if (vm.newImage && vm.newImage.tags) {
//                vm.concatTags();

//                var fileTags = {
//                    "tags": vm.imgTags
//                };

//                var query = angular.toJson({ tags: vm.imgTags });

//                $closetService.search(query, vm.searchSuccess, vm.loadError);
//            }

//            else {
//                return vm.openModal("error_tags.png");
//            }
//        }

//        function _loadError() {
//            vm.openModal("error_closet_images_search.png");
//        }

//        function _openModal(message) {
//            var modalInstance = vm.$uibModal.open({
//                animation: true,
//                templateUrl: 'modalContent.html',
//                controller: 'modalController as mc',
//                windowClass: vm.modalClass,
//                size: 'open',
//                resolve: {
//                    modalItem: function () {
//                        return message;
//                    }
//                }
//            });
//        }

//        function _resetForm() {
//            vm.imageForm.$setPristine();
//            vm.imageForm.$setUntouched();

//            vm.newImage = null;
//            vm.imgTags = [];
//        }

//        function _searchSuccess(data) {
//            vm.imageResults = JSON.parse(data.data);
//            vm.resetForm();
//        }

//        function _uploadSuccess() {
//            $closetService.getFilesByUserId(vm.getFilesByUserId, vm.error);
//            vm.resetForm();
//        }
//    }
//})();


//(function () {
//    "use strict";

//    angular.module(APPNAME)
//    .controller('modalController', ModalController);

//    ModalController.$inject = ['$scope', '$baseController', '$uibModalInstance', 'modalItem', '$fileReaderService', '$cropService']

//    function ModalController(
//        $scope
//        , $baseController
//        , $uibModalInstance
//        , modalItem
//        , $fileReaderService
//        , $cropService
//        ) {

//        var vm = this;

//        $baseController.merge(vm, $baseController);

//        vm.$scope = $scope;
//        vm.$uibModalInstance = $uibModalInstance;
//        vm.$fileReaderService = $fileReaderService;
//        vm.$cropService = $cropService;
//        vm.modalMsg = modalItem;

//        vm.cancel = _cancel;
//        vm.readFile = _readFile;
//        vm.resetCanvas = _resetCanvas;
//        vm.saveCroppedImage = _saveCroppedImage;

//        vm.fileName = null;
//        vm.croppedImage = null;


//        function _readFile() {
//            //$scope.progress = 0;
//            var file = document.getElementById("tempFile").files[0];

//            //if (vm.canvasImg.width > (screen.width * .8)) {
//            //    vm.canvasImg.width = screen.width * .8;
//            //    $(vm.canvasImg.src).width(vm.canvasImg.width);
//            //}



//            vm.fileName = file.name;

//            vm.$fileReaderService.readAsDataURL(file)
//                .then(function (result) {
//                    vm.$cropService.initCropModal(result);
//                });
//        };

//        //vm.$scope.$on("fileProgress", function (e, progress) {
//        //    $scope.progress = progress.loaded / progress.total;
//        //});

//        function _resetCanvas() {
//            //vm.croppedImage = null;
//            $('#cropResult').hide();
//            $('#cropCanvas').show();
//        }


//        function _cancel() {
//            vm.$uibModalInstance.close();
//        };

//        function _saveCroppedImage() {
//            vm.croppedImage = $('#cropResult').attr('src');
//            $('#cropResultHidden').val($('#cropResult').attr('src'));
//            $('#fileNameHidden').val(vm.fileName);

//            vm.$uibModalInstance.close();
//            return vm.croppedImage;
//        }
//    }
//})();