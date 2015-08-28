window.fbAsyncInit = function() {
    FB.init({
        appId: '1631783280430676', // App ID
        channelUrl: 'https://preview.c9.io/',
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true // parse XFBML
    });
};

(function(d) {
    var js, id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

function Login() {

    FB.login(function(response) {
        if (response.authResponse) {
            /*getUserInfo()*/
            PostMessage()

        } else {
            console.log('Authorization failed.');
        }
    }, {
        scope: 'publish_actions'
    });
}
/*function getUserInfo() {
   FB.api('/me', function(response) {
					
    //response.name       - User Full name
    //response.link       - User Facebook URL
    //response.username   - User name
    //response.id         - id
    //response.email      - User email
					
    });
}*/
FB.Event.subscribe('auth.authResponseChange', function(response) {
    if (response.status === 'connected') {
        //SUCCESS
    } else if (response.status === 'not_authorized') {
        //FAILED
    } else {
        //UNKNOWN ERROR. Logged Out
    }
});

function Logout() {
    FB.logout(function() {
        document.location.reload();
    });

}

function PostMessage() {
    var fbMessage = document.getElementById("messageToPost").value;
    FB.api('/me/feed', 'post', {
        message: fbMessage
    });
    document.getElementById("messageToPost").value = null;
}