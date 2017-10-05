
var newSec = 0;
var newMin;
var myVar;
var valN;
var run = 1;
var readOut;
var ajourn = new Audio('break');
var session = new Audio('session');


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
    pauseAudio();
    if (run % 2 === 0) {
      valN = $('#numB').text();
      $('#sessBreakType').text("On Break");
      $('#countdown').text(valN + ":00");
      newMin = valN;
      $('#numB').startSession();
    }
    else {
      valN = $('#numS').text();
      $('#sessBreakType').text("Working");
      $('#countdown').text(valN + ":00");
      newMin = valN;
      $('#numS').startSession();
    }
  });
  $('#pause').off().on('click', function() {
    clearInterval(myVar);
    pauseAudio();
    $('#countdown').text(readOut);
    if (run % 2 == 0) {
     $('#numB').startSession();
    }
    else {
     $('#numS').startSession();
    }
  });
  $('#stop').off().on('click', function() {
    pauseAudio();
    clearInterval(myVar);
    $('#countdown').text(valN + ":00");
    newSec = 0;
  });
  $('#refresh').off().on('click', function() {
    pauseAudio();
    clearInterval(myVar);
    newMin = 25;
    newSec = 0;
    run = 1;
    $('#countdown').text(newMin + ":00");
    $('#numS').text(newMin);
    $('#numB').text(5);
  });

   $.fn.startSession = function() {
    myVar = setInterval(function down () {
      if (newMin <= 0 && newSec <= 0 ) {
        run = run + 1;
        $('#countdown').text("00:00");
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
          $(aaa).text(oldVal + 1);
          if (b == "upS") {
            $('#countdown').text((oldVal + 1) + ":00");
          }
        }
    else if (b == "downS" || b == "down") {
      var oldVal = parseInt($(aaa).text(), 10);
          if (oldVal <= 1)
            oldVal = 1;
          else
            $(aaa).text(oldVal - 1);
          if (b == "downS" && oldVal >= 2) {
            $('#countdown').text((oldVal - 1) + ":00");
          }
    }
   };
   function formatToTens (aValue) {
        aValue = aValue < 10 ? "0" + aValue : aValue;
        return aValue;
   };
   function playAudio () {
       ajourn.currentTime = 0;
       session.currentTime = 0;
       if (run % 2 == 0) {
        ajourn.play();
       }
       else {
        session.play();
       }
   };
   function pauseAudio(){
    ajourn.pause();
    session.pause();
   };
});