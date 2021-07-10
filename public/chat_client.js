var socket = io.connect( 'https://gopi-node-chat-app.herokuapp.com/' );


function SendMessage() {
	localStorage_username = localStorage.getItem("username");
	const chat_message = document.getElementById('chat_message').value;

	localEmail = localStorage.getItem('email');
	localName = localStorage.getItem('name');
	localImage = localStorage.getItem('Image');

	socket.emit( 'chat_message',{chat_message:chat_message,serverEmail:localEmail,serverName:localName,serverImage:localImage,});	
}

function AddUser() {
	const username = document.getElementById('username').value;
	localStorage.setItem("username",username);
	alert('Your Name Change to '+username);
}

socket.on( 'chat_message', (data) => {
	localEmail = localStorage.getItem('email');
	localName = localStorage.getItem('name');
	localImage = localStorage.getItem('Image');

	serverEmail = data.serverEmail;
	serverName = data.serverName;
	serverImage = data.serverImage;

	if(serverEmail == localEmail) {
		const chatroomHtml = `<div class="message-feed right">
			<div class="pull-right">
				<img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="img-avatar">
			</div>
			<div class="media-body">
				<div class="mf-content">
					${data.chat_message}
				</div>
				<small class="mf-date"><i class="fa fa-clock-o"></i> 20/02/2015 at 10:10</small>
			</div>
		</div>`;
		$('#chatroom').append(chatroomHtml)
	} else { 	
		const chatroomHtml = `<div class="message-feed media">
			<div class="pull-left">
				<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="img-avatar">
			</div>
			<div class="media-body">
				<div class="mf-content">${data.chat_message}</div>
				<small class="mf-date"><i class="fa fa-clock-o"></i> 20/02/2015 at 09:00</small>
			</div>
		</div>`;
		$('#chatroom').append(chatroomHtml)
	} 	
	
})

socket.on('new_client', (data) => {
	console.log(data)
	console.log(` hello world`)
	//$('#chatroom').append("<p class='message'>New User Added</p>")
})

$(document).ready(function() {
	localStorage.removeItem("username");	
})
