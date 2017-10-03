$(document).ready(function(){
   $(".upS").off().on('click', function() {     //off() b/c was increasing by 2
           var oldVal = parseInt($("#numS").text(), 10);
        if (oldVal <= 0)
          return
        else
        $('#numS').text(oldVal + 1);
    });
   $(".up").off().on('click', function() {
           var oldVal = parseInt($("#numB").text(), 10);
        if (oldVal <= 0)
          return
        else
        $('#numB').text(oldVal + 1);
    });
   $(".downS").off().on('click', function() {
           var oldVal = parseInt($("#numS").text(), 10);
        if (oldVal <= 0)
          return
        else
          $('#numS').text(oldVal - 1);
    });
   $(".down").off().on('click', function() {
           var oldVal = parseInt($("#numB").text(), 10);
        if (oldVal <= 0)
          return
        else
        $('#numB').text(oldVal - 1);
    });
    $("#start").on('click', function() {
          $('#numS').startSession();
    });
});

$.fn.startSession = function() {
    var seconds = 00;
    var minutes = parseInt(this.text(), 10)
    var readOut = minutes + ":" + seconds;
      /**function setInterval() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;



          if (--timer < 0) {
            timer = duration;
          }
    ;
};
};**/
    $('#countdown').text(readOut)
};

