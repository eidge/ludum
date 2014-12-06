'use strict'

var socket = io.connect('http://localhost:3000');;

setInterval(1000, function() {
  socket.io.emitAll('player_moved', {x: 1, y: 1});
});
