function buttonLogin() {
    $("#login").keydown(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            login();
        }
    });
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        login();
    });
}

function validate_login() {
    // console.log("validate_login");
    var error = false;

    if($('#usernameLogin').val().length === 0) {
        $('#errorUsernameLogin').html('<br>Enter your username, please.');
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
        $('#errorPasswordLogin').html('<br>Enter your password, please.');
        error = true;
    } else {
            $('#errorPasswordLogin').html('');
    }

    return error == true ? true : false;
}

function login() {
    // console.log("login");
    validate_login() == false ? promiseLogin() : undefined;
    function promiseLogin() {
        let dataForm = $('#loginForm').serialize();
        console.log(dataForm);
        ajaxPromise('POST', 'JSON','module/login/ctrl/ctrl_login.php?op=login', dataForm)
        .then(function (data) {
            // console.log(data);
            // console.log(data['token_large']);
            // console.log(data['token_refresh']);
            let error = false;
            data == "error_user" ? ( $('#errorUsernameLogin').html('<br>The user name entered does not exist.'), error = true) : undefined;
            data == "error_password" ? ( $('#errorPasswordLogin').html('<br>Erroneous data, check username and password.'), error = true) : undefined;
            error == false ? ( localStorage.setItem("token", data['token_large']), localStorage.setItem("token_refresh", data['token_refresh']), toastr.success("Welcome back"), setTimeout(' window.location.href = "index.php?page=shop"; ', 1000) ) : undefined;
        }).catch(function() {
            console.log("error ajaxForSearch Login");
        });
    }
}

$(document).ready(function (){
    buttonLogin();
});