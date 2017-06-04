(function () {
    "use strict";

    angular.module(APPNAME)
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

            $routeProvider.when('/', {
                templateUrl: '/Scripts/backslash/closet/Closet.html',
                controller: 'closetController',
                controllerAs: 'cc'
            }).when('/outfits', {
                templateUrl: '/Scripts/backslash/outfits/Outfits.html',
                controller: 'outfitsController',
                controllerAs: 'oc'
            });

            $locationProvider.html5Mode(false);
        }]);
})();