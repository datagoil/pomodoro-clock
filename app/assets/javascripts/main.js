
function startCountdown (minutes) {
   var minutes = minutes * 60;
   return minutes;

}
jQuery(function ($) {
  var sessionMinutes = prompt("Enter Session minutes", "0");
  var breakMinutes = prompt("Enter Break Minutes", "0");
  sessionMinutes = parseInt(sessionMinutes);
  breakMinutes = parseInt(breakMinutes);
  display.text(startCountdown(sessionMinutes) + ":" + startCountdown(breakMinutes);
} );

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
        display = $('#timer');
    startTimer(fiveMinutes, display);

});

