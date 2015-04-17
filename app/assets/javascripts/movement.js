$(document).ready(function(){
  var ball        = $('#main_ball'),
      block       = $('#block'),
      block_left  = $('#block_left');
      block_right = $('#block_right');

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

  var addPoint = function() {
    var score = parseInt($('#score').text());
    if(didCollide(ball, block_left) && block_left.hasClass('active')){
      block_left.removeClass('active');
      block_right.addClass('active');
      score += 1
    }
    if(didCollide(ball, block_right) && block_right.hasClass('active')){
      block_right.removeClass('active');
      block_left.addClass('active');
      score += 1
    }

    $('#score').text(score);
  }

  var move_left = function(){
    var move = TweenLite.to( ball , 1 , { 
      left: "+=200px",
      onUpdate: function(){
        if(didCollide(ball, block)){
          move.kill();
          $('#score').text('0');
          alert('collision');
        }
      } 
    });
  }

  var move_right = function(){
    var move = TweenLite.to( ball , 1 , { 
      left:"-=200px",
      onUpdate: function(){
        if(didCollide(ball, block)){
          move.kill();
          $('#score').text('0');
          alert('collision');
        }
      }
    });
  }

  var move_up = function(){
    var move = TweenLite.to( ball , 0.5 , {
      bottom: "+=100px",
      onStart: function(){
        addPoint();
      },
      onUpdate: function(){
        if( (ball.offset().top + 10) <= $('.main_container').offset().top ){
          TweenLite.to(ball, 0.5, {bottom: "40px", ease: Bounce.easeOut});
          $('#score').text('0');
          alert('collision');
          move.kill();
        }
      },
      onComplete: function(){
        TweenLite.to(ball, 1.5, {bottom: "40px", ease: Bounce.easeOut});
      }
    });
  }
  
  $(this).on('keydown', function(e) {
    if(e.which === 32){
      move_up();
    }
    else if(e.which === 39){
      move_left();   
    }
    else if(e.which === 37){
      move_right();
    }
  });

});