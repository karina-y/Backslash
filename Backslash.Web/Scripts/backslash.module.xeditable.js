(function ($backslash) {


    $backslash.moduleOptions.extraModuleDependencies.push("xeditable");

    $backslash.moduleOptions.runners.push(exditableOptionRunner);

    function exditableOptionRunner(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    }


}(backslash))