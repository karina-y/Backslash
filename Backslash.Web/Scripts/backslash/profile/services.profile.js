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
     .factory('$fileReaderService', FileReaderServiceFactory);

    FileReaderServiceFactory.$inject = ['$baseService'];

    function FileReaderServiceFactory($baseService) {
        var aFileReaderServiceFactory = backslash.fileReader.services;
        var newService = $baseService.merge(true, {}, aFileReaderServiceFactory, $baseService);
        return newService;
    }
})();


(function () {
    "use strict";

    angular.module(APPNAME)
     .factory('$cropService', CropServiceFactory);

    CropServiceFactory.$inject = ['$baseService'];

    function CropServiceFactory($baseService) {
        var aCropServiceFactory = backslash.crop.services;
        var newService = $baseService.merge(true, {}, aCropServiceFactory, $baseService);
        return newService;
    }
})();

(function () {
    "use strict";

    angular.module(APPNAME)
     .factory('$outfitBuilderService', OutfitBuilderServiceFactory);

    OutfitBuilderServiceFactory.$inject = ['$baseService'];

    function OutfitBuilderServiceFactory($baseService) {
        var aOutfitBuilderServiceFactory = backslash.outfitBuilder.services;
        var newService = $baseService.merge(true, {}, aOutfitBuilderServiceFactory, $baseService);
        return newService;
    }
})();