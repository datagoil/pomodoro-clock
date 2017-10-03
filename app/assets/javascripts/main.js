$(document).ready(function(){
   $(".upS").off().on('click', function() {     //off() b/c was increasing by 2
           var oldVal = parseInt($("#numS").text(), 10);
        if (oldVal <= 0)
          return;
        else
        $('#numS').text(oldVal + 1);
    });
   $(".up").off().on('click', function() {
           var oldVal = parseInt($("#numB").text(), 10);
        if (oldVal <= 0)
          return;
        else
        $('#numB').text(oldVal + 1);
    });
   $(".downS").off().on('click', function() {
           var oldVal = parseInt($("#numS").text(), 10);
        if (oldVal <= 0)
          return;
        else
          $('#numS').text(oldVal - 1);
    });
   $(".down").off().on('click', function() {
           var oldVal = parseInt($("#numB").text(), 10);
        if (oldVal <= 0) {
          return;
        }
        else
        $('#numB').text(oldVal - 1);
    });
    $("#start").on('click', function() {
          $('#numS').startSession();

    });
$.fn.startSession = function() {
    var seconds = 0;
    var minutes = parseInt(this.text(), 10);
    $(seconds).formatMinSec();
    $(minutes).formatMinSec();
    var readOut = minutes + ":" + seconds;

    $('#countdown').text(readOut);
    alert(readOut);
    setInterval(countDown(minutes, seconds), 1000);

};
function countDown (min, sec) {
    var readOut = min + ":" + sec;
    if (sec > 0) {
      sec = sec - 1;
      $('#countdown').text(readOut);
    }
    else if (sec = 0) {
        min = min - 1;
        sec = 59;
        $('#countdown').text(readOut);
    }
    /**else if (minutes = 0) {

    }**/
};

function formatMinSec (aValue) {
    if (aValue < 10) {
      aValue = "0" + aValue;
    }
    alert("code reached formatMinSec function");
};

});

