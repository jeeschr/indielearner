var timeoutID;
var keepGoing = true;
var boldWords;
var sim;
var start = $('#start-btn');
var app = app || {};
var pauseContinue = true;
var startClickCounter=0;
var numWordsHighlight = 1;
var speed = 0;
var wordCount = 0;
var delay = 0;
var textbox = $('#sim');
var scrollWidth = 2;
var nn=0;
var wordArray= new Array();
var alreadyRead = new Array();
var highlightColorPicker;
var wordColorPicker;

function triggerDone() {
    // console.log('triggerDone: ',wordCount);
    start.text('Start');
    startClickCounter=0;
    // removeSimHighlights();
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
}

function setSim() {
    // console.log('setSim');
    nn=0;
    speed = $('#speed').val();
    delay = 1/((speed/60)/1000);
    timeStart = $.now();

    // boldWords = speed / 60;
    // boldWords = boldWords < 1 ? 1 : Math.round(boldWords);
    // console.log('bolding: ',boldWords);
    if (!boldWords){
        // console.log('if clause');
        boldWords = 1;
    }
    timeStart = $.now();
    sim = $('#sim').text();
    var value;
    wordArray = sim.split(/[\s]+/);
    // simWrap = $('#sim');


    var words = $('#sim').html();
    var result = htmlToText.fromString(words);
    // console.log('count result: ',result);
    wordArray = result.trim().replace(/\s+/g, ' ').split(' ');
    

    arrCount = wordArray.length;
    
    wordCount = 0;
}

function setSimSpeed(){
    delay = 1/((speed/60)/1000);
}

function setSimNumWordsHighlight(num){
    boldWords = num;
}

function startSim(){
    // console.log('startSim');
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
            textbox.html(words);
            // console.log('simWrap: ',simWrap);

            ++wordCount;
            // console.log('wordCount: ',wordCount);
            if (pos == (arrCount - 1)) {
                triggerDone();
            }
            // console.log('#sim loc: ',$('#sim'));
            checkScroll();
            // $('#sim span:last')[0].scrollIntoView(false);
            
            if(n<(arrCount-1))
                timeoutID = setTimeout(function(){
                  fn(++n);
                },(delay));
       }
    }(nn));
}

