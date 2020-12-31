var socket = require( 'socket.io' );
var express = require( 'express' );
var http = require( 'http' );
var path = require( 'path' );

var app = express();
var server = http.createServer( app );

app.use(express.static(path.join(__dirname,'public')));
var io = socket.listen( server );

io.sockets.on( 'connection', function( client ) {
  	console.log( "New client !" );

  	username = "New User";
  	client.on( 'chat_message', ( data ) => {
  		console.log(data.username);
  		if(data.username != null ) username = data.username; 
		io.sockets.emit( 'chat_message',{username:username,chat_message:data.chat_message} );
	});

  	client.on( 'change_username', ( data ) => {
  		socket.username = data.username;
	});
});

server.listen( 4000,() => {
	console.log('Server running at 4000');
});