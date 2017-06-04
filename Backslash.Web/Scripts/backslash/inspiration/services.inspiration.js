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


(function () {
    "use strict";

    angular.module(APPNAME)
     .factory('$inspService', InspirationServiceFactory);

    InspirationServiceFactory.$inject = ['$baseService'];

    function InspirationServiceFactory($baseService) {
        var aInspServiceObject = backslash.insp.services;
        var newService = $baseService.merge(true, {}, aInspServiceObject, $baseService);
        return newService;
    }
})();