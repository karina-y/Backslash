(function () {
    "use strict";

    angular.module(APPNAME)
    .controller("profileController", ProfileController);


    ProfileController.$inject = ['$scope', '$baseController'];

    function ProfileController(
        $scope
        , $baseController) {

        var vm = this;
        $baseController.merge(vm, $baseController);
        vm.$scope = $scope;

        vm.audreyVisibility = false;
        vm.chanelVisibility = false;

        vm.tabs = [
            { link: '#/', label: 'Closet' },
            { link: '#/outfits', label: 'Outfits' }
        ];

        vm.selectedTab = vm.tabs[0];
        vm.tabClass = _tabClass;
        vm.setSelectedTab = _setSelectedTab;

        function _tabClass(tab) {
            if (vm.selectedTab.label == "Outfits") {
                vm.audreyVisibility = false;
                vm.chanelVisibility = true;
            }

            else if (vm.selectedTab.label == "Closet") {
                vm.audreyVisibility = true;
                vm.chanelVisibility = false;
            }


            if (vm.selectedTab == tab) {
                return "active";
            }

            else {
                return "";
            }
        }

        function _setSelectedTab(tab) {
            vm.selectedTab = tab;
        }
    }
})();