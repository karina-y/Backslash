(function () {
    "use strict";

    angular.module(APPNAME)
    .controller("inspController", InspController);

    InspController.$inject = ['$scope', '$baseController', '$closetService', '$inspService', '$uibModal'];

    function InspController(
    $scope
    , $baseController
    , $closetService
    , $inspService
    , $uibModal) {

        var vm = this;
        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
        vm.$closetService = $closetService;
        vm.$inspService = $inspService;
        vm.$uibModal = $uibModal;

        vm.items = null;
        vm.newSearch = {};
        vm.pins = null;
        vm.searchForm = null;
        vm.searchResults = null;
        vm.tags = [];

        vm.tagsError = _tagsError;
        vm.getAllTags = _getAllTags;
        vm.openModal = _openModal;
        vm.receiveItems = _receiveItems;
        vm.resetForm = _resetForm;
        vm.searchPins = _searchPins;

        $closetService.getAllTags(vm.getAllTags, vm.errorRefresh);

        function _errorRefresuh() {
            vm.openModal("error_generic_refresh.png");
        }

        function _getAllTags(data) {
            vm.tags = JSON.parse(data.data);
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

        function _receiveItems(data) {
            vm.$scope.$apply(function () {
                vm.searchResults = data.data;

                if (vm.searchResults.length > 0) {
                    vm.resetForm();
                }

                else {
                    vm.resetForm();
                    vm.openModal("error_inspiration_noResults.png");
                }
            })
        }

        function _resetForm() {
            vm.searchForm.$setPristine();
            vm.searchForm.$setUntouched();
            vm.newSearch = null;
        }

        function _searchPins() {
            if (vm.searchForm && vm.searchForm.$$success.parse) {
                var concatSearch = "";
                $.each(vm.newSearch, function (key, value) {
                    concatSearch += " " + value;
                });
                $inspService.get(concatSearch, vm.receiveItems, vm.tagsError);
            }

            else {
                vm.openModal("error_tags.png");
            }
        }

        function _tagsError() {
            vm.openModal("error_tags.png");
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