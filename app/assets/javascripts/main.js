var newSec = 0;
var newMin;
var myVar;
var valN;

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
          valN = $('#numS').text();
          $('#countdown').text(valN + ":00");
          newMin = valN;
          $('#numS').startSession();
    });
    $('#pause').off().on('click', function() {
          alert("pause button was hit");
    });
    $('#stop').off().on('click', function() {
          clearInterval(myVar);
          $('#countdown').text(valN + ":00");
          newSec = 0;
    });
$.fn.startSession = function() {
    myVar = setInterval(function down () {
        if (newMin <= 0 && newSec <= 0 ) {
            $('#countdown').text("WHAAAA?");
            clearInterval(myVar);
        }
        else if (newSec > 0) {
          newSec = newSec - 1;
          var readOut = formatToTens(newMin) + ":" + formatToTens(newSec);
          $('#countdown').text(readOut);
        }
        else if (newSec == 0) {
            if (newMin == 0) {
              $('#countdown').text("00:00");
              clearInterval(myVar);
            }
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
              $('#countdown').text(oldVal + 1);
          }
    }
    else if (b == "downS" || b == "down") {
      var oldVal = parseInt($(aaa).text(), 10);
          $(aaa).text(oldVal - 1);
            if (b == "downS") {
              $('#countdown').text(oldVal - 1);
            }

    }


  };

function formatToTens (aValue) {
    aValue = aValue < 10 ? "0" + aValue : aValue;
    return aValue;
};

});

