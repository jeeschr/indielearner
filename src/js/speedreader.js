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
    var boldWords = speed / 60;
    boldWords = boldWords < 1 ? 1 : Math.round(boldWords);
    timeStart = $.now();
    var sim = $('#sim').text();
    var wordArray = sim.split(/[\s]+/);
    var simWrap = $('#sim');

    var arrCount = wordArray.length;
    var alreadyRead = [];

    for (var i = 0; i < arrCount; i++) {
        (function (index) {
            setTimeout(function () {
                var pos = index;
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
            }, i * speed);
        })(i);
    }
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