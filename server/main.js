'use strict'

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var world = require('./world.js');

app.frameRate = 30;

app.use(express.static('./public/'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  var player_id = world.addPlayer();

  socket.emit('set_id', player_id);
  socket.on('player_moved', function(player) {
    if(!player.id) return;
    world.players[player_id] = player;
    return world;
  })
  socket.on('disconnect', function(){
    delete world.players[player_id]
    console.log('Player left, id: ' + player_id);
  });
});

  setInterval(function() {
    io.sockets.emit('update_world', world);
    console.log(JSON.stringify(world)); //FIXME
  }, 1000/app.frameRate);


http.listen(3000, function(){
});
