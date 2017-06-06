(function () {
    "use strict";

    angular.module(APPNAME)
    .factory('$baseService', baseServiceFactory);

    baseServiceFactory.$inject = ['$window', '$location', '$http', '$q', '$timeout'];

    function baseServiceFactory($window, $location, $http, $q, $timeout) {
        /*
            when this function is invoked by Angular, Angular wants an instance of the Service object.         
        */
        var bsf = this;
        bsf.$http = $http;
        bsf.$q = $q;
        bsf.$timeout = $timeout;

        function getChangeNotifier($scopeFromController) {
            /*
            will be called when there is an event outside Angular that has modified
            our data and we need to let Angular know about it.
            */

            function NotifyConstructor($s) {
                var self = this;

                self.scope = $s;

                return function (fx) {
                    self.scope.$apply(fx); //this is the magic right here that cause ng to re-evaluate bindings
                }
            }

            return new NotifyConstructor($scopeFromController);
        }

        var baseService = {
            $window: $window
            , getNotifier: getChangeNotifier
            , $location: $location
            , merge: $.extend
            , $http: bsf.$http
            , $q: bsf.$q
            , $timeout: bsf.$timeout
        };

        return baseService;
    }
})();