var fb = new Firebase("https://scorching-inferno-3193.firebaseio.com");

var x = 0;
var y = 0;

setInterval(function(){ 
  fb.set({
    x: (x += 1),
    y: (y += 1)
  });
}, 1/90);

fb.on('value', function(pos){
  $("#ship").css('left', pos.val().x + 'px');
  $("#ship").css('top', pos.val().y + 'px');
});
