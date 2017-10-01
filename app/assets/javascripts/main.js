var x = "";

function makeGrid(x){
    for (rows=0; rows < x; rows++) {
        for (columns=0; columns < x; columns++) {
            $('.container').append('<div class = "grid"></div>');
        };
    };
    $('.grid').width(960/x);
    $('.grid').height(960/x);
};
function randomColors() {
  var c = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += c[Math.floor(Math.random() * 16)];
  };
  return color;
};

function mousey() {
    $('.grid').mouseenter(function(){
          $(this).css("background-color", randomColors());
    });
    $('.grid').click(function() {
        $(this).css("background", "none");
    });
 };

function clearGrid() {
   $('.grid').css("background", "none");
   makeGrid(0);
};

$(document).ready(function() {
     makeGrid(16);
     mousey();
     $('button').click(function (){
        clearGrid();
        var gridInput = prompt('Please enter the number of rows for your grid');
            if (gridInput === null || gridInput === '') {
                makeGrid(16);
            } else if (isNaN(gridInput)) {
                makeGrid(16);
            } else {
            makeGrid(gridInput);
            mousey();
            };
     });
});