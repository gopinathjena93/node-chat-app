$(document).ready(function() {	
	localStorage.removeItem("username");
	
	var path = window.location.pathname;
	var page = path.split("/").pop();    

	const googleTockenId = localStorage.getItem("googleTockenId");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const Image = localStorage.getItem("Image");  

   if(googleTockenId == null & name == null && email == null && Image == null & page =="chatroom" ) { 
    	window.location.href="/";
	}

	if(googleTockenId != null & name != null && email != null && Image != null & (page =="" || page =="index.html") ) { 
    	window.location.href="/chatroom";
	}
})




 function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log(profile);
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
	 
	var googleTockenId = profile.getId();
    var name = profile.getName();
    var email = profile.getEmail();    
    var Image = profile.getImageUrl();   
    const local_email = localStorage.getItem("email");
    const local_name = localStorage.getItem("name");
    if(local_email == null && local_name == null) { 
        if(googleTockenId != null & name != null && email != null && Image != null   ) {
        	localStorage.setItem("googleTockenId", googleTockenId);
        	localStorage.setItem("name", name);
        	localStorage.setItem("email", email);
        	localStorage.setItem("Image", Image);
        	window.location.href="/chatroom";
        }
    }    
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () { 
        localStorage.removeItem("googleTockenId");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("Image");  
        localStorage.removeItem("page_reload");  
        alert("Logout Successfully")
        location.reload(true);               
    });
    
    auth2.disconnect();
}

