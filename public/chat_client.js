var socket = io.connect( 'https://gopi-node-chat-app.herokuapp.com/' );


function SendMessage() {
	localStorage_username = localStorage.getItem("username");
	const chat_message = document.getElementById('chat_message').value;
	document.getElementById('chat_message').value='';

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
				<img src="${serverImage}" alt="" class="img-avatar" style="width:40px">
			</div>
			<div class="media-body">
				<div class="mf-content">
					${data.chat_message}
				</div>
				<small class="mf-date">${serverName}</small>
			</div>
		</div>`;
		$('#chatroom').append(chatroomHtml)
	} else { 	
		const chatroomHtml = `<div class="message-feed media">
			<div class="pull-left">
				<img src="${serverImage}" alt="" class="img-avatar" style="width:40px">
			</div>
			<div class="media-body">
				<div class="mf-content">${data.chat_message}</div>
				<small class="mf-date">${serverName}</small>
			</div>
		</div>`;
		$('#chatroom').append(chatroomHtml)
	} 	
	
})

socket.on('new_client', (data) => {
	console.log(data)
	console.log(` hello world`)
	localEmail = localStorage.getItem('email');
	localName = localStorage.getItem('name');
	localPageReload = localStorage.getItem('page_reload');
	localStorage.setItem('page_reload',true);
	socket.emit( 'new_user_join',{serverEmail:localEmail,serverName:localName,serverPageReload:localPageReload});
	//$('#chatroom').append("<p class='message'>New User Added</p>")
})

socket.on('new_user_join', (data) => {
	localEmail = localStorage.getItem('email');		

	serverEmail = data.serverEmail;
	serverName = data.serverName;
	serverPageReload = data.serverPageReload;	

	if(serverEmail != localEmail && serverPageReload == null) {
		const join_html = `<div class="message-feed media">                
	        <div class="media-body-chat">
	            <div class="join-chat">
	                ${serverName} Join the Chat
	            </div>                    
	        </div>
	    </div>`;
        $('#chatroom').append(join_html)
	}	
})

$(document).ready(function() {
	localEmail = localStorage.getItem('email');
	localName = localStorage.getItem('name');
	localImage = localStorage.getItem('Image');
	$("#login_by div.personal-image img").attr("src",localImage);	
	$("#login_by div.personal-detail div span").html(localName);
	$("#login_by div.personal-detail div:nth-child(2) span").html(localEmail);
	localStorage.removeItem("username");	
})
