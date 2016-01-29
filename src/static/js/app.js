var app = app || {};

var timeoutID;

// detect pause
var keepGoing = true;
var pauseButton = false;






var scrollWidth = 0;
var textCounter = 0;

var alreadyRead = [];

// var speed = 0;

// var numWordsHighlight = 1;

var wordArray= [];

var arrCount = 0;
var wordCount = 0;
var result;
var textbox = $('#sim');
var startClickCounter = 0;
var boldWords = 1;
var delay = 1;
var highlightColorPicker;
var wordColorPicker;
var getNumWordsHighlight = $('#numWords');
var getSpeed = $('#speed');

function triggerDone() {
    console.log('triggerDone: ',wordCount);
    var start = $('#start-btn');
    start.text('Start');
    startClickCounter = 0;
    // removeSimHighlights();
    window.clearTimeout(timeoutID);
    timeoutID = 0;
    // pauseContinue = true;
    keepGoing = true;
    textCounter=0;
    
    var wordCountBox = $('#wordCountBox');
    var timepassed = $('#timepassed');
    wordCountBox.text(wordCount);
    var timeEnd = $.now();
    var timeRes = timeEnd - timeStart;
    timeRes = parseInt(timeRes);
    timeRes = timeRes / 1000;
    timepassed.text(timeRes);
}

function setSim() {
    // console.log('setSim');
    // textCounter=0;
    // speed = $('#speed').val();
    // delay = 1/((speed/60)/1000);
    // timeStart = $.now();

    // // boldWords = speed / 60;
    // // boldWords = boldWords < 1 ? 1 : Math.round(boldWords);
    // // console.log('bolding: ',boldWords);
    // if (!boldWords){
    //     // console.log('if clause');
    //     boldWords = 1;
    // }
    // timeStart = $.now();
    // sim = $('#sim').text();
    // var value;
    // wordArray = sim.split(/[\s]+/);
    // // simWrap = $('#sim');


    // var words = $('#sim').html();
    // var result = htmlToText.fromString(words);
    // // console.log('count result: ',result);
    // wordArray = result.trim().replace(/\s+/g, ' ').split(' ');
    

    // arrCount = wordArray.length;
    
    // wordCount = 0;
}
function setSimData(){
    var words = textbox.html();
    result = htmlToText.fromString(words);
    // console.log('count result: ',result);
    wordArray = result.trim().replace(/\s+/g, ' ').split(' ');
    arrCount = wordArray.length; 
    timeStart = $.now();
}
function setSimSpeed(){
    var speed = getSpeed.val();
    delay = 1/((speed/60)/1000);
}

function setSimNumWordsHighlight(){
    var oldBoldWords = boldWords;
    boldWords = getNumWordsHighlight.val();
    removeSimHighlights();
    if(boldWords<oldBoldWords){
        // console.log('less than');
        textCounter=textCounter-1;
    }
}

function wordCounter() {

    wordCount = arrCount;

    if (!result)
        $('#wordCount').text(0);
    else
        $('#wordCount').text(wordCount);
}

function startSim(){
    (function fn(n){  
        // check if paused
        if(keepGoing){
            console.log('keepGoing');

            if (n == (arrCount - 1)) {
                triggerDone();
            }

            // update global counter
            textCounter = n;

            // var pos = textCounter;
            // if (pos < 0){
            //     pos = 0;
            // }

            alreadyRead.push(wordArray[textCounter]);

            wordArray[textCounter] = '<span class="grayx">' + wordArray[textCounter] + '</span>';

            if (textCounter > (boldWords - 1)) {
                wordArray[textCounter - boldWords] = wordArray[textCounter - boldWords].replace("grayx", "");
            }

            var words = wordArray.join(" ");
            textbox.html(words);

            // ++wordCount;

            checkScroll();

            if(textCounter<(arrCount-1))
                timeoutID = setTimeout(function(){
                  fn(++n);
                },(delay));

       }
    }(textCounter));
}

function checkScroll(){
    // $('#sim').scrollLeft(0);
    var width = $('#sim')[0].clientWidth;

    // var height = $('#sim')[0].scrollHeight;
    // console.log('width: ', width);
    // console.log('height: ', height);
    var loc = $('#sim span:last');
    // console.log('highlight pos: ',loc.position().left);
    // console.log('win: ',$(window).scrollLeft());
    if(loc.position()!==undefined){
        var pos =  loc.position().left;
        // console.log('highlight position: ',pos);
        // console.log('scrollTop: ',loc.offset().top);
        if(pos<0){
        
            if(scrollWidth>width){
                // console.log('less: ',pos);   
                // $('#sim').scrollLeft(0);
                scrollWidth = 0;
            }
            if(scrollWidth<width){
                $('#sim').scrollLeft(0);
            }
        
        }
        if (pos > width){
            // console.log('more: ',pos);
            // if(pos>scrollWidth)
            scrollWidth+=width;
            $('#sim').scrollLeft(scrollWidth);
        }
            // if (loc.position().top-100 > height)
        
    }
    

}
function resetSimScroll(){
    $('#sim').scrollLeft(0);
}


function clearSim(){
    textbox.empty();
}

function removeSimHighlights(){
    var words = textbox.html();
    var result = htmlToText.fromString(words);
    $('#sim')[0].textContent = result;
    // sim = $('#sim');
    // sim.text("balakjaj");
    // sim = $('#sim').text();
    // sim.text(function(){
        // return $(this).text().replace(/(<([^>]+)>)/ig, '');
    // });
        
    // console.log('removing: ',sim);
}
// function pauseSim(){
//     console.log('pauseSim');
// };
// function cleanText(){
//     console.log('cleanText');
//     var words = $(this).html();
//     var result = htmlToText.fromString(words);
//     console.log('words: ',words);
//     console.log('result: ',result);
//     // $('#sim') = result;
//     console.log('now get: ', $('#sim'));
//     $('#sim')[0].textContent = result;

