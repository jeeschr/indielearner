$('#sim').each(function () {
    this.contentEditable = true;
});

var go = $('#go');
var stop = $('#stop');
var wordCount = 0;
var wordCountBox = $('#wordCountBox');
var timepassed = $('#timepassed');
var textRead = $('#textRead');


go.on("click", function (e) {
    e.preventDefault();
    startSim();
});

function startSim() {

    var speed = $('#speed').val();
    // var speed = 120;
    //60 wpm == 1 word per sec
    var delay = 1/((speed/60)/1000);
    console.log('speed: ',speed);
    console.log('delay: ',delay);
    
    var boldWords = speed / 60;
    boldWords = boldWords < 1 ? 1 : Math.round(boldWords);
    timeStart = $.now();
    var sim = $('#sim').text();
    var wordArray = sim.split(/[\s]+/);
    var simWrap = $('#sim');

    var arrCount = wordArray.length;
    console.log('arrCount: ',arrCount);
    var alreadyRead = [];


    (function fn(n){   
      
        console.log('wordArray: ',wordArray[n]);




        var pos = n;
        if (pos < 0) {
            pos = 0;
        }
        alreadyRead.push(wordArray[pos]);
        wordArray[pos] = '<span class="grayx">' + wordArray[pos] + '</span>';
        if (pos > (boldWords - 1)) {
            wordArray[pos - boldWords] = wordArray[pos - boldWords].replace("x", "dim");
        }
        var words = wordArray.join(" ");
        simWrap.html(words);
        wordCount++;
        if (pos == (arrCount - 1)) {
            triggerDone();
        }
        $('#sim span:last')[0].scrollIntoView(false);



        if(n<arrCount)
            setTimeout(function(){
              fn(++n);
            },(delay));
    }(0));

    // function doSetTimeout(i) {
        
    //     setTimeout(function(ind) { 
    //         console.log('hi there');
    //         console.log('wordArray: ',wordArray[ind]);
    //     }, 1000*1000*i);
    // }
    // (function fn(n){   
    //   console.log( n );   
    //   if(n<9)
    //     setTimeout(function(){
    //       fn(++n);
    //     },800);
    // }(0));
    
    // for (var i = 0; i <= arrCount; i++) {
        // doSetTimeout(i);
        // console.log('in loop');
        // (function (index) {
        //     setTimeout(function(){
        //         console.log('wordArray: ',wordArray[index]);
        //     },(i*1000));
        // })(i);
        // (function (index) {
        //     setTimeout(function () {
        //         var pos = index;
        //         if (pos < 0) {
        //             pos = 0;
        //         }
        //         alreadyRead.push(wordArray[pos]);
        //         wordArray[pos] = '<span class="grayx">' + wordArray[pos] + '</span>';
        //         if (pos > (boldWords - 1)) {
        //             wordArray[pos - boldWords] = wordArray[pos - boldWords].replace("x", "dim");
        //         }
        //         var words = wordArray.join(" ");
        //         simWrap.html(words);
        //         wordCount++;
        //         if (pos == (arrCount - 1)) {
        //             triggerDone();
        //         }
        //         $('#sim span:last')[0].scrollIntoView(false);
        //     }, i * speed);
        // })(i);
    // }
    // Function done
    function triggerDone() {
        wordCountBox.text(wordCount + ' Words Read');
        var timeEnd = $.now();
        var timeRes = timeEnd - timeStart;
        timeRes = parseInt(timeRes);
        timeRes = timeRes / 1000;
        timepassed.text(" in " + timeRes + " Seconds.");
        alreadyRead = alreadyRead.join("");
        textRead.text(alreadyRead);
        var summary = $('#summary');
        summary.show();
        return;
    }
    stop.on("click", function (e) {
        e.preventDefault();
        triggerDone();
    });
}