function checkScroll(){
    // $('#sim').scrollLeft(0);
    var width = $('#sim')[0].clientWidth;

    // var height = $('#sim')[0].scrollHeight;
    // console.log('width: ', width);
    // console.log('height: ', height);
    var loc = $('#sim span:last');
    // console.log('highlight offset: ',loc.offset().left);
    if(loc.position()!=undefined){
        var pos =  loc.position().left-$(window).scrollLeft();
        // console.log('highlight position: ',pos);
        // console.log('scrollTop: ',loc.offset().top);
        if(pos<0){
        
            if(scrollWidth>width){
                // console.log('less: ',pos);   
                // $('#sim').scrollLeft(0);
                scrollWidth=0;
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

function counter() {
    var words = $(this).html();
    var result = htmlToText.fromString(words);
    // console.log('count result: ',result);
    wordCount = result.trim().replace(/\s+/g, ' ').split(' ').length;
    // console.log('length: ',length);
    if (!result)
        $('#wordCount').text(0);
    else
        $('#wordCount').text(wordCount);
}

function clearSim(){
    var sim = $('#sim');
    sim.empty();
}

function removeSimHighlights(text){
    var words = $(text).html();
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
    // console.log('colorpicker: ',highlightColorPicker);
     // highlightColorPicker.on("changeColor.colorpicker", function(e){
        // var col = highlightColorPicker.colorpicker.color.toRGB();
        // $('#text-row #sim .grayx').css({'color':'rgb('+col.r+','+col.g+','+col.b+')'});
        // $('#text-row #sim .grayx').css({'text-shadow':'0 0 0px rgb('+col.r+','+col.g+','+col.b+')'});

        // var styleElement = document.createElement("style");
        // styleElement.type = "text/css";
        // document.head.insertBefore(styleElement, null);
        // var styleSheet = styleElement.sheet;
        // var ruleNum = styleSheet.cssRules.length;
        // styleSheet.insertRule(".grayx{color:rgb("+col.r+","+col.g+","+col.b+");}",ruleNum);
    // });

    // wordColorPicker.on("changeColor.colorpicker", function(e){
    //     var col = e.color.toRGB();
    //     $('#text-row #sim').css({'color':'rgb('+col.r+','+col.g+','+col.b+')'});
    //     $('#text-row #sim .graydim').css({'color':'rgb('+col.r+','+col.g+','+col.b+')'});
    // });
}

(function(){
    'use strict';

    new app.NoteView();
    
    highlightColorPicker = $('#highlight-picker').colorpicker();
    wordColorPicker = $('#word-color-picker').colorpicker({
        format: 'rgba'
    });

    wordColorPicker.colorpicker('setValue','rgba(0,0,0,0.1)');
    highlightColorPicker.colorpicker('setValue','black');
    
    var clear = $('#clear-btn');
    var reset = $('#reset-btn');
    var incfont = $('#incfont-btn');
    var decfont = $('#decfont-btn');
    
    var getSpeed = $('#speed');
    var getNumWordsHighlight = $('#numWords');

    var fontdec = $('select[name=font-decision]');
    var wordCountBox = $('#wordCountBox');
    
    // app.textbox = $('#sim');

    textbox.on('change keydown keypress keyup blur focus', counter);
    // textbox.on('change keydown keypress keyup blur focus', cleanText);

    textbox.highlighter({
        'complete': function (data) {
            // console.log('data: ',data);
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
        var oldNumWords = numWordsHighlight;
        numWordsHighlight = getNumWordsHighlight.val();
        // console.log('numWords: ',numWordsHighlight);
        setSimNumWordsHighlight(numWordsHighlight);
        // removeSimHighlights(textbox);
        // if (numWords<=oldNumWords){
            // con/sole.log('yep');
            // nn=nn-(numWords)+1;
        // }
        // if (oldNumWords<numWords){
            // console.log('in here');
            // nn=nn-(numWords);
        // }
    });

    start.on("click", function (e) {
        if(wordCount){
            setColors();
            // console.log('wordCount: ',wordCount);
            e.stopPropagation();
            // removeSimHighlights(textbox);
            if (startClickCounter==0){
                // console.log('clicked here');
                window.clearTimeout(timeoutID);
                setSim();
                startSim();
                start.text("Pause");
                startClickCounter++;
            }
            else{
                 if (pauseContinue){
                    // removeSimHighlights(textbox);
                    nn=nn+1;
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
        removeSimHighlights(textbox);

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
        // document.execCommand('fontsize', false, '5');
        // console.log('incFont: ',$('#sim'));
        var curSize= parseInt($('#sim').css('font-size')) + 2;

        if(curSize<=84){
            $('#sim').css('font-size', curSize+'px');
            $('#sim').find('h2, h1, h3, h4').css('font-size', curSize+'px');
        }
          
    });

    decfont.on("click", function(e){
        var curSize= parseInt($('#sim').css('font-size')) - 2;

        if(curSize>=10){
            $('#sim').css('font-size', curSize+'px');
            $('#sim').find('h2, h1, h3, h4').css('font-size', curSize+'px');
        }
              
    });

    fontdec.on("change", function(e){
        var fontTest = document.getElementById("sim");
        fontTest.style.fontFamily=this.value;
    });

    highlightColorPicker.on("changeColor.colorpicker", function(e){
        var col = e.color.toRGB();
        $('#text-row #sim .grayx').css({'color':'rgb('+col.r+','+col.g+','+col.b+')'});
        $('#text-row #sim .grayx').css({'text-shadow':'0 0 0px rgb('+col.r+','+col.g+','+col.b+')'});

        var styleElement = document.createElement("style");
        styleElement.type = "text/css";
        document.head.insertBefore(styleElement, null);
        var styleSheet = styleElement.sheet;
        var ruleNum = styleSheet.cssRules.length;
        styleSheet.insertRule(".grayx{color:rgb("+col.r+","+col.g+","+col.b+");}",ruleNum);
    });

    wordColorPicker.on("changeColor.colorpicker", function(e){
        var col = e.color.toRGB();
        $('#text-row #sim').css({'color':'rgb('+col.r+','+col.g+','+col.b+')'});
        $('#text-row #sim .graydim').css({'color':'rgb('+col.r+','+col.g+','+col.b+')'});
        var highCol = highlightColorPicker.colorpicker('getValue');
        $('#text-row #sim .grayx').css({'color':'rgb('+highCol.r+','+highCol.g+','+highCol.b+')'});
        $('#text-row #sim .grayx').css({'text-shadow':'0 0 0px rgb('+highCol.r+','+highCol.g+','+highCol.b+')'});

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