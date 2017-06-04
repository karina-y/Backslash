var backslash = {
    utilities: {}
    , layout: {}
    , page: {
        handlers: {
        }
        , startUp: null
    }
    , services: {}
    , ui: {}

};

backslash.moduleOptions = {
    APPNAME: "BackslashApp"
        , extraModuleDependencies: []
        , runners: []
        , page: backslash.page//we need this object here for later use
}


backslash.layout.startUp = function () {

    console.debug("backslash.layout.startUp");

    //this does a null check on backslash.page.startUp
    if (backslash.page.startUp) {
        console.debug("backslash.page.startUp");
        backslash.page.startUp();
    }
};

backslash.APPNAME = "BackslashApp";//legacy

$(document).ready(backslash.layout.startUp);