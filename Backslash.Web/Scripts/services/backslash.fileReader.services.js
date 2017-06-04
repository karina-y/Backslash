if (!backslash.fileReader) {
    backslash.fileReader = { services: {} };
}


backslash.fileReader.services.onLoad = function (reader, deferred, baseService) {
    return function () {

        baseService.$timeout(function () {
            deferred.resolve(reader.result);
        });


        //scope.$apply(function () {
        //    deferred.resolve(reader.result);
        //});
    };
};


backslash.fileReader.services.onError = function (reader, deferred, baseService) {
    return function () {

        baseService.$timeout(function () {
            deferred.reject(reader.result);
        });

        //scope.$apply(function () {
        //    deferred.reject(reader.result);
        //});
    };
};



//backslash.fileReader.services.onProgress = function (reader, scope) {
//    return function (event) {
//        scope.$broadcast("fileProgress",
//            {
//                total: event.total,
//                loaded: event.loaded
//            });
//    };
//};


backslash.fileReader.services.getReader = function (deferred, baseService) {
    var reader = new FileReader();
    reader.onload = backslash.fileReader.services.onLoad(reader, deferred, baseService);
    reader.onerror = backslash.fileReader.services.onError(reader, deferred, baseService);
    //reader.onprogress = backslash.fileReader.services.onProgress(reader);

    return reader;
};


backslash.fileReader.services.readAsDataURL = function (file) {
    var baseService = this;
    var deferred = baseService.$q.defer();
    var reader = backslash.fileReader.services.getReader(deferred, baseService);
    reader.readAsDataURL(file);

    return deferred.promise;
};


backslash.fileReader.services.fileReader = function () {
    return {
        readAsDataUrl: readAsDataURL
    };
}