function carousel_type() {
    ajaxPromise('GET', 'JSON','module/home/controller/controller_home.php?op=Carrousel_Type')
    .then(function(data) {
            for (row in data) {
                $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].name_type).appendTo(".carousel__list")
                .html(
                    "<img class='carousel__img' id='' src='" + data[row].image_type + "' alt='' >"
                )
            }
            new Glider(document.querySelector('.carousel__list'), {
                slidesToShow: 3,
                dots: '.carousel__indicator',
                draggable: true,
                arrows: {
                    prev: '.carousel__prev',
                    next: '.carousel__next'
                }
            });
        })
        .catch(function() {
            window.location.href = "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Carrusel_Type HOME";
        });
}

function loadCategories() {
    ajaxPromise('GET', 'JSON','module/home/controller/controller_home.php?op=Category')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', "div_cate").attr({ 'id': data[row].name_category }).appendTo('#containerCategories')
                .html(
                    "<li class='portfolio-item'>" +
                    "<div class='item-main'>" +
                    "<div class='portfolio-image'>" +
                    "<img src = " + data[row].image_category + " alt='foto' </img> " +
                    "</div>" +
                    "<h5>" + data[row].name_category + "</h5>" +
                    "</div>" +
                    "</li>"
                )
        }
    }).catch(function() {
        window.location.href = "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Categories HOME";
    });
}

function loadOperation() {
    ajaxPromise('GET', 'JSON','module/home/controller/controller_home.php?op=Operation')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', "div_operation").attr({ 'id': data[row].name_operation }).appendTo('#containerOperation')
                .html(
                    "<li class='portfolio-item2'>" +
                    "<div class='item-main2'>" +
                    "<div class='portfolio-image2'>" +
                    "<img src = " + data[row].image_operation + " alt='foto'" +
                    "</div>" +
                    "<h5>" + data[row].name_operation + "</h5>" +
                    "</div>" +
                    "</li>"
                )

        }
    }).catch(function() {
        window.location.href = "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Operation HOME";
    });
}
function loadCity() {
    ajaxPromise('GET', 'JSON','module/home/controller/controller_home.php?op=City')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', "div_city").attr({ 'id': data[row].name_city }).appendTo('#containerCity')
                .html(
                    "<li class='portfolio-item3'>" +
                    "<div class='item-main3'>" +
                    "<div class='portfolio-image3'>" +
                    "<img src = " + data[row].image_city + " alt='foto'" +
                    "</div>" +
                    "<h5>" + data[row].name_city + "</h5>" +
                    "</div>" +
                    "</li>"
                )

        }
    }).catch(function() {
        window.location.href = "index.php?module=ctrl_exceptions&page=503&type=503&lugar=City HOME";
    });
}

$(document).ready(function() {
    carousel_type();
    loadCategories();
    loadOperation();
    loadCity();
});