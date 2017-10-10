var newSec = 0;
var newMin;
var myVar;
var valN;
var run = 1;   //used to determine if we are on a session on break
var readOut;
var ajourn = new Audio('break');
var session = new Audio('session');
var pauseValue; //used to determine if pause should enabled or disabled.
var flashVar;

//controls clicking of up/down arrows
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
    stopAudioFlashAndPopup();           //when time is up, pressing play will stop all notifications
    $('#pause').css( "pointer-events", "auto" );  //activates pause resetPauseButton
    if (pauseValue == 1){                //if pause was hit, this loop determines if it was pressed during break or session
        if (run % 2 == 0) {             //run value determines if we are on a break or session
          $('#numB').startSession();    //continues counting down break
        }
        else {
          $('#numS').startSession();  //continues counting down session
        }
        resetPauseButton();           //activates pause button
    }
    else {
      if (run % 2 === 0) {                    //if it is an even numbered run, it must be on break
        valN = $('#numB').text();             //out put value chosen for break by user
        $('#sessBreakType').text("On Break"); //shows Break above main countdown so user knows on break
        $('#countdown').text(valN + ":00");   //adds seconds to countdown display
        newMin = valN;                        //give value to newMin for use in startSession()
        $('#numB').startSession();            //run a break countdown
      }
      else {
        valN = $('#numS').text();             //out put value chosen for session length by user
        $('#sessBreakType').text("Working");  //shows Working above main countdown so user knows in work session
        $('#countdown').text(valN + ":00");
        newMin = valN;                        //prepares minutes value set by user to be sent to startSession()
        $('#numS').startSession();            //run a session countdown
      }
    }
  });
  $('#pause').off().on('click', function() {
    $('#start').css( "pointer-events", "auto" );  //when pause is clicked, we listen for play/start
    clearInterval(myVar);                         //stops running the current countdown
    stopAudioFlashAndPopup();                     //pause will stop all notifications
    $('#countdown').text(readOut);                //sets countdown to value it was at when paused
    $('#pause').css( "pointer-events", "none" );  //deactivates pause button
    pauseValue = 1;                               //this value shows that pause button is deactivated
  });
  $('#stop').off().on('click', function() {       //listening for stop to be clicked
    stopAudioFlashAndPopup();                     //stop will cease all notifications
    clearInterval(myVar);                         //stops running current countdown
    $('#start').css( "pointer-events", "auto" );  //activates Start/Play button
    resetPauseButton();                           //activates pause button
    $('#countdown').text(valN + ":00");           //sets countdown display to what user chose for session originally
    newSec = 0;                                   //resets seconds that were being used/adjusted by startSession()
  });
  $('#refresh').off().on('click', function() {    //listening for click on refresh button
    stopAudioFlashAndPopup();                     //refresh will cease all notifications
    clearInterval(myVar);                         //stops current countdown
    makeClickable()                               //makes up/down arrows clickable as well as start/play if it was disabled
    resetPauseButton();                           //activates pause button
    newMin = 25;                                  //resets minute display to default
    newSec = 0;                                   //prepares newSec to be used in startSession
    run = 1;                                      //reset run so app knows to run a session not a break
    $('#countdown').text(newMin + ":00");         //reset countdown to default
    $('#numS').text(newMin);                      //resets user control of session minutes to default
    $('#numB').text(5);                           //resets user control of break minutes to default
  });
