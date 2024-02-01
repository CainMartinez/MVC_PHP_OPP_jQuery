function loadProperties(total_prod = 0, items_page = 4) {
    ajaxForSearch('module/shop/controller/controller_shop.php?op=all_properties', total_prod, items_page);
}

function ajaxForSearch(url, total_prod = 0, items_page) {
    ajaxPromise('POST', 'JSON', url,{ 'total_prod': total_prod, 'items_page': items_page })
        .then(function(data) {
            // console.log(data);
            $('#content_shop_cars').empty();
            $('.date_car' && '.date_img').empty();

            //Mejora para que cuando no hayan resultados en los filtros aplicados
            if (data == "error") {
                $('<div></div>').appendTo('#content_shop_cars')
                    .html(
                        '<h3>¡No se encuentarn resultados con los filtros aplicados!</h3>'
                    )
            } else {
                for (row in data) {
                    $('<div></div>').attr({ 'id': data[row].id_property, 'class': 'list_content_shop' }).appendTo('#content_shop_cars')
                        .html(`
                            <div class='list_product'>
                                <div class='img-container'>
                                    <img src= '${data[row].image_path}'</img>
                                </div>
                                <div class='product-info'>
                                    <div class='product-content'>
                                        <h1>
                                            <b>${data[row].id_brand} ${data[row].name_property}
                                                <a class='list__heart' id='${data[row].id_property}'>
                                                    <i id= ${data[row].id_property} class='fa-solid fa-heart fa-lg'></i>
                                                </a>
                                            </b>
                                        </h1>
                                        <p>Up-to-date maintenance and revisions</p>
                                        <ul>
                                            <li> <i id='col-ico' class='fa-solid fa-road fa-xl'></i>&nbsp;&nbsp;${data[row].extras}</li>
                                            <li> <i id='col-ico' class='fa-solid fa-person fa-xl'></i>&nbsp;&nbsp;&nbsp;${data[row].categories}</li>
                                            <li> <i id='col-ico' class='fa-solid fa-palette fa-xl'></i>&nbsp;${data[row].types}</li>
                                        </ul> 
                                        <div class='buttons'>
                                            <button id='${data[row].id_property}' class='more_info_list button add'>More Info</button>
                                            <button class='button buy'>Buy</button> 
                                            <span class='button' id='price'>${data[row].price} $</span> 
                                        </div> 
                                    </div>
                                </div> 
                            </div>`
                        )
                }
            }
        }).catch(function(error) {
            system.error(error);
            // window.location.href = "index.php?pages=503";
        });
}

function clicks() {
    $(document).on("click", ".more_info_list", function() {
        var id_property = this.getAttribute('id');
        loadDetails(id_property);
    });
}

function loadDetails(id_property) {
    ajaxPromise('GET', 'JSON','module/shop/controller/controller_shop.php?op=details_property&id=' + id_property)
    .then(function(data) {
        $('#content_shop_cars').empty();
        $('.date_img_dentro').empty();
        $('.date_car_dentro').empty();

        for (row in data[1][0]) {
            $('<div></div>').attr({ 'id': data[1][0].id_images, class: 'date_img_dentro' }).appendTo('.date_img')
                .html(
                    "<div class='content-img-details'>" +
                    "<img src= '" + data[1][0][row].path_images + "'" + "</img>" +
                    "</div>"
                )
        }

        $('<div></div>').attr({ 'id': data[0].id_property, class: 'date_car_dentro' }).appendTo('.date_car')
            .html(
                "<div class='list_product_details'>" +
                "<div class='product-info_details'>" +
                "<div class='product-content_details'>" +
                "<h1><b>" + data[0].description + " " + data[0].cadastral_reference + "</b></h1>" +
                "<hr class=hr-shop>" +
                "<table id='table-shop'> <tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-road fa-2xl'></i> &nbsp;" + data[0].square_meters + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp;" + data[0].number_of_rooms + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-car fa-2xl'></i> &nbsp;" + data[0].categories + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp;" + data[0].types + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-gas-pump fa-2xl'></i> &nbsp;" + data[0].operations + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp;" + data[0].extras + "</td>  </tr>" +
                "<td> <i class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;" + data[0].name_city + "</td> </tr>" +
                "</table>" +
                "<hr class=hr-shop>" +
                "<h3><b>" + "More Information:" + "</b></h3>" +
                "<p>This vehicle has a 2-year warranty and reviews during the first 6 months from its acquisition.</p>" +
                "<div class='buttons_details'>" +
                "<a class='button add' href='#'>Add to Cart</a>" +
                "<a class='button buy' href='#'>Buy</a>" +
                "<span class='button' id='price_details'>" + data[0].price + "<i class='fa-solid fa-euro-sign'></i> </span>" +
                "<a class='details__heart' id='" + data[0].id_property + "'><i id=" + data[0].id_property + " class='fa-solid fa-heart fa-lg'></i></a>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            )

        $('.date_img').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 1500
        });
    }).catch(function(error) {
        system.error(error);

        // window.location.href = "index.php?pages=503;
    });
}

$(document).ready(function() {
    loadProperties();
    clicks();
});
