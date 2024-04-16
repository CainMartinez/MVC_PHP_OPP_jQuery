function ajaxPromise(sType, sTData, sUrl, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
};
function load_menu() {
    var token = localStorage.getItem('token');
    if (token) {
        console.log(token);
        ajaxPromise('POST', 'JSON','module/login/controller/controller_login.php?op=data_user', { 'token': token })
            .then(function(data) {
            console.log("Client logged");
            // Ocultar los botones de registro y login
            $('#register_button').hide();
            $('#login_button').hide();
            // Agregar el nombre de usuario, la imagen y el botón de logout al menú
            $('.rd-navbar-nav').append(
                '<li id="login_ok" class="rd-nav-item">' +
                    '<img src="' + data.avatar + '" alt="User Avatar" class="img-thumbnail" style="width:50px; height:50px;">&nbsp;&nbsp;&nbsp;' + 
                    '<span class="username btn btn-info">' + data.username + '</span>&nbsp;&nbsp;&nbsp;' + 
                    '<a id="logout" class="btn btn-warning ml-auto">Logout</a>'+
                '</li>'
            );
            }).catch(function(e) {
                console.error(e);
            });
    } else {
        console.log("No token available");
        $('#login_ok').empty();
        $('#register_button').show();
        $('#login_button').show();
    }
}
function click_logout() {
    $(document).on('click', '#logout', function() {
        localStorage.removeItem('total_prod');
        Swal.fire({
            icon: 'success',
            title: 'Logout successfully',
            text: "Come back soon!",
            showConfirmButton: true,
            confirmButtonText: 'OK',
            timer: 3000
        }).then(() => {
            logout();
        })
    });
}
function logout() {
    ajaxPromise('POST', 'JSON','module/login/controller/controller_login.php?op=logout')
        .then(function(data) {
            localStorage.removeItem('token');
            window.location.href = "index.php?page=homepage";
        }).catch(function(d) {
            console.log(d);
        });
}
function protecturl() {
    var token = localStorage.getItem('token');
    ajaxPromise('POST', 'JSON','module/login/controller/controller_login.php?op=controluser', { 'token': token })
        .then(function(data) {
            if (data == "Correct_User") {
                console.log("CORRECT! The user coincides with the session.");
            } else if (data == "Wrong_User") {
                console.log("INCORRECT! You are trying to access an account.");
                checkToken();
            }
        })
        .catch(function() { console.log("ANONYMOUS_user") });
}

function checkToken() {
    var token = localStorage.getItem('token');
    ajaxPromise('POST', 'JSON','module/login/controller/controller_login.php?op=check_token', { 'token': token })
        .then(function(data) {
            if (data == "Token_Expired") {
                console.log("Token has expired.");
                logout_auto();
            } else {
                console.log("Token is valid.");
            }
        })
        .catch(function() { console.log("Error checking token") });
}
function control_activity() {
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise('POST', 'JSON','module/login/controller/controller_login.php?op=activity')
            .then(function(response) {
                if (response == "inactivo") {
                    console.log("usuario INACTIVO");
                    logout_auto();
                } else {
                    console.log("usuario ACTIVO")
                }
            });
    } else {
        console.log("No hay usario logeado");
    }
}
function refresh_token() {
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise('POST', 'JSON','module/login/controller/controller_login.php?op=refresh_token', { 'token': token })
            .then(function(data_token) {
                console.log("Refresh token correctly");
                localStorage.setItem("token", data_token);
                load_menu();
            });
    }
}
function refresh_cookie() {
    ajaxPromise('POST', 'JSON','module/login/controller/controller_login.php?op=refresh_cookie')
        .then(function(response) {
            console.log("Refresh cookie correctly");
        });
}
function logout_auto() {
    localStorage.removeItem('token');
    Swal.fire({
        icon: 'warning',
        title: 'Account closed for security reasons!',
        showConfirmButton: true,
        confirmButtonText: 'Log in again.',
        timer: 3000
    }).then(() => {
        window.location.href = "index.php?page=login";
    });;
}
$(document).ready(function() {
    load_menu();
    click_logout();
    setInterval(function() { control_activity() }, 6000); //1min = 60000ms
    protecturl();
    setInterval(function() { refresh_token() }, 600000);
    setInterval(function() { refresh_cookie() }, 600000);
});