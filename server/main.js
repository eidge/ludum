var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var _pos = {};



app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('ludum/koko', function(from, pos) {
    _pos = pos;
    console.log(_pos);
    console.log('asdsd');
  })

  socket.on('disconnect', function(){
    console.log('A user went fuck himself.');
  });
});


http.listen(3000, function(){
});
