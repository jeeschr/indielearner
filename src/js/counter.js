var counter = function () {
    var value = $.trim($(this).text()); // Trim spaces

    if (value.length === 0) {
        $('#wordCount').text(0);
        return;
    }

    var wordCount = value.replace(/\s+/g, ' ').split(' ').length;
    $('#wordCount').text(wordCount);
};

$(document).ready(function () {
    $('#sim').on('change keydown keypress keyup blur focus', counter);
});