// }

function setColors(){
    var wordCol = wordColorPicker.colorpicker('getValue');
    var highCol = highlightColorPicker.colorpicker('getValue');

    // console.log('wordCol: ',wordCol);
    // console.log('highCol: ',highCol);

    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    document.head.insertBefore(styleElement, null);
    var styleSheet = styleElement.sheet;
    var ruleNum = styleSheet.cssRules.length;
    
    styleSheet.insertRule("#sim{color:"+wordCol+";}",ruleNum);
    styleSheet.insertRule("#sim .grayx{color:"+highCol+";text-shadow:0 0 1px "+highCol+";}",ruleNum+1);

}
function removeColors(){
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    document.head.insertBefore(styleElement, null);
    var styleSheet = styleElement.sheet;
    var ruleNum = styleSheet.cssRules.length;
    
    styleSheet.insertRule("#sim{color:rgba(0,0,0,0.7);}",ruleNum);
    styleSheet.insertRule("#sim .grayx{color:rgba(200,0,0,1);text-shadow:0 0 10px rgba(0,0,0,1);}",ruleNum+1);
}

(function(){
    'use strict';

    new app.NoteView();
    
    highlightColorPicker = $('#highlight-picker').colorpicker({
        format: 'rgba'
    });

    wordColorPicker = $('#word-color-picker').colorpicker({
        format: 'rgba'
    });

    wordColorPicker.colorpicker('setValue','rgba(240,240,240,0.7)');
    highlightColorPicker.colorpicker('setValue','black');
    
    var start = $('#start-btn');
    var clear = $('#clear-btn');
    var reset = $('#reset-btn');
    var incfont = $('#incfont-btn');
    var decfont = $('#decfont-btn');
    var fontdec = $('select[name=font-decision]');


    // var wordCountBox = $('#wordCountBox');
    
    // app.textbox = $('#sim');

    textbox.text('Four score and seven years ago our fathers brought ' +
        'forth on this continent, a new nation, conceived in Liberty, ' +
        'and dedicated to the proposition that all men are created equal.');

    textbox.on('change keydown keypress keyup blur focus', function(){
        setSimData();
        wordCounter();
    });

    textbox.highlighter({
        'complete': function (data) {
            // console.log('data: ',data);
            // this.note = data;
            app.note = data;
            return app.note;
        }
    });

   

    getSpeed.on("change", function(e){
        e.stopPropagation();
        setSimSpeed();
    });

    getNumWordsHighlight.on("change", function(e){
        e.stopPropagation();
        setSimNumWordsHighlight();
        // var oldNumWords = numWordsHighlight;
        // numWordsHighlight = getNumWordsHighlight.val();
        // console.log('numWords: ',numWordsHighlight);
        
        // removeSimHighlights(textbox);
        // if (numWords<=oldNumWords){
            // con/sole.log('yep');
            // counter=counter-(numWords)+1;
        // }
        // if (oldNumWords<numWords){
            // console.log('in here');
            // counter=counter-(numWords);
        // }
    });

    start.on("click", function (e) {
        // detect if anything in textbox
        // console.log('clicked');
        e.stopPropagation();
        if(wordCount){

            setColors();
            setSimNumWordsHighlight();
            setSimSpeed();

            if(startClickCounter===0){
                textCounter = 0;
                window.clearTimeout(timeoutID);
                // console.log('setSimData');
                setSimData();
                startSim();
                ++startClickCounter;
                start.text("Pause");
                pauseButton=true;
            }
            else{
                if(pauseButton){
                    console.log('paused');
                    keepGoing=false;
                    start.text("Resume");
                    pauseButton=false;
                    removeColors();
                    ++textCounter;
                }
                else{
                    keepGoing=true;
                    start.text("Pause");
                    pauseButton=true;
                    startSim();
                }
            }
        }
    });

    reset.on("click", function(e){

        e.stopPropagation();
        window.clearTimeout(timeoutID);
        timeoutID = 0;

        textCounter = 0;
        startClickCounter = 0;
        pauseButton = false;
        keepGoing = true;

        start.text("Start");
        removeColors();

        removeSimHighlights();
        resetSimScroll();

    });

    clear.on("click", function(e){
        e.stopPropagation();
        window.clearTimeout(timeoutID);
        timeoutID=0;
        startClickCounter=0;
        pauseButton=false;
        keepGoing=true;
        start.text("Start");
        clearSim();
    });

    incfont.on("click", function(e){
        var curSize= parseInt($('#sim').css('font-size')) + 2;

        if(curSize<=84){
            $('#sim').css('font-size', curSize+'px');
            $('#sim').find('h2, h1, h3, h4, span').css('font-size', curSize+'px');
        }
          
    });

    decfont.on("click", function(e){
        var curSize= parseInt($('#sim').css('font-size')) - 2;

        if(curSize>=10){
            $('#sim').css('font-size', curSize+'px');
            $('#sim').find('h2, h1, h3, h4, span').css('font-size', curSize+'px');
        }
              
    });

    fontdec.on("change", function(e){
        var fontTest = document.getElementById("sim");
        fontTest.style.fontFamily=this.value;
    });

    highlightColorPicker.on("changeColor.colorpicker", function(e){
        setColors();
    });

    wordColorPicker.on("changeColor.colorpicker", function(e){
        setColors();
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