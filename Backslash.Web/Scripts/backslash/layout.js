$(document).ready(function () {
    $('.dropdown').hover(function () {
        $('.dropdown-content', this).stop(true, true).slideDown('normal');
        $(this).addClass('open');
    }, function () {
        $('.dropdown-content', this).stop(true, true).slideUp('normal');
        $(this).removeClass('open');
    });
});