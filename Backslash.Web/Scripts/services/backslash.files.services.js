//if (!backslash.files) {
//    backslash.files = { services: { files: {} } };
//}

//backslash.files.services.files.post = function (file, onSuccess, onError) {

//    var url = "/api/files"
//    var settings = {
//        cache: false
//        , contentType: undefined
//        , data: file
//        , dataType: "json"
//        , success: onSuccess
//        , error: onError
//        , type: "POST"
//        , processData: false
//    };
//    $.ajax(url, settings);
//};

///*

//    contentType needs to be false, this forces jQuery not to add a content-type
//    header for you. otherwise the boundary string will be missing from it.

//    processData needs to be false, otherwise jQuery will try convering fileData into a string

//    */

//backslash.files.services.files.update = function (fileId, fileData, onSuccess, onError) {

//    var url = "/api/files/" + fileId;
//    var settings = {
//        cache: false
//       , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
//       , data: fileData
//       , dataType: "json"
//       , success: onSuccess
//       , error: onError
//       , type: "PUT"
//    }
//    $.ajax(url, settings);
//}

//backslash.files.services.files.get = function (onSuccess, onError) {

//    var url = "/api/files";
//    var settings = {
//        cache: false
//       , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
//       , dataType: "json"
//       , success: onSuccess
//       , error: onError
//       , type: "GET"
//    }
//    $.ajax(url, settings);
//}

//backslash.files.services.files.getById = function (fileServiceData, onSuccess, onError) {

//    var url = "/api/files/" + fileServiceData;
//    var settings = {
//        cache: false
//        , contentType: "application/x-wwwa-form-urlencoded; charset=UTF-8"
//        , dataType: "json"
//        , success: onSuccess
//        , error: onError
//        , type: "GET"
//    };
//    $.ajax(url, settings);
//}

//backslash.files.services.files.deleteById = function (deleteFileId, onSuccess, onError) {
//    var url = "/api/files/" + deleteFileId;
//    var settings = {
//        cache: false
//       , contentType: false
//       , dataType: "json"
//       , success: onSuccess
//       , error: onError
//       , type: "DELETE"
//    };
//    $.ajax(url, settings);
//}