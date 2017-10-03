$(document).ready(function(){
   $(".upS").off().on('click', function() {     //off() b/c was increasing by 2
           var oldVal = parseInt($("#numS").text(), 10);
        if (oldVal <= 0)
          return;
        else
        $('#numS').text(oldVal + 1);
      $('#countdown').text(oldVal + 1);
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
    $("#start").off().on('click', function() {
          var valN = $('#numS').text();
          $('#countdown').text(valN + ":00");
          $('#numS').startSession();

    });
$.fn.startSession = function() {
    setInterval(function down () {
        alert("what the hell");
        var newSec = 0;
        var newMin = parseInt($('#numS').text(), 10);
        if (newSec > 0) {
          newSec = newSec - 1;
          var readOut = formatToTens(newMin) + ":" + formatToTens(newSec);
          $('#countdown').text(readOut);
        }
        else if (newSec == 0) {
            newMin = newMin - 1;
            newSec = 59;
            readOut = formatToTens(newMin) + ":" + formatToTens(newSec);
            $('#countdown').text(readOut);

        }

        /**else if (minutes = 0) {

        }**/
    }, 1000);




};


function formatToTens (aValue) {
    aValue = aValue < 10 ? "0" + aValue : aValue;
    return aValue;
};

});

