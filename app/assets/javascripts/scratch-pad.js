

/**modified code from here: https://www.w3schools.com/howto/howto_js_countdown.asp**/
/**Set time we are counting down to**/
var countDowntime = "00:00:00"

/**Update countdown every 1 second**/
var x = setInterval(function() {
  /**Get Session date**/
  var session = getSession()
  /** Time calculations for hours and minutes**/
  var hours = Math.floor((session % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((session % (1000 * 60 * 60)) / (1000 * 60));
  /**Display the results in the element with id='countdown'**/
  document.getElementById('countdown').innerHTML = hours + ":" + minutes;
  /**If the countdown is finished, toggle the text and toggle the countdown**/

}, 1000);

/**listen for click on img function**/
$('#img').on('click', function(){})

/**function to get session minutes from user**/
function getSession(25) {
  var minutes = new Date('00/00/0000 25:00 AM');
}


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

jQuery(function ($) {
    var fiveMinutes = 60 * 5,
        display = $('#time');
    startTimer(fiveMinutes, display);
});
/**input from session and break
session is num for countdown
**/
/**idea from here: http://smallbusiness.chron.com/javascript-coding-countdown-10-0-38860.html**/
var timer;
var totalMinutes;
var totalSeconds = 0;

function Session(timerId, time) {
  timer = document.getElementById(timerId);
  totalMinutes = time;
  updateTimer() window.setTimeout("tick()", 1000); //makes the timer tick every one sec
}
/**decreases timer by seconds**/
function tick() {
  if (totalMinutes <= 0) {
    alert("Time's up!")
    return;
  }
  totalMinutes -= 1;
  updateTimer()window.setTimeout("tick()", 1000);
}
/**updates timer each second**/
function updateTimer() {
  timer.innerHTML = totalMinutes;
}
my code that doesn't work

version 1:

var minutes;
function setSessionMinutes() {
  var sessionMinutes = prompt("Enter Session minutes", "0");
  var minutes = localStorage.setItem('minutes', sessionMinutes);
  minutes = parseInt(minutes, "10");
  return minutes * 60;
}


function startCountdown () {
  setSessionMinutes();
  return minutes + 10;
}
$(document).ready(function() {
  display.text(startCountdown() + ":";
} );


version 2:
function setBreakMinutes() {
  var breakMinutes = prompt("Enter Break Minutes", "0");
  localStorage.setItem('minutes', breakMinutes);
}

version 3:
/**function to get break minutes from user**/
function getBreak(5) {
  var minutes
}
/**function to start countdown. takes session and break minutes**/
function countdown(getSession, getBreak) {
  var time = make.time(getSession)
  when time = 0:00 toggle break/session  and
  make.time(break)
  countdown and when time = 0:00, toggle break/session.
  repeat till stop
}