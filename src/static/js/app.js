var timeoutID;
var keepGoing = true;
var boldWords;
var sim;
var start = $('#start-btn');
var app = app || {};
var pauseContinue = true;
var startClickCounter=0;
var numWords;
var speed;

function triggerDone() {
    console.log('triggerDone: ',wordCount);
    start.text('Start');
    startClickCounter=0;
    removeSimHighlights();
    timeoutID=0;
    pauseContinue=true;
    keepGoing=true;
    window.clearTimeout(timeoutID);
    var wordCountBox = $('#wordCountBox');
    var timepassed = $('#timepassed');
    wordCountBox.text(wordCount);
    var timeEnd = $.now();
    var timeRes = timeEnd - timeStart;
    timeRes = parseInt(timeRes);
    timeRes = timeRes / 1000;
    timepassed.text(timeRes);
};

function setSim() {
    console.log('setSim');
    nn=0;
    speed = $('#speed').val();
    delay = 1/((speed/60)/1000);
    timeStart = $.now();

    // boldWords = speed / 60;
    // boldWords = boldWords < 1 ? 1 : Math.round(boldWords);
    // console.log('bolding: ',boldWords);
    if (!boldWords){
        console.log('if clause');
        boldWords = 1;
    }
    timeStart = $.now();
    sim = $('#sim').text();
    var value;
    wordArray = sim.split(/[\s]+/);
    simWrap = $('#sim');
    

    arrCount = wordArray.length;
    alreadyRead = new Array();
    wordCount = 0;
};

function setSimSpeed(){
    delay = 1/((speed/60)/1000);
    // boldWords = speed / 60;
    // boldWords = boldWords < 1 ? 1 : Math.round(boldWords);
};

function setSimNumWordsHighlight(num){
    boldWords = num;
};

function startSim(){
    console.log('startSim');
    (function fn(n){  
        // console.log('in function fn, n: ',n);
        // console.log('keepGoing: ',keepGoing); 
        if(keepGoing){
            nn=n;
            var pos = n;
            if (pos < 0) {
                pos = 0;
            }
            alreadyRead.push(wordArray[pos]);

            wordArray[pos] = '<span class="grayx">' + wordArray[pos] + '</span>';
            // console.log('pos: ',pos);
            // console.log('boldWords: ',boldWords);
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
            
            if(n<(arrCount-1))
                timeoutID = setTimeout(function(){
                  fn(++n);
                },(delay));
       }
    }(nn));
};
function counter() {
    var value = $.trim($(this).text()); // Trim spaces
    if (value.length === 0) {
        $('#wordCount').text(0);
        return;
    }
    wordCount = value.replace(/\s+/g, ' ').split(' ').length;
    $('#wordCount').text(wordCount);
};

function clearSim(){
    var sim = $('#sim');
    sim.empty();
};

function removeSimHighlights(){
    sim = $('#sim');
    // sim.text("balakjaj");
    // sim = $('#sim').text();
    sim.text(function(){
        return $(this).text().replace(/(<([^>]+)>)/ig, '');
    });
        
    // console.log('removing: ',sim);
}
// function pauseSim(){
//     console.log('pauseSim');
// };



(function(){
    'use strict';
    new app.NoteView();
    
    var highlightColorPicker = $('#highlight-picker').colorpicker();
    var wordColorPicker = $('#word-color-picker').colorpicker();

    wordColorPicker.colorpicker('setValue','black');
    highlightColorPicker.colorpicker('setValue','black');
    
    
    var clear = $('#clear-btn');
    var reset = $('#reset-btn');
    var incfont = $('#incfont-btn');
    var decfont = $('#decfont-btn');
    
    var getSpeed = $('#speed');
    var getNumWordsHighlight = $('#numWords');

    var fontdec = $('select[name=font-decision]');
    var wordCount = 0;
    var wordCountBox = $('#wordCountBox');
    var textbox = $('#sim');




    // app.textbox = $('#sim');

    textbox.on('change keydown keypress keyup blur focus', counter);

    textbox.highlighter({
        'complete': function (data) {
            console.log('data: ',data);
            this.note = data;
            app.note = data;
            return app.note;
        }
    });

    // textbox.bind("mouseup", function(){
    //     console.log('highlighted text');
    // });

    getSpeed.on("change", function(e){
        // console.log('speed change');
        e.stopPropagation();
        speed = getSpeed.val();
        setSimSpeed();
    });

    getNumWordsHighlight.on("change", function(e){
        e.stopPropagation();
        numWords = getNumWordsHighlight.val();
        console.log('numWords: ',numWords);
        setSimNumWordsHighlight(numWords);
    });


    start.on("click", function (e) {
        e.stopPropagation();
        removeSimHighlights();
        if (startClickCounter==0){
            console.log('clicked here');
            window.clearTimeout(timeoutID);
            setSim();
            startSim();
            start.text("Pause");
            startClickCounter++;
        }
        else{
             if (pauseContinue){
                // removeSimHighlights();
                nn=nn-1;
                keepGoing=false;
                start.text("Resume");
                pauseContinue = false;
            }
            else{
                // console.log('keep going, nn: ',nn);
                // removeSimHighlights();
                keepGoing=true;
                startSim();
                start.text("Pause");
                pauseContinue = true;
            }
        }

    });
    reset.on("click", function(e){

        e.stopPropagation();
        window.clearTimeout(timeoutID);
        timeoutID=0;
        startClickCounter=0;
        pauseContinue=true;
        keepGoing=true;
        start.text("Start");
        removeSimHighlights();
    });
    clear.on("click", function(e){
        e.stopPropagation();
        window.clearTimeout(timeoutID);
        timeoutID=0;
        startClickCounter=0;
        pauseContinue=true;
        keepGoing=true;
        start.text("Start");
        clearSim();
    });
    incfont.on("click", function(e){
        var curSize= parseInt($('#sim').css('font-size')) + 2;

        if(curSize<=84)
          $('#sim').css('font-size', curSize);
    });
    decfont.on("click", function(e){
        var curSize= parseInt($('#sim').css('font-size')) - 2;
        if(curSize>=10)
              $('#sim').css('font-size', curSize);
    });
    fontdec.on("change", function(e){
        var fontTest = document.getElementById("sim");
        fontTest.style.fontFamily=this.value;
    });
    highlightColorPicker.on("changeColor.colorpicker", function(e){
        var col = e.color.toRGB();
        $('#text-row #sim .grayx').css({'color':'rgb('+col.r+','+col.g+','+col.b+')'});
        $('#text-row #sim .grayx').css({'text-shadow':'0 0 2px rgb('+col.r+','+col.g+','+col.b+')'});

        var styleElement = document.createElement("style");
        styleElement.type = "text/css";
        document.head.insertBefore(styleElement, null);
        var styleSheet = styleElement.sheet;
        var ruleNum = styleSheet.cssRules.length;
        styleSheet.insertRule(".grayx{color:rgb("+col.r+","+col.g+","+col.b+")",
            ruleNum);
    });
    wordColorPicker.on("changeColor.colorpicker", function(e){
        var col = e.color.toRGB();
        $('#text-row #sim').css({'color':'rgb('+col.r+','+col.g+','+col.b+')'});
        $('#text-row #sim .graydim').css({'color':'rgb('+col.r+','+col.g+','+col.b+')'});
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