'use strict'

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

var _pos = {x: 1, y:1};

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('player_moved', function(pos) {
    _pos = pos;
    return pos;
  })

  socket.on('disconnect', function(){
    console.log('A user went fuck himself.');
  });

  setInterval(function() {
    socket.broadcast('update_world', _pos);
  }, 1000/20);
});


http.listen(3000, function(){
});
