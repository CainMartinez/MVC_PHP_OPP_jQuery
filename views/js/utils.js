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
        ajaxPromise('POST', 'JSON','module/login/controller/controller_login.php?op=data_user', { 'token': token })
            .then(function(data) {
            console.log("Client logged");
            // Ocultar los botones de registro y login
            $('a[href="index.php?page=register"]').hide();
            $('a[href="index.php?page=login"]').hide();
            // Agregar el nombre de usuario, la imagen y el botón de logout al menú
            $('.rd-navbar-nav').append(
                '<li class="rd-nav-item">' +
                    '<img src="' + data.avatar + '" alt="User Avatar" class="img-thumbnail">' +
                    '<span class="username">' + data.username + '</span>' +
                    '<a id="logout" class="btn btn-danger">Logout</a>' +
                '</li>'
            );
            }).catch(function(e) {
                console.error(e);
            });
    } else {
        console.log("No token available");
        $('.opc_CRUD').empty();
        $('.opc_exceptions').empty();
        $('#user_info').hide();
        $('.log-icon').empty();
        $('<a href="index.php?page=register"><i id="col-ico" class="fa-solid fa-user fa-2xl"></i></a>').appendTo('.log-icon');
    }
}
//================CLICK-LOGIUT================
function click_logout() {
    $(document).on('click', '#logout', function() {
        localStorage.removeItem('total_prod');
        toastr.success("Logout succesfully");
        setTimeout('logout(); ', 1000);
    });
}
//================LOG-OUT================
function logout() {
    ajaxPromise('POST', 'JSON','module/login/controller/controller_login.php?op=logout')
        .then(function(data) {
            localStorage.removeItem('token');
            window.location.href = "index.php?page=homepage";
        }).catch(function() {
            console.log('Something has occured');
        });
}
// Remove localstorage('page') with click in shop
function click_shop() {
    $(document).on('click', '#opc_shop', function() {
        localStorage.removeItem('page');
        localStorage.removeItem('total_prod');
    });
}
$(document).ready(function() {
    load_menu();
    click_logout();
    click_shop();
});