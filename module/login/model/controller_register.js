function buttonRegister() {
    $("#register").keydown(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            userRegister();
        }
    });
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        userRegister();
    });
}

function validateRegister() {
    console.log("validateRegister");
    var usernamePattern = /^[a-zA-Z0-9]{8,}$/;
    var emailPattern = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var passwordPattern = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    var error = false;

    if($('#usernameRegister').val().length === 0) {
        console.log("usernameRegister");
        $('#errorUsername').html('<br>Add a username, please.');
        error = true;
    } else {
        if($('#usernameRegister').val().length < 8) {
            console.log("usernameRegister < 8");
            $('#errorUsername').html('<br>The user must have at least 8 characters.');
            error = true;
        } else {
            if(!usernamePattern.test($('#usernameRegister').val())) {
                console.log("usernameRegister pattern");
                $('#errorUsername').html('<br>Invalid username format. Example: user1234');
                error = true;
            }else{
                console.log("usernameRegister ok");
                $('#errorUsername').html('');
            }
        }
    }
    if($('#emailRegister').val().length === 0) {
        $('#errorMail').html('<br>Write your email, please.');
        error = true;
    } else {
        if(!emailPattern.test($('#emailRegister').val())) {
            $('#errorMail').html('<br>Invalid email format. Example: email@email.com');
            error = true;
        } else {
            $('#errorMail').html('');
        }
    }
    $('#errorRepeatPassword').html('<br>');
    if($('#passwordRegister').val().length === 0) {
        $('#errorPassword').html('<br>Write your password, please.');
        error = true;
    } else {
        if($('#passwordRegister').val().length < 8) {
            $('#errorPassword').html('<br>The password must have at least 8 characters.');
            error = true;
        } else {
            if ($('#passwordRegister').val() != $('#passwordRepeatRegister').val()) { 
                $('#errorRepeatPassword').html('<br>Passwords do not match, please try again.');
                error = true;
            }else { 
                $('#errorRepeatPassword').html('<br>');
                if(!passwordPattern.test($('#passwordRegister').val())) {
                    $('#errorPassword').html('<br>Invalid password format. Example: Password1!');
                    error = true;
                }else{
                    $('#errorPassword').html('');
                }
            }
        }
    }
    return error == true ? true : false; 
}

function userRegister() {
    
    validateRegister() == false ? promiseRegister() : undefined;

    function promiseRegister() {
        let formData = $('#registerForm').serialize();
        console.log("click register");
        console.log(formData);
        ajaxPromise('POST','JSON','module/login/controller/controller_login.php?op=register', formData)
        .then(function(data) {  
            if (data === true) {
                Swal.fire({
                    title: "WELCOME to Living Mobility!",
                    text: "Registration successful",
                    icon: "success",
                    timer: 10000, 
                    buttons: false
                }).then(() => {
                    window.location.href = "index.php?page=login";
                });
            } else {
                Swal.fire({
                    title: "Register Error!",
                    text: "Username or email already in use. Try again!",
                    icon: "error",
                    timer: 10000, 
                    buttons: false  
                });
            }
        }).catch(function(e) {
            console.error(e);
        });
    }
}

$(document).ready(function (){
    buttonRegister();
});