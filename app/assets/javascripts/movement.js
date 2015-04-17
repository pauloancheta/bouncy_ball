$(document).ready(function(){
  var ball = $('#main_ball'),
     block = $('#block');

  var didCollide = function( main_character, enemy ){
    if(typeof(enemy.offset()) !== "undefined" && typeof(enemy.offset()) !== "undefined"){
      var enemy_x1 = enemy.offset().left;
      var enemy_x2 = enemy.offset().left + enemy.width();
      var enemy_y1 = enemy.offset().top;
      var enemy_y2 = enemy.offset().top + enemy.width();

      // since my ball is has a padding from image it needs to be subtracted
      var main_char_x1 = main_character.offset().left + 10;
      var main_char_x2 = main_character.offset().left + main_character.width() -  10;
      var main_char_y1 = main_character.offset().top - 10;
      var main_char_y2 = main_character.offset().top + main_character.width() - 20;  

      if(enemy_x1 < main_char_x2 && enemy_x2 > main_char_x1 ){ // check horizontal collision
        if(enemy_y1 < main_char_y2){
          return true;
        }
      }
    }
    return false;
  }

  var move_left = function(){
    var move = TweenLite.to( ball , 1 , { 
      left: "+=200px",
      onUpdate: function(){
        if(didCollide(ball, block)){
          move.kill();
          alert("collision");
        }
      } 
    });
  }

  var move_right = function() {
    var move = TweenLite.to( ball , 1 , { 
      left:"-=200px",
      onUpdate: function(){
        if(didCollide(ball, block)){
          move.kill();
          alert("collision");
        }
      }
    });
  }
  
  $(this).on('keydown', function(e) {
    if(e.which === 32){
      TweenLite.to( ball , 0.5 , {
        bottom: "+=200px",
        onComplete: function(){
          TweenLite.to(ball, 1.5, {bottom: "40px", ease: Bounce.easeOut});
        }
      });
    }
  });

  $(this).on('keydown', function(e){
    if(e.which === 39){
      move_left( didCollide(ball, block) );   
    }
    if(e.which === 37){
      move_right( didCollide(ball, block) );
    }
  });
});