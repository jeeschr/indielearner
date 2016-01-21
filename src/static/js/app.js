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

function setSim() {
    nn=0;
    var speed = $('#speed').val();
    // var speed = 120;
    delay = 1/((speed/60)/1000);
    timeStart = $.now();
    // console.log('speed: ',speed);
    // console.log('delay: ',delay);

    boldWords = speed / 60;
    boldWords = boldWords < 1 ? 1 : Math.round(boldWords);
    timeStart = $.now();
    var sim = $('#sim').text();
    var value;
    wordArray = sim.split(/[\s]+/);
    // wordArray=value;
    simWrap = $('#sim');
    

    arrCount = wordArray.length;
    // console.log('arrCount: ',arrCount);
    alreadyRead = new Array();
    wordCount = 0;


    // console.log('t: ',t);
 
};
function startSim(){
    (function fn(n){  
        console.log('n: ',n); 
        if(keepGoing){
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
        // console.log('scroll: ',$('#sim span:last'));
        // $('#sim').scrollLeft($('#sim span:last')[0]);
        // $('#sim').scrollLeft($('#sim span:last').position().left);
        // console.log('savedValue: ',savedValue);
        nn=n;
        if(n<(arrCount-1))
            timeoutID = setTimeout(function(){
              fn(++n);
            },(delay));
       }
    }(nn));
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

function pauseSim(){
    console.log('pauseSim');
};

var timeoutID;
var keepGoing = true;

(function(){
    
    $('.demo2').colorpicker({
        // inline: true
    });
    
    var start = $('#start-btn');
    var clear = $('#clear-btn');
    var pause = $('#pause-btn');
    var reset = $('#reset-btn');
    var incfont = $('#incfont-btn');
    var decfont = $('#decfont-btn');
    var fontdec = $('select[name=font-decision]');
    var wordCount = 0;
    var wordCountBox = $('#wordCountBox');
    var textbox = $('#sim');
    // $('#sim').each(function () {
    //     this.contentEditable = true;
    // });
    textbox.on('change keydown keypress keyup blur focus', counter);

    start.on("click", function (e) {
        e.stopPropagation();
        window.clearTimeout(timeoutID);
        setSim();
        startSim();
    });
    var pauseContinue = true;
    pause.on("click", function(e){
        if (timeoutID){
            e.stopPropagation();
            if (pauseContinue){
                // window.clearTimeout(timeoutID);
                keepGoing=false;
                pause.text("Resume");
                pauseContinue = false;
            }
            else{
                console.log('keep going, nn: ',nn);
                keepGoing=true;
                startSim();
                pause.text("Pause");
                // window.setTimeout
                pauseContinue = true;
            }
        }
            // pauseSim();
    });
    reset.on("click", function(e){
        e.stopPropagation();
        window.clearTimeout(timeoutID);
    });
    clear.on("click", function(e){
        // e.preventDefault
        e.stopPropagation();
        // console.log('timeoutID: ',timeoutID);
        window.clearTimeout(timeoutID);
        timeoutID=0;
        clearSim();
    });
    incfont.on("click", function(e){
        // console.log('clicked incfont');
        curSize= parseInt($('#sim').css('font-size')) + 2;

        if(curSize<=84)
          $('#sim').css('font-size', curSize);
    });
    decfont.on("click", function(e){
        curSize= parseInt($('#sim').css('font-size')) - 2;
        if(curSize>=10)
              $('#sim').css('font-size', curSize);
    });
    fontdec.on("change", function(e){
        console.log('change font: ',this.value);
        // var whichSelected = e.selectedIndex;
        // var selectState = e.options[whichSelected].text;
        var fontTest = document.getElementById("sim");
        // fontTest.style.fontFamily = selectState;
        fontTest.style.fontFamily=this.value;
    });

})(jQuery);

// function ChangeFont (selectTag) {
//     // Returns the index of the selected option
//     var whichSelected = selectTag.selectedIndex;

//     // Returns the selected options values
//     var selectState = selectTag.options[whichSelected].text;

//     var fontTest = document.getElementById ("sim");
//     fontTest.style.fontFamily = selectState;
// }

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