//main function to run the countdown. Runs break and session countdowns
   $.fn.startSession = function() {
    stillTheClicks();             //deactivates up/down arrows and start/play button
    myVar = setInterval(function down () {      //setInterval runs this function every second
      if (newMin <= 0 && newSec <= 0 ) {        //when counter gets to all zeros or below, run exit function
        exitSession ()
      }
      else if (newSec > 0) {                    //loop counts down and displays seconds 59-1
        newSec = newSec - 1;                    //decreases seconds by 1 each iteration
        readOut = formatToTens(newMin) + ":" + formatToTens(newSec);  //sets and formats minutes and seconds for user display
        $('#countdown').text(readOut);          //prints current time to countdown readout for user
      }
      else if (newMin == 0 && newSec == 0) {    //second chance to exit loop and countdown
        exitSession ()
      }
      else {
        newMin = newMin - 1;                    //decreases minutes
        newSec = 59;                            //sets seconds for each minute decrease
        readOut = formatToTens(newMin) + ":" + formatToTens(newSec);
        $('#countdown').text(readOut);
      }
    }, 1000);                                 //'1000' = milliseconds = interval to run
   };
   function changeVal (aaa, bbb) {
    var b = bbb.attr("class");                  //arg determines if it should increase or decrease
    if (b == "upS" || b == "up") {              //these class types will increase
      var oldVal = parseInt($(aaa).text(), 10); //changes string into an integer
          $(aaa).text(oldVal + 1);              //changes number shown in DOM
          if (b == "upS") {                     //also changes countdown text if clicking on 'session' arrows
            $('#countdown').text((oldVal + 1) + ":00"); //displays session minutes in large countdown area
          }
        }
    else if (b == "downS" || b == "down") {     //thse class types will decrease
      var oldVal = parseInt($(aaa).text(), 10);
          if (oldVal <= 1)                      //break and session controls may not be adjusted to zero or below.
            oldVal = 1;                         //freezes minute adjuster at 1
          else
            $(aaa).text(oldVal - 1);            //code to decrease display # when down arrow is clicked
          if (b == "downS" && oldVal >= 2) {
            $('#countdown').text((oldVal - 1) + ":00"); //displays session minutes in large countdown area
          }
    }
   };
   //this function adds a '0' before single digit numbers in minutes or seconds
   function formatToTens (aValue) {
        aValue = aValue < 10 ? "0" + aValue : aValue;
        return aValue;
   };
   //plays audio and popup notifications when countdown reaches 00:00
   //notifications prompt user to press play/start to begin their break or session
   function playAudioAndPopup() {
       if (run % 2 == 0) {              //run determines if it is a break or session countdown
        ajourn.play();                  //plays audio to prompt user to take a break
        $('#breakPopup').toggleClass("show", true);     //displays a pop-up specific to breaktime
       }
       else {
        session.play();                 //plays audio prompt to return to work
        $('#workPopup').toggleClass("show", true);      //displays pop-up prompt to return to work
       }
   };
   //stop the onslaught of flashing screen, audio and pop-ups
   function stopAudioFlashAndPopup(){
    ajourn.pause();                         //stops if it is playing
    session.pause();                        //stop audio if it is playing
    ajourn.currentTime = 0;                 //resets audio to begining of track
    session.currentTime = 0;
    clearInterval(flashVar);                //stops screen from flashing
    if ($('body').attr('class') != "backgroundFlash"){          //resets background color to default
        $('body').toggleClass("backgroundFlash", true);
    }
    $('#breakPopup').toggleClass("show", false);                //removes pop-up display
    $('#workPopup').toggleClass("show", false);
   };
   //pause button become deactivated when click. this function reactivates it.
   function resetPauseButton () {
    pauseValue = 0;                                     //this value means pause is active
    $('#pause').css( "pointer-events", "auto" );        //listening for click on pause
   };
   //control arrows and start/play are not clickable
   function stillTheClicks () {
      $('.upS').css( "pointer-events", "none" );
      $('.up').css( "pointer-events", "none" );
      $('.downS').css( "pointer-events", "none" );
      $('.down').css( "pointer-events", "none" );
      $('#start').css( "pointer-events", "none" );
   }
   //reactivates control arrows and start/play button
   function makeClickable() {
      $('.upS').css( "pointer-events", "auto" );
      $('.up').css( "pointer-events", "auto" );
      $('.downS').css( "pointer-events", "auto" );
      $('.down').css( "pointer-events", "auto" );
      $('#start').css( "pointer-events", "auto" );
   }
   //runs when startSession() exits - a reset and cleanup function
   function exitSession () {
      run = run + 1;                  //this var determines if we are on a break or a session
      $('#countdown').text("00:00");  //resets countdown to default
      playAudioAndPopup();            //plays proper audio and proper according to value of 'run'
      clearInterval(myVar);           //stops current running session
      $('#start').css( "pointer-events", "auto" );      //activates start/play button
      $('#pause').css("pointer-events", "none");        //deactivates pause button
      flashVar = setInterval(function(){                //flashes background color
          $('body').toggleClass('backgroundFlash');     //turns CSS class on/off
      },500);                                           //runs each half-second
    };
});