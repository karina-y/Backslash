if (!backslash.closet) {
    backslash.closet = { services: {} };
}

backslash.closet.services.getFilesByUserId = function (directory, onSuccess, onError) {
    return this.$http.get('/Angular/GetFilesByUserId/' + directory)
                     .then(onSuccess)
                     .catch(onError);
}

backslash.closet.services.search = function (directory, tags, onSuccess, onError) {
    return this.$http.post('/Angular/GetFileByTags/', tags)
                     .then(onSuccess)
                     .catch(onError);
}

backslash.closet.services.addFile = function (fileData, directory, onSuccess, onError) {
    var url = "/api/files/AddFile/" + directory
    var settings = {
        cache: false
        , contentType: false
        , data: fileData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
        , processData: false
    }
    $.ajax(url, settings);
}

backslash.closet.services.updateFile = function (fileData, directory, onSuccess, onError) {
    return this.$http.post('/Angular/UpdateFile/' + directory + '/', fileData)
                     .then(onSuccess)
                     .catch(onError);
}

backslash.closet.services.deleteImage = function (fileId, onSuccess, onError) {
    return this.$http.delete('/Angular/DeleteFileById/' + fileId)
                     .then(onSuccess)
                     .catch(onError);
}

backslash.closet.services.getAllTags = function (onSuccess, onError) {
    return this.$http.get('/Angular/GetAllTags')
                     .then(onSuccess)
                     .catch(onError);
}

backslash.closet.services.getSelectedTags = function (fileId, onSuccess, onError) {
    return this.$http.get('/Angular/GetSelectedTags/' + fileId)
                     .then(onSuccess)
                     .catch(onError);
}