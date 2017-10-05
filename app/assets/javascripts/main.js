
var newSec = 0;
var newMin;
var myVar;
var valN;
var run = 1;
var readOut;


$(document).ready(function(){
   $(".upS").off().on('click', function() {     //off() b/c was increasing by 2
           changeVal($('#numS'), $(".upS"));
    });
   $(".up").off().on('click', function() {
            changeVal($('#numB'), $(".up"));
    });
   $(".downS").off().on('click', function() {
          changeVal($('#numS'), $(".downS"));
    });
   $(".down").off().on('click', function() {
           changeVal($('#numB'), $(".down"));
    });
    $("#start").off().on('click', function() {
                    alert("run is" + run);

        if (run % 2 === 0) {
          alert("running break");
          valN = $('#numB').text();
          $('#sessBreakType').text("On Break");
          $('#countdown').text(valN + ":00");
          newMin = valN;
          $('#numB').startSession();
        }
        else {
          alert("running session");
          valN = $('#numS').text();
          $('#sessBreakType').text("Working");
          $('#countdown').text(valN + ":00");
          newMin = valN;
          $('#numS').startSession();
        }

    });
    $('#pause').off().on('click', function() {
          alert("pause button was hit");
          clearInterval(myVar);
          $('#countdown').text(readOut);
            if (run % 2 == 0) {
               $('#numB').startSession();
            }
            else {
               $('#numS').startSession();
            }

    });
    $('#stop').off().on('click', function() {
          clearInterval(myVar);
          $('#countdown').text(valN + ":00");
          newSec = 0;
    });
    $('#refresh').off().on('click', function() {
          clearInterval(myVar);
          newMin = 25;
          newSec = 0;
          run = 1;
          $('#countdown').text(newMin + ":00");
          $('#numS').text(newMin);
          $('#numB').text(5);

    });

$.fn.startSession = function() {
                alert(run + " 1st check");

    myVar = setInterval(function down () {
        if (newMin <= 0 && newSec <= 0 ) {
            run = run + 1;
            $('#countdown').text("00:00");
            alert(run + " 2nd check");
            alert($('#session').text());
            playAudio();
            clearInterval(myVar);
        }
        else if (newSec > 0) {
          newSec = newSec - 1;
          readOut = formatToTens(newMin) + ":" + formatToTens(newSec);
          $('#countdown').text(readOut);
        }
        else if (newMin == 0 && newSec == 0) {
            $('#countdown').text("00:00");
            run = run + 1;
                        alert(run + " 3rd check");
                                    alert($('#break').text());

            playAudio();
            clearInterval(myVar);
        }
        else {
            newMin = newMin - 1;
            newSec = 59;
            readOut = formatToTens(newMin) + ":" + formatToTens(newSec);
            $('#countdown').text(readOut);
        }

    }, 1000);
};
function changeVal (aaa, bbb) {
    var b = bbb.attr("class");
    if (b == "upS" || b == "up") {
        var oldVal = parseInt($(aaa).text(), 10);
          //if (oldVal <= 0)
            //return;
          //else
        $(aaa).text(oldVal + 1);
          if (b == "upS") {
              $('#countdown').text((oldVal + 1) + ":00");
          }
    }
    else if (b == "downS" || b == "down") {
      var oldVal = parseInt($(aaa).text(), 10);
          $(aaa).text(oldVal - 1);
            if (b == "downS") {
              $('#countdown').text((oldVal - 1) + ":00");
            }

    }


  };

function formatToTens (aValue) {
    aValue = aValue < 10 ? "0" + aValue : aValue;
    return aValue;
};

function playAudio () {
    setTimeout(function () {
            if (run % 2 == 0) {
        $('#session')[0].play();
        }
    else {
        $('#break')[0].play();
    }
}, 1);
};

});