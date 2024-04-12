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
        ajaxPromise('POST', 'JSON','module/login/controller/controller_login.php?op=login', dataForm)
        .then(function (data) {
            data == "error_user" ? ( $('#errorUsernameLogin').html('<br>The user name entered does not exist.'), error = true) : undefined;
            data == "error_password" ? ( $('#errorPasswordLogin').html('<br>Data error, check username and password.'), error = true) : undefined;
            if (data != "error_user" && data != "error_password" && data != "error") {
                localStorage.setItem("token", data);
                Swal.fire({
                    title: "Welcome back!",
                    text: "Login Successful!",
                    icon: "success",
                    timer: 10000, 
                    buttons: false
                }).then(() => {
                    window.location.href = "index.php?page=homepage";
                })
            }
        }).catch(function(e) {
            console.error(e);
        });
    }
}

$(document).ready(function (){
    buttonLogin();
});