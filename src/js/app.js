    $('#night-mode').on('change', function() {
        if($(this).is(':checked')) {
            $('body').addClass('night');
            prefs.night = true;
        } else {
            $('body').removeClass('night');
            prefs.night = false;
        }
        savePrefs();
    });   