 function triggerDone() {
    console.log('triggerDone: ',wordCount);
    var wordCountBox = $('#wordCountBox');
    var timepassed = $('#timepassed');
    // return;
    // if (savedValue){
    //     clearTimeout(savedValue);
    // }
    wordCountBox.text(wordCount);
    var timeEnd = $.now();
    var timeRes = timeEnd - timeStart;
    timeRes = parseInt(timeRes);
    timeRes = timeRes / 1000;
    timepassed.text(timeRes);
    // alreadyRead = alreadyRead.join("");
    // textRead.text(alreadyRead);
    // var summary = $('#summary');
    // summary.show();
    // return;
};

function startSim() {

    var speed = $('#speed').val();
    // var speed = 120;
    var delay = 1/((speed/60)/1000);
    timeStart = $.now();
    // console.log('speed: ',speed);
    // console.log('delay: ',delay);

    var boldWords = speed / 60;
    boldWords = boldWords < 1 ? 1 : Math.round(boldWords);
    timeStart = $.now();
    var sim = $('#sim').text();
    var value;
    var wordArray = sim.split(/[\s]+/);
    // wordArray=value;
    var simWrap = $('#sim');
    

    var arrCount = wordArray.length;
    // console.log('arrCount: ',arrCount);
    var alreadyRead = new Array();
    wordCount = 0;

    var t = (function fn(n){   
        // console.log('wordArray: ',wordArray[n]);
        var pos = n;
        if (pos < 0) {
            pos = 0;
        }
        // console.log('alreadyRead: ',alreadyRead);
        // console.log('wordArray: ', wordArray[pos]);
        alreadyRead.push(wordArray[pos]);
        wordArray[pos] = '<span class="grayx">' + wordArray[pos] + '</span>';
        if (pos > (boldWords - 1)) {
            wordArray[pos - boldWords] = wordArray[pos - boldWords].replace("x", "dim");
        }
        var words = wordArray.join(" ");
        simWrap.html(words);

        ++wordCount;
        console.log('wordCount: ',wordCount);
        if (pos == (arrCount - 1)) {
            triggerDone();
        }
        // $('#sim span:last')[0].scrollIntoView(false);
        // console.log('savedValue: ',savedValue);
        if(n<(arrCount-1))
            timeoutID = setTimeout(function(){
              fn(++n);
            },(delay));
    }(0));
    // console.log('t: ',t);

};

function counter() {
    // console.log('running counter: ',$(this).html());
    // value = $(this).html().replace(/<br>+/g, ' ').replace(/(<([^>]+)>)/ig, '');
    // console.log('value: ',value);
    // value = $(this).html().replace(/<(?\s*\/?)[^>]+>/g, '');
    var value = $.trim($(this).text()); // Trim spaces
    // var value = $(this).text().replace(/\s+/g, ' ');
    if (value.length === 0) {
        $('#wordCount').text(0);
        return;
    }
    wordCount = value.replace(/\s+/g, ' ').split(' ').length;
    $('#wordCount').text(wordCount);
};

function clearSim(){
    var sim = $('#sim');
    // console.log('clearSim: ',sim);
    // sim.text()='';
    sim.empty();
};
var timeoutID;
(function(){
    
    $('.demo2').colorpicker({
        // inline: true
    });
    
    var start = $('#start-btn');
    var clear = $('#clear-btn');
    var wordCount = 0;
    var wordCountBox = $('#wordCountBox');
    var textbox = $('#sim');
    // $('#sim').each(function () {
    //     this.contentEditable = true;
    // });
    textbox.on('change keydown keypress keyup blur focus', counter);

    start.on("click", function (e) {
        // e.preventDefault();
        startSim();
    });
    clear.on("click", function(e){
        // e.preventDefault
        e.stopPropagation();
        // console.log('timeoutID: ',timeoutID);
        window.clearTimeout(timeoutID);
        clearSim();
    });

})(jQuery);

    // $('#night-mode').on('change', function() {
    //     if($(this).is(':checked')) {
    //         $('body').addClass('night');
    //         prefs.night = true;
    //     } else {
    //         $('body').removeClass('night');
    //         prefs.night = false;
    //     }
    //     savePrefs();
    // });   