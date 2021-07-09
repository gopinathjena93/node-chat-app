var socket = io.connect( 'https://gopi-node-chat-app.herokuapp.com/' );
//var socket = io.connect( 'http://192.168.0.11:4000' );

function SendMessage() {
	localStorage_username = localStorage.getItem("username");
	const chat_message = document.getElementById('chat_message').value;
	socket.emit( 'chat_message',{chat_message:chat_message,username:localStorage_username});	
}

function AddUser() {
	const username = document.getElementById('username').value;
	localStorage.setItem("username",username);
	alert('Your Name Change to '+username);
}

socket.on( 'chat_message', (data) => {
	console.log(data);
	console.log("<p class='message'> "+data.username+":"+data.chat_message+"</p>")
	$('#chatroom').append("<p class='message'> "+data.username+":"+data.chat_message+"</p>")
})

socket.on('new_client', (data) => {
	console.log(` hello world`)
	$('#chatroom').append("<p class='message'>New User Added</p>")
})

$(document).ready(function() {
	localStorage.removeItem("username");	
})
