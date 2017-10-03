$(document).ready(function(){
   $(".upS").off().on('click', function() {     //off() b/c was increasing by 2
           var oldVal = parseInt($("#numS").text(), 10);
        $('#numS').text(oldVal + 1);
    });
   $(".up").off().on('click', function() {     //off() b/c was increasing by 2
           var oldVal = parseInt($("#numB").text(), 10);
        $('#numB').text(oldVal + 1);
    });
   $(".downS").off().on('click', function() {     //off() b/c was increasing by 2
           var oldVal = parseInt($("#numS").text(), 10);
        $('#numS').text(oldVal - 1);
    });
   $(".down").off().on('click', function() {     //off() b/c was increasing by 2
           var oldVal = parseInt($("#numB").text(), 10);
        $('#numB').text(oldVal - 1);
    });

});


