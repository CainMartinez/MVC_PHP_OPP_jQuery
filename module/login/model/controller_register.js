function buttonRegister() {
    $('#register').on('click', function(e) {
        e.preventDefault();
        userRegister();
    });
}
function validateRegister() {
    console.log("validateRegister");
    var usernamePattern = /^[a-zA-Z0-9]{6,}$/;
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
        ajaxPromise("module/login/controller/controller_login.php?op=register", 'POST', 'JSON', formData)
        .then(function(data) {  
            data == "error_mail" ? $('#errorMail').html('<br>The email entered is already in use.') : undefined;
            data == "error_username" ? $('#errorUsername').html('<br>The username entered is not available.') : undefined;
            data == "ok_insert" ? (toastr.success("Registration successful"), setTimeout($('#selecForm').text('Register'), $('#form_register').hide(), $('#form_login').show() ,1000)) : undefined;
        }).catch(function(e) {
            console.error(e);
        });
    }
}

$(document).ready(function (){
    buttonRegister();
});