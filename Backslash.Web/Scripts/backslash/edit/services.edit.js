(function () {
    "use strict";

    angular.module(APPNAME)
     .factory('$closetService', ClosetServiceFactory);

    ClosetServiceFactory.$inject = ['$baseService'];

    function ClosetServiceFactory($baseService) {
        var aClosetServiceObject = backslash.closet.services;
        var newService = $baseService.merge(true, {}, aClosetServiceObject, $baseService);
        return newService;
    }
})();