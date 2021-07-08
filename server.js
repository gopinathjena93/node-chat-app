var socket = require( 'socket.io' );
var express = require( 'express' );
var http = require( 'http' );
var path = require( 'path' );

const port = process.env.PORT || 3000

var app = express();
var server = http.createServer( app );

app.use(express.static(path.join(__dirname,'public')));
var io = socket.listen( server );

io.sockets.on( 'connection', function( client ) {
  	console.log( "New client !" );
    io.sockets.emit( 'new_client',{message:"New Client"} );


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

app.get("/",(req,res) => {
	res.sendFile(__dirname + "/public/index.html")	
})

app.get("/chatroom",(req,res) => {
	res.sendFile(__dirname + "/public/chatroom.html")	
})


server.listen( port,() => {
	console.log(`Server running at ${port}`);
});
