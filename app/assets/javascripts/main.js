
var newSec = 0;
var newMin;
var myVar;
var valN;
var run = 1;
var readOut;
var ajourn = new Audio('break');
var session = new Audio('session');
var pauseValue;
var flashVar;

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
    stopAudioFlashAndPopup();
    $('#pause').css( "pointer-events", "auto" );
    if (pauseValue == 1){
        if (run % 2 == 0) {
          $('#numB').startSession();
        }
        else {
          $('#numS').startSession();
        }
        resetPauseButton();
    }
    else {
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
    }
  });
  $('#pause').off().on('click', function() {
    $('#start').css( "pointer-events", "auto" );
    clearInterval(myVar);
    stopAudioFlashAndPopup();
    $('#countdown').text(readOut);
    $('#pause').css( "pointer-events", "none" );
    pauseValue = 1;
  });
  $('#stop').off().on('click', function() {
    stopAudioFlashAndPopup();
    clearInterval(myVar);
    $('#start').css( "pointer-events", "auto" );
    resetPauseButton();
    $('#countdown').text(valN + ":00");
    newSec = 0;
  });
  $('#refresh').off().on('click', function() {
    stopAudioFlashAndPopup();
    clearInterval(myVar);
    makeClickable()
    resetPauseButton();
    newMin = 25;
    newSec = 0;
    run = 1;
    $('#countdown').text(newMin + ":00");
    $('#numS').text(newMin);
    $('#numB').text(5);
  });

   $.fn.startSession = function() {
    stillTheClicks();
    myVar = setInterval(function down () {
      if (newMin <= 0 && newSec <= 0 ) {
        exitSession ()
      }
      else if (newSec > 0) {
        newSec = newSec - 1;
        readOut = formatToTens(newMin) + ":" + formatToTens(newSec);
        $('#countdown').text(readOut);
      }
      else if (newMin == 0 && newSec == 0) {
        exitSession ()
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
   function playAudioAndPopup() {
       if (run % 2 == 0) {
        ajourn.play();
        $('#breakPopup').toggleClass("show", true);
       }
       else {
        session.play();
        $('#workPopup').toggleClass("show", true);
       }
   };
   function stopAudioFlashAndPopup(){
    ajourn.pause();
    session.pause();
    ajourn.currentTime = 0;
    session.currentTime = 0;
    clearInterval(flashVar);
    if ($('body').attr('class') != "backgroundFlash"){
        $('body').toggleClass("backgroundFlash", true);
    }
    $('#breakPopup').toggleClass("show", false);
    $('#workPopup').toggleClass("show", false);
   };
   function resetPauseButton () {
    pauseValue = 0;
    $('#pause').css( "pointer-events", "auto" );
   };
   function stillTheClicks () {
      $('.upS').css( "pointer-events", "none" );
      $('.up').css( "pointer-events", "none" );
      $('.downS').css( "pointer-events", "none" );
      $('.down').css( "pointer-events", "none" );
      $('#start').css( "pointer-events", "none" );
   }
   function makeClickable() {
      $('.upS').css( "pointer-events", "auto" );
      $('.up').css( "pointer-events", "auto" );
      $('.downS').css( "pointer-events", "auto" );
      $('.down').css( "pointer-events", "auto" );
      $('#start').css( "pointer-events", "auto" );
   }
   function exitSession () {
      run = run + 1;
      $('#countdown').text("00:00");
      playAudioAndPopup();
      clearInterval(myVar);
      $('#start').css( "pointer-events", "auto" );
      $('#pause').css("pointer-events", "none");
      flashVar = setInterval(function(){
          $('body').toggleClass('backgroundFlash');
      },500);
    };
});