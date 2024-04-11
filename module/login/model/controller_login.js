function key_login() {
    $("#login").keydown(function(e) {
        e.which == 13 ? ( e.preventDefault(), login() ) : undefined;
    });
}

function button_login() {
    $('#login').on('click', function(e) {
        e.preventDefault();
        login();
    });
}

function validate_login() {
    var error = false;

    if($('#usernameLogin').val().length === 0) {
        $('#errorUsernameLogin').html('<br>Enter your username.');
        error = true;
    } else {
        if($('#usernameLogin').val().length < 8) {
            $('#errorUsernameLogin').html('<br>The user name has at least 8 characters.');
            error = true;
        } else {
            $('#errorUsernameLogin').html('');
        }
    }

    if($('#passwordLogin').val().length === 0) {
        $('#errorPasswordLogin').html('<br>Enter the password.');
        error = true;
    } else {
            $('#errorPasswordLogin').html('');
    }

    return error == true ? true : false;
}

function login() {
    validate_login() == false ? promiseLogin() : undefined;
    function promiseLogin() {
        let data = $('#loginForm').serialize();
        // console.log(data);
        ajaxPromise('POST', 'JSON','module/login/ctrl/ctrl_login.php?op=login',  data)
        .then(function (data) {
            // console.log(data['token_large']);
            // console.log(data['token_refresh']);
            let error = false;
            data == "error_username" ? ( $('#errorUsernameLogin').html('<br>The user name entered does not exist.'), error = true) : undefined;
            data == "error_password" ? ( $('#errorPasswordLogin').html('<br>Erroneous data, check username and password.'), error = true) : undefined;
            error == false ? ( localStorage.setItem("token", data['token_large']), localStorage.setItem("token_refresh", data['token_refresh']), toastr.success("Welcome back"), setTimeout(' window.location.href = "index.php?page=shop"; ', 1000) ) : undefined;
        }).catch(function() {
            console.log("error ajaxForSearch Login");
        });
    }
}

$(document).ready(function (){
    key_login();
    button_login();
});