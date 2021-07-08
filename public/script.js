var socket = io.connect( 'https://gopi-node-chat-app.herokuapp.com/' );

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


/***** added 08-07-2021    **********/

function renderButton() {
    gapi.signin2.render('g-signin2', {
        'scope': 'profile email',
        'width': 250,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        'onfailure': onFailure
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    var googleTockenId = profile.getId();
    var name = profile.getName();
    var email = profile.getEmail();    
    var Image = profile.getImageUrl();   
    const userData = {googleTockenId:googleTockenId,name:name,email:email,Image:Image}          
    if(userData.length == 4 ) {
    	localStorage.setItem("userData", userData);
    	window.location.href="/chatroom";
    } else { 
   		alert("Something went wrong please try again")
    }
}

// Sign-in failure callback
function onFailure(error) {
    alert(error);
}

// Sign out the user
function signOut() {
    if(confirm("Are you sure to signout?")){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            $("#loginDetails").hide();
            $("#loaderIcon").hide('fast');
            $("#g-signin2").show('fast');
        });

        auth2.disconnect();
    }
}

function saveUserData(googleTockenId,name,email,profile) {
    $.post("script.php",{authProvider:"Google",googleTockenId:googleTockenId,name:name,email:email,profile:profile},
        function (response) {
        var data = response.split('^');
        if (data[1] == "loggedIn"){
            $("#loaderIcon").hide('fast');
            $("#g-signin2").hide('fast');

            $("#profileLabel").attr('src',profile);
            $("#nameLabel").html(name);
            $("#emailLabel").html(email);
            $("#googleIdLabel").html(googleTockenId);

            $("#loginDetails").show();
        }
    });
}
