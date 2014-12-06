'use strict'

var updateRate = 60;

var speed_x = 3;
var speed_y = 3;

var world = new World();
var player = new Player();

// MAIN LOOP
var socket = io.connect('http://localhost:3000');

socket.on('set_id', function(id){
  player.id = id;
  console.log('Player id: ' + player.id);
});

var sum = 0;

setInterval(function() {
  if (player.pos.x >= $('body').width() || player.pos.x < 0)
      speed_x *= -1;
  if (player.pos.y >= $('body').height() || player.pos.y < 0)
      speed_y *= -1;

  player.pos.x += speed_x;
  player.pos.y += speed_y;

  $('#ship').css('left', player.pos.x);
  $('#ship').css('top', player.pos.y);
}, 1000/100);

setInterval(function(){
  socket.io.emitAll('player_moved', player);
}, 1000/updateRate);

socket.on('update_world', function(_world){
  delete _world.players['' + player.id];
  $.each(_world, function(key, value){
    world[key] = value;
  });
  console.log(world.players); //FIXME
  world.draw();
});
