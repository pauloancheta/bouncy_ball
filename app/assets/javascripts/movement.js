$(document).ready(function(){
  var ball = $('#main_ball');

  $(this).on('keyup', function(e) {
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
      TweenLite.to( ball , 1 , {left:"+=50px"} );
    }
    if(e.which === 37){
      TweenLite.to( ball , 1 , {left:"-=50px"} );

    }
  });
});