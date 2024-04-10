// function key_login() {
//     $("#login").keydown(function(e) {
//         e.which == 13 ? ( e.preventDefault(), login() ) : undefined;
//     });
// }

// function button_login() {
//     $('#login').on('click', function(e) {
//         e.preventDefault();
//         login();
//     });
// }

// function validate_login() {
//     var error = false;

//     if($('#usernameLogin').val().length === 0) {
//         $('#errorUsernameLogin').html('<br>Introduce tu nombre de usuario');
//         error = true;
//     } else {
//         if($('#usernameLogin').val().length < 6) {
//             $('#errorUsernameLogin').html('<br>El nombre de usuario tiene como mínimo 6 caracteres');
//             error = true;
//         } else {
//             $('#errorUsernameLogin').html('');
//         }
//     }

//     if($('#passwordLogin').val().length === 0) {
//         $('#errorPasswordLogin').html('<br>Introduce la contraseña');
//         error = true;
//     } else {
//             $('#errorPasswordLogin').html('');
//     }

//     return error == true ? true : false;
// }

// function login() {
//     validate_login() == false ? promiseLogin() : undefined;
//     function promiseLogin() {
//         let data = $('#loginForm').serialize();
//         // console.log(data);
//         ajaxPromise("module/login/ctrl/ctrl_login.php?op=login", 'POST', 'JSON', data)
//         .then(function (data) {
//             // console.log(data['token_large']);
//             // console.log(data['token_refresh']);
//             let error = false;
//             data == "error_username" ? ( $('#errorUsernameLogin').html('<br>El nombre de usuario introducido no existe'), error = true) : undefined;
//             data == "error_password" ? ( $('#errorPasswordLogin').html('<br>Datos erroneos, revisa el nombre de usuario y la contraseña'), error = true) : undefined;
//             error == false ? ( localStorage.setItem("token", data['token_large']), localStorage.setItem("token_refresh", data['token_refresh']), toastr.success("Bienvenido de nuevo"), setTimeout(' window.location.href = "index.php?page=ctrl_shop&op=list"; ', 1000) ) : undefined;
//         }).catch(function() {
//             console.log("error ajaxForSearch Login");
//         });
//     }
// }

// $(document).ready(function (){
//     key_login();
//     button_login();
// });