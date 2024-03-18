function loadProperties() {
    var filters_home = localStorage.getItem('filters_home') || false;
    let details_home = localStorage.getItem('details_home') || false;
    let filters_search = localStorage.getItem('filters_search') || false;
    let filters_shop = localStorage.getItem('filters_shop') || false;

    if (filters_home !== false) {
        // console.log('Envio en la URL op=home_filter');
        ajaxForSearch('module/shop/controller/controller_shop.php?op=home_filter');
        // localStorage.removeItem('filters_home');
    } else if (details_home !== false) {
        loadDetails(details_home);
        localStorage.removeItem('details_home');
    } else if (filters_search !== false) {
        // if para el filtro de la barra de busqueda
        ajaxForSearch_filter('module/shop/controller/controller_shop.php?op=search_filter');
        localStorage.removeItem('filters_search');
    } else if (filters_shop !== false) {
        // console.log('Envio en la URL op=filters_shop');
        ajaxForSearch_Shop("module/shop/controller/controller_shop.php?op=filters_shop",highlight_shop);
        // localStorage.removeItem('filters_shop');
    } else {
        ajaxForSearch('module/shop/controller/controller_shop.php?op=all_properties');
    }
}
function ajaxForSearch_filter(url) {
    var filters_search_array = JSON.parse(localStorage.getItem('filters_search'));
    var filters_search = {};

    filters_search_array.forEach(function(filter) {
        for (var key in filter) {
            filters_search[key] = filter[key][0];
        }
    });
    // console.log(filters_search);
    ajaxPromise('POST', 'JSON', url, { 'filters_search': filters_search })
        .then(function (data) {
            $('#properties_shop_details').empty();
            $('#images_properties').empty();
            $('#maps_details').hide();

            if (data == "error") {
                $('<div></div>').appendTo('#properties_shop')
                    .html(
                        '<h3>¡No results are found with the applied filters!</h3>'
                    )
            } else {
                for (let row in data) {
                    let property = data[row];

                    let propertyDiv = $('<div></div>').attr({ 'class': 'col-md-6 wow-outer carrousel_list' }).appendTo('#properties_shop');
                    let owlCarouselDiv = $('<div></div>').addClass('owl-carousel owl-theme carrousel_details').appendTo(propertyDiv);

                    for (let image of property.images) {
                        $("<div></div>").addClass("item").appendTo(owlCarouselDiv).html(
                            "<article class='thumbnail-light'>" +
                            "<a class='thumbnail-light-media' href='#'><img class='thumbnail-light-image' src='" +
                            image.path_images +
                            "' alt='Image " + (parseInt(row) + 1) + "' width='100%' heiht='100%'/></a>" +
                            "</article>"
                        );
                    }

                    owlCarouselDiv.owlCarousel({
                        loop: true,
                        margin: 100,
                        nav: true,
                        responsive: {
                            0: {
                                items: 1
                            },
                        }
                    });

                    propertyDiv.append(`
                            <article class='post-modern wow slideInLeft '><br>
                                <h4 class='post-modern-title'>
                                    <a class='post-modern-title' href='#'>${property.property_name}</a>
                                </h4>
                                <ul class='post-modern-meta'>
                                    <li><a class='button-winona' href='#'>${property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €</a></li>
                                    <li>City: ${property.name_city}</li>
                                    <li>Square meters: ${property.square_meters}</li>
                                </ul>
                                <p>${property.description}</p><br>
                                <div class='buttons'>
                                    <table id='table-shop'> 
                                        <tr>
                                            <td>
                                                <button id='${property.id_property}' class='more_info_list button button-primary button-winona button-md'>More Info</button><br>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </article>
                        `)
                }
                load_map(data);
            }
        }).catch(function (error) {
            console.error(error);
            // window.location.href = "index.php?page=503";
        });


}
function ajaxForSearch(url) {

    var filters_home = JSON.parse(localStorage.getItem('filters_home'));
    // console.log(filters_home);
    localStorage.removeItem('filters_home');
    ajaxPromise('POST', 'JSON', url, { 'filters_home': filters_home })
        .then(function (data) {
            // console.log(data);
            // console.log('entra en el then HOME_FILTER');
            $('#maps_details').empty();
            $('#images_properties').empty();
            $('#maps_details').hide();
            $('#properties_shop_details').empty();
            
            if (data == "error") {
                $('<div></div>').appendTo('#properties_shop')
                    .html(
                        '<h3>¡No results are found with the applied filters!</h3>'
                    )
            } else {
                for (let row in data) {
                    let property = data[row];
                    // console.log(property.images);
                    // $('<div></div>').addClass('row-lg-50 row-35 offset-top-2').attr('id', 'properties_shop').appendTo('#div_list'); 
                    let propertyDiv = $('<div></div>').attr({ 'class': 'col-md-6 wow-outer carrousel_list' }).appendTo('#properties_shop');
                    let owlCarouselDiv = $('<div></div>').addClass('owl-carousel owl-theme carrousel_details').appendTo(propertyDiv);

                    for (let image of property.images) {
                        $("<div></div>").addClass("item").appendTo(owlCarouselDiv).html(
                            "<article class='thumbnail-light'>" +
                            "<a class='thumbnail-light-media' href='#'><img class='thumbnail-light-image' src='" +
                            image.path_images +
                            "' alt='Image " + (parseInt(row) + 1) + "' width='100%' heiht='100%'/></a>" +
                            "</article>"
                        );
                    }

                    owlCarouselDiv.owlCarousel({
                        loop: true,
                        margin: 100,
                        nav: true,
                        responsive: {
                            0: {
                                items: 1
                            },
                        }
                    });

                    propertyDiv.append(`
                            <article class='post-modern wow slideInLeft '><br>
                                <h4 class='post-modern-title'>
                                    <a class='post-modern-title' href='#'>${property.property_name}</a>
                                </h4>
                                <ul class='post-modern-meta'>
                                    <li><a class='button-winona' href='#'>${property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €</a></li>
                                    <li>City: ${property.name_city}</li>
                                    <li>Square meters: ${property.square_meters}</li>
                                </ul>
                                <p>${property.description}</p><br>
                                <div class='buttons'>
                                    <table id='table-shop'> 
                                        <tr>
                                            <td>
                                                <button id='${property.id_property}' class='more_info_list button button-primary button-winona button-md'>More Info</button><br>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </article>
                        `)
                }
                
                load_map(data);
            }
        }).catch(function (error) {
            console.error(error);
            // window.location.href = "index.php?page=503";
        });

        
}
function load_map_details(data) {

    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'maps_details',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [data[0].longitude, data[0].latitude],
        zoom: 15
    });

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        "<div class='popup' id='"+ data[0].id_property +"'>"+
                "<img class='popup_img' src='" + data[0].path_images +"'>" +
                "<div class='popup_desc_property'><h4><i class='fas fa-home'></i>"+ data[0].property_name + "</h4>"+
                        "<p><i class='fas fa-bed'></i> "+ data[0].number_of_rooms + " rooms <br><i class='fas fa-ruler-combined'></i> " + data[0].square_meters + " Square meters</p>"+
                        "<b><i class='fas fa-info-circle'></i> "+ data[0].description +"<br><i class='fas fa-city'></i> "+ data[0].name_city + "</b><h5><i class='fas fa-euro-sign'></i> " +  data[0].price + " €</h5>"+
                    "</div>"+
                "</div>"
    );

    const marker1 = new mapboxgl.Marker({ color: 'red'})
    .setLngLat([data[0].longitude, data[0].latitude])
    .setPopup(popup)
    .addTo(map);
}

function load_map(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'maps',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.5, 38.9],
        zoom: 8.9
    });

    for (row in data) {
    
        const popup = new mapboxgl.Popup({offset: 25}).setHTML(
            "<div class='popup' id='"+ data[row].id_property +"'>"+
                "<img class='popup_img' src='" + data[row].path_images +"'>" +
                "<div class='popup_desc_property'><h4><i class='fas fa-home'></i>"+ data[row].property_name + "</h4>"+
                        "<p><i class='fas fa-bed'></i> "+ data[row].number_of_rooms + " rooms <br><i class='fas fa-ruler-combined'></i> " + data[row].square_meters + " Square meters</p>"+
                        "<b><i class='fas fa-info-circle'></i> "+ data[row].description +"<br><i class='fas fa-city'></i> "+ data[row].name_city + "</b><h5><i class='fas fa-euro-sign'></i> " +  data[row].price + " €" + "</h5>"+
                    "</div>"+
                "</div>"
        );

        const marker = new mapboxgl.Marker({color: 'red'})
        .setLngLat([data[row].longitude, data[row].latitude])
        .setPopup(popup)
        .addTo(map);
    }
}
function ajaxForSearch_Shop(url, highlight) {

    var filters_shop = JSON.parse(localStorage.getItem('filters_shop'));
    // console.log('entra en el ajaxForSearch_Shop');
    // console.log(filters_shop);
    ajaxPromise('POST', 'JSON', url, { filters_shop })
        .then(function (data) {
            // console.log(data);
            // console.log('entra en el then HOME_FILTER');
            $('#properties_shop_details').empty();
            $('#images_properties').empty();
            $('#maps_details').hide();

            if (data == "error") {
                $('<div></div>').appendTo('#properties_shop')
                    .html(
                        '<h3>¡No results are found with the applied filters!</h3>'
                    )
            } else {
                for (let row in data) {
                    let property = data[row];
                    // console.log(property.images);

                    let propertyDiv = $('<div></div>').attr({ 'class': 'col-md-6 wow-outer carrousel_list' }).appendTo('#properties_shop');
                    let owlCarouselDiv = $('<div></div>').addClass('owl-carousel owl-theme carrousel_details').appendTo(propertyDiv);

                    for (let image of property.images) {
                        $("<div></div>").addClass("item").appendTo(owlCarouselDiv).html(
                            "<article class='thumbnail-light'>" +
                            "<a class='thumbnail-light-media' href='#'><img class='thumbnail-light-image' src='" +
                            image.path_images +
                            "' alt='Image " + (parseInt(row) + 1) + "' width='100%' heiht='100%'/></a>" +
                            "</article>"
                        );
                    }

                    owlCarouselDiv.owlCarousel({
                        loop: true,
                        margin: 100,
                        nav: true,
                        responsive: {
                            0: {
                                items: 1
                            },
                        }
                    });

                    propertyDiv.append(`
                            <article class='post-modern wow slideInLeft '><br>
                                <h4 class='post-modern-title'>
                                    <a class='post-modern-title' href='#'>${property.property_name}</a>
                                </h4>
                                <ul class='post-modern-meta'>
                                    <li><a class='button-winona' href='#'>${property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €</a></li>
                                    <li>City: ${property.name_city}</li>
                                    <li>Square meters: ${property.square_meters}</li>
                                </ul>
                                <p>${property.description}</p><br>
                                <div class='buttons'>
                                    <table id='table-shop'> 
                                        <tr>
                                            <td>
                                                <button id='${property.id_property}' class='more_info_list button button-primary button-winona button-md'>More Info</button><br>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </article>
                        `)
                }
                load_map(data);
            }
            if (highlight) {
                highlight();
            }
        }).catch(function (error) {
            console.error(error);
            // window.location.href = "index.php?page=503";
        });
}
function clicks_shop() {
    $(document).on("click", ".more_info_list", function () {
        var id_property = this.getAttribute('id');
        loadDetails(id_property);
    });
}
function loadDetails(id_property) {
    ajaxPromise('GET', 'JSON', 'module/shop/controller/controller_shop.php?op=details_property&id=' + id_property)
        .then(function (data) {
        
            // $('#properties_shop').empty();
            // $('#images_properties').empty();
            $('#map-container').empty();
            $('#div_list').empty();
            $('#maps_details').show();
            // console.log(data);
            // console.log(data[0].type_concat);
            var type = data[0].type_concat;
            var operation = data[0].operation_concat;
            var category = data[0].category_concat;
            var extras = data[0].extras_concat;
            $('<h2></h2>').addClass('post-modern-title').text(data[0].property_name).appendTo('#properties_shop_details');
            $('<hr>').appendTo('#images_properties');

            var rowDiv = $('<div></div>').addClass('row row-35 row-xxl-70 offset-top-2').appendTo('#images_properties');
            var propertyDetailsDiv = $('<div></div>').addClass('property-details').appendTo(rowDiv);
            var owlCarouselDiv = $('<div></div>').addClass('owl-carousel owl-theme carrousel_details').appendTo('#properties_shop_details');
            for (row in data[1][0]) {
                var itemDiv = $("<div></div>").addClass("item").appendTo(owlCarouselDiv);
                var articleContent = "<article class='thumbnail-light'>" +
                    "<a class='thumbnail-light-media' href='#'><img class='thumbnail-light-image' src='" +
                    data[1][0][row].path_images +
                    "' alt='Image " + (parseInt(row) + 1) + "' width='270' height='300' /></a>" +
                    "<h4 class='thumbnail-light-title title-category'><a href='#'>" +
                    "Image " + (parseInt(row) + 1) +
                    "</a></h4>" +
                    "</article>";
                itemDiv.append(articleContent);
            }
            owlCarouselDiv.owlCarousel({
                loop: true,
                margin: 100,
                nav: true,
                responsive: {
                    0: {
                        items: 1
                    },
                }
            });
            var table = $("<table></table>");
            var row1 = $("<tr></tr>").appendTo(table);
            $('<td></td>').addClass('property-type').css('text-align', 'left').html('<i class="fas fa-home" style="font-size: 1.25em;"></i> <span style="font-size: 1.25em;">Type: ' + type + '</span><hr>').appendTo(row1);
            $('<td></td>').appendTo(row1);
            $('<td></td>').addClass('property-category').css('text-align', 'left').html('<i class="fas fa-tags" style="font-size: 1.25em;"></i> <span style="font-size: 1.25em;">Category: ' + category + '</span><hr>').appendTo(row1);

            var row2 = $("<tr></tr>").appendTo(table);
            $('<td></td>').addClass('property-extras').css('text-align', 'left').html('<i class="fas fa-star" style="font-size: 1.25em;"></i> <span style="font-size: 1.25em;">Extras: ' + extras + '</span><hr>').appendTo(row2);
            $('<td></td>').appendTo(row2);
            $('<td></td>').addClass('property-city').css('text-align', 'left').html('<i class="fa-solid fa-city" style="font-size: 1.25em;"></i> <span style="font-size: 1.25em;">City: ' + data[0].name_city + '</span><hr>').appendTo(row2);

            var row3 = $("<tr></tr>").appendTo(table);
            $('<td></td>').addClass('property-cadastral-reference').css('text-align', 'left').html('<i class="fas fa-map-marked-alt" style="font-size: 1.25em;"></i> <span style="font-size: 1.25em;">Cadastral Reference: ' + data[0].cadastral_reference + '</span><hr>').appendTo(row3);
            $('<td></td>').appendTo(row3);
            $('<td></td>').addClass('property-square-meters').css('text-align', 'left').html('<i class="fas fa-ruler-combined" style="font-size: 1.25em;"></i> <span style="font-size: 1.25em;">Square Meters: ' + data[0].square_meters + '</span><hr>').appendTo(row3);

            var row4 = $("<tr></tr>").appendTo(table);
            $('<td></td>').addClass('icon-bedroom').css('text-align', 'left').html('<i class="fas fa-bed" style="font-size: 1.25em;"></i> <span style="font-size: 1.25em;">' + data[0].number_of_rooms + " rooms</span><hr>").appendTo(row4);
            $('<td></td>').appendTo(row4);
            $('<td></td>').addClass('property-operation').css('text-align', 'left').html('<i class="fas fa-handshake" style="font-size: 1.25em;"></i> <span style="font-size: 1.25em;">Operation: ' + operation + '</span><hr>').appendTo(row4);

            var row5 = $("<tr></tr>").appendTo(table);
            $('<td></td>').attr('colspan', 3).addClass('large-person').html('<i class="fas fa-user-plus" style="font-size: 1.3em;"></i> <span style="font-size: 1.3em;">Adapted for Reduced Mobility: ' + data[0].name_large_people + '</span><hr>').appendTo(row5);

            var row6 = $("<tr></tr>").appendTo(table);
            $('<td></td>').attr('colspan', 3).addClass('property-description').css('text-align', 'center').html('<i class="fas fa-align-left" style="font-size: 1.5em;"></i> <span style="font-size: 1.5em;">Description: ' + data[0].description + '</span><hr>').appendTo(row6);
            var row7 = $("<tr></tr>").appendTo(table);
            $('<td></td>').attr('colspan', 3).addClass('property-price').html(' <span style="font-size: 2em;">Price: ' + data[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '&nbsp;</span><i class="fas fa-euro-sign" style="font-size: 2em;"></i><hr>').appendTo(row7);
            $('<br>').appendTo(table);

            propertyDetailsDiv.append(table);
            var table = $("<table></table>");
            var row = $("<tr></tr>").appendTo(table);
            var cell1 = $("<td></td>").appendTo(row);
            var cell2 = $("<td></td>").appendTo(row);

            var likeButton = $("<button></button>")
                .addClass("like-button")
                .html("<i class='fas fa-heart'></i> Like")
                .css({
                    'background-color': 'red',
                    'border-radius': '25px',
                    'border': 'none',
                    'padding': '10px 20px',
                    'color': 'white',
                    'cursor': 'pointer',
                    'height': '50px',
                    'text-align': 'center'
                })
                .hover(
                    function () {
                        $(this).css('background-color', 'green');
                    },
                    function () {
                        $(this).css('background-color', 'red');
                    }
                );

            var backButton = $('<a></a>')
                .addClass('button button-primary-white')
                .attr('href', 'index.php?page=shop')
                .html('<i class="fas fa-arrow-left"></i> Back')
                .css({
                    'margin-left': '10px',
                    'height': '50px',
                    'text-align': 'center'
                });

            cell1.append(likeButton);
            cell2.append(backButton);
            $('<br>').appendTo(table);

            propertyDetailsDiv.append(table);
            load_map_details(data);
        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
        });
}
function print_filters() {
    $('<div class="div-filters container"></div>').appendTo('#title_property').html
        (`<div class="row">
        <div class="col-md-4">
            <label for="id_category">Category:</label>
            <select id="id_category" class="form-control id_category">
                <option value="" selected disabled>Select Category</option>
            </select>
        </div>
        <div class="col-md-4">
            <label for="id_extras">Extras:</label>
            <button type="button" id="button_extras" class="form-control" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <p style="text-align:left;">Select Extras</p>
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Extras</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="id_extras"></div>
                        <div class="modal-footer">
                            <button id="apply_extras" type="button" class="btn btn-primary">Apply Filters</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <label for="id_city">City:</label>
            <select id="id_city" class="form-control id_city">
                <option value="" selected disabled>Select City</option>
            </select>
        </div>
    </div>`+
            '<div class="row">' +
            '<div class="col-md-4">' +
            '<label for="id_operation">Operation:</label>' +
            '<select id="id_operation" class="form-control id_operation">' +
            '<option value="" selected disabled>Select Operation</option>' +
            '</select>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<label for="id_type">Type:</label>' +
            '<select id="id_type" class="form-control id_type">' +
            '<option value="" selected disabled>Select Type</option>' +
            '</select>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<label for="id_large_people">Adapted for Reduced Mobility:</label>' +
            '<select id="id_large_people" class="form-control id_large_people">' +
            '<option value="" selected disabled>Select Option</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            
            '</div>' +
            '</div>'+
            '</div>'+
            '<div class="col-md-4 text-center">' +
            '<div id="overlay">' +
            '<div class="cv-spinner">' +
            '<span class="spinner"></span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-md-12 text-center">' +
            '<p></p>' +
            '<button class="button button-primary-white filter_remove ml-5" id="Remove_filter">Remove Filter</button>' +
            '</div>' +
            '</div>'+
            '<br><br><select id="order" class="form-control order">' +
            '<option value="" selected disabled>Order BY</option>' +
            '<option value="price">Price</option>' +
            '<option value="name">Name</option>' +
            '<option value="visits">Most Visits</option>' +
            '</select>' 
            )
    $(document).on('click', '#Remove_filter', function () {
        remove_filters();
    });
    $(document).on('click', '#apply_extras', function () {
        handleCheckboxChange();
        location.reload();
    });
    order_properties();
    load_city();
    load_large_people();
    load_extras();
    load_operation();
    load_type();
    load_category();
}
function order_properties() {
    $('#order').change(function () {
        var order = $(this).val();
        var filters_shop = JSON.parse(localStorage.getItem('filters_shop')) || {};
        filters_shop['order'] = order;
        localStorage.setItem('filters_shop', JSON.stringify(filters_shop));
        
        ajaxPromise('POST', 'JSON', 'module/shop/controller/controller_shop.php?op=order_properties', { filters_shop })
        .then(function (data) {
            $('#properties_shop').empty();
            $('#images_properties').empty();
            for (let row in data) {
                let property = data[row];
                let propertyDiv = $('<div></div>').attr({ 'class': 'col-md-6 wow-outer carrousel_list' }).appendTo('#properties_shop');
                let owlCarouselDiv = $('<div></div>').addClass('owl-carousel owl-theme carrousel_details').appendTo(propertyDiv);
                for (let image of property.images) {
                    $("<div></div>").addClass("item").appendTo(owlCarouselDiv).html(
                        "<article class='thumbnail-light'>" +
                        "<a class='thumbnail-light-media' href='#'><img class='thumbnail-light-image' src='" +
                        image.path_images +
                        "' alt='Image " + (parseInt(row) + 1) + "' width='100%' heiht='100%'/></a>" +
                        "</article>"
                    );
                }
                owlCarouselDiv.owlCarousel({
                    loop: true,
                    margin: 100,
                    nav: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                    }
                });
                propertyDiv.append(`
                        <article class='post-modern wow slideInLeft '><br>
                            <h4 class='post-modern-title'>
                                <a class='post-modern-title' href='#'>${property.property_name}</a>
                            </h4>
                            <ul class='post-modern-meta'>
                                <li><a class='button-winona' href='#'>${property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €</a></li>
                                <li>City: ${property.name_city}</li>
                                <li>Square meters: ${property.square_meters}</li>
                            </ul>
                            <p>${property.description}</p><br>
                            <div class='buttons'>
                                <table id='table-shop'> 
                                    <tr>
                                        <td>
                                            <button id='${property.id_property}' class='more_info_list button button-primary button-winona button-md'>More Info</button><br>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </article>
                    `)
            }
        }).catch(function (error) {
            console.error(error);
            // window.location.href = "index.php?page=503";
        });
    
    });
}
function load_city() {
    ajaxPromise('GET', 'JSON', 'module/shop/controller/controller_shop.php?op=dynamic_city')
        .then(function (data) {
            
            for (let row in data) {
                let city = data[row];
                $('#id_city').append('<option value="' + city.id_city + '">' + city.name_city + '</option>');
            }
            let selectedCity = localStorage.getItem('selectedCity');
            if (selectedCity) {
                $('#id_city').val(selectedCity);
                $('#id_city').addClass('selected_filters');
            }
        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
        });
    $('#id_city').change(function() {
        let selectedCity = $(this).val();
        localStorage.setItem('selectedCity', selectedCity);
    });
}
function load_large_people() {
    ajaxPromise('GET', 'JSON', 'module/shop/controller/controller_shop.php?op=dynamic_large_people')
        .then(function (data) {
            for (let row in data) {
                let large_people = data[row];
                $('#id_large_people').append('<option value="' + large_people.id_large_people + '">' + large_people.name_large_people + '</option>');
            }
            let selectedLargePeople = localStorage.getItem('selectedLargePeople');
            if (selectedLargePeople) {
                $('#id_large_people').val(selectedLargePeople);
                $('#id_large_people').addClass('selected_filters');
            }
        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
        });
    $('#id_large_people').change(function() {
        let selectedLargePeople = $(this).val();
        localStorage.setItem('selectedLargePeople', selectedLargePeople);
    });
}
function load_type(){
    ajaxPromise('GET', 'JSON', 'module/shop/controller/controller_shop.php?op=dynamic_type')
        .then(function (data) {
            for (let row in data) {
                let type = data[row];
                $('#id_type').append('<option value="' + type.id_type + '">' + type.name_type + '</option>');
            }
            let selectedType = localStorage.getItem('selectedType');
            if (selectedType) {
                $('#id_type').val(selectedType);
                $('#id_type').addClass('selected_filters');
            }
        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
        });
    $('#id_type').change(function() {
        let selectedType = $(this).val();
        localStorage.setItem('selectedType', selectedType);
    });
}
function load_operation() {
    ajaxPromise('GET', 'JSON', 'module/shop/controller/controller_shop.php?op=dynamic_operation')
        .then(function (data) {
            for (let row in data) {
                let operation = data[row];
                $('#id_operation').append('<option value="' + operation.id_operation + '">' + operation.name_operation + '</option>');
            }
            let selectedOperation = localStorage.getItem('selectedOperation');
            if (selectedOperation) {
                $('#id_operation').val(selectedOperation);
                $('#id_operation').addClass('selected_filters');
            }
        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
        });
    $('#id_operation').change(function() {
        let selectedOperation = $(this).val();
        localStorage.setItem('selectedOperation', selectedOperation);
    });
}
function load_extras() {
    ajaxPromise('GET', 'JSON', 'module/shop/controller/controller_shop.php?op=dynamic_extras')
        .then(function (data) {
            for (let row in data) {
                let extras = data[row];
                $('#id_extras').append('<label class="cyberpunk-checkbox-label"><input type="checkbox" class="cyberpunk-checkbox" id="' + extras.id_extras + '" value="' + extras.id_extras + '">' + extras.name_extras + '</label>');                       
            }
            let filters_shop = JSON.parse(localStorage.getItem('filters_shop'));
            if (filters_shop && filters_shop.id_extras) {
                filters_shop.id_extras.forEach(function(extra) {
                    $('#id_extras input[value=' + extra + ']').prop('checked', true);
                });
            }
        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
        });
}
function load_category() {
    ajaxPromise('GET', 'JSON', 'module/shop/controller/controller_shop.php?op=dynamic_category')
        .then(function (data) {
            for (let row in data) {
                let category = data[row];
                $('#id_category').append('<option value="' + category.id_category + '">' + category.name_category + '</option>');
            }
            let selectedCategory = localStorage.getItem('selectedCategory');
            if (selectedCategory) {
                $('#id_category').val(selectedCategory);
                $('#id_category').addClass('selected_filters');
            }
        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
        });

    $('#id_category').change(function() {
        let selectedCategory = $(this).val();
        localStorage.setItem('selectedCategory', selectedCategory);
    });
}
function filters_shop() {
    let filters_shop = JSON.parse(localStorage.getItem('filters_shop')) || {};

    function handleFilterChange(filterName, filterValue) {
        let filters_shop = JSON.parse(localStorage.getItem('filters_shop')) || {};
        filters_shop[filterName] = filterValue;
        localStorage.setItem('filters_shop', JSON.stringify(filters_shop));
        filters_shop = JSON.parse(localStorage.getItem('filters_shop'));
        location.reload();
    }

    function setFilterValue(filterName) {
        if (filters_shop[filterName]) {
            $(`#${filterName}`).val(filters_shop[filterName]);
        }
    }
    function setFilterValue(filterName) {
        if (filters_shop[filterName]) {
            $(`#${filterName}`).val(filters_shop[filterName]);
        }
    }
    $('#id_category').change(function () {
        handleFilterChange('id_category', this.value);
    });
    setFilterValue('id_category');

    $('#id_city').change(function () {
        handleFilterChange('id_city', this.value);
    });
    setFilterValue('id_city');

    $('#id_operation').change(function () {
        handleFilterChange('id_operation', this.value);
    });
    setFilterValue('id_operation');

    $('#id_type').change(function () {
        handleFilterChange('id_type', this.value);
    });
    setFilterValue('id_type');

    $('#id_large_people').change(function () {
        handleFilterChange('id_large_people', this.value);
    });
    setFilterValue('id_large_people');
}
function handleCheckboxChange() {
    let filters_shop = JSON.parse(localStorage.getItem('filters_shop')) || {};
    let selectedExtras = filters_shop['id_extras'] || [];
    
    function handleFilterCheckBox(filterName, filterValue) {
        let filters_shop = JSON.parse(localStorage.getItem('filters_shop')) || {};
        filters_shop[filterName] = filterValue;
        localStorage.setItem('filters_shop', JSON.stringify(filters_shop));
        filters_shop = JSON.parse(localStorage.getItem('filters_shop'));
    }
    $('#id_extras input[type="checkbox"]').each(function() {
        if (this.checked) {
            let value = parseInt(this.value, 10);
            if (!selectedExtras.includes(value)) {
                selectedExtras.push(value);
            }
        } else {
            let value = parseInt(this.value, 10);
            selectedExtras = selectedExtras.filter(val => val !== value);
        }
    });

    handleFilterCheckBox('id_extras', selectedExtras);
}
function apply_filters() {
    let filter = [];
    let filters_shop = JSON.parse(localStorage.getItem('filters_shop')) || {};

    if (filters_shop['id_category']) {
        filter.push(['id_category', filters_shop['id_category']])
    }
    if (filters_shop['id_city']) {
        filter.push(['id_city', filters_shop['id_city']])
    }
    if (filters_shop['id_extras']) {
        filters_shop['id_extras'].forEach(function(value) {
            filter.push(['id_extras', value])
        });
    }
    if (filters_shop['id_operation']) {
        filter.push(['id_operation', filters_shop['id_operation']])
    }
    if (filters_shop['id_type']) {
        filter.push(['id_type', filters_shop['id_type']])
    }
    if (filters_shop['id_large_people']) {
        filter.push(['id_large_people', filters_shop['id_large_people']])
    }

    return filter;
}
function highlight_shop() {

    var highlight_filters = JSON.parse(localStorage.getItem('filters_shop'));

    if (highlight_filters['id_category']) {
        $('#id_category').val(highlight_filters['id_category']);
        if ($('#id_category').val()) {
            $('#id_category').addClass('selected_filters');
        }
    }
    if (highlight_filters['id_city']) {
        $('#id_city').val(highlight_filters['id_city']);
        if ($('#id_city').val()) {
            $('#id_city').addClass('selected_filters');
        }
    }
    if (highlight_filters['id_extras']) {
        $('#id_extras input[type="checkbox"]').each(function() {
            if (highlight_filters['id_extras'].includes(this.value)) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });
        if (highlight_filters['id_extras'].length > 0) {
            $('#button_extras').addClass('selected_filters');
        }
    }
    if (highlight_filters['id_operation']) {
        $('#id_operation').val(highlight_filters['id_operation']);
        if ($('#id_operation').val()) {
            $('#id_operation').addClass('selected_filters');
        }
    }
    if (highlight_filters['id_type']) {
        $('#id_type').val(highlight_filters['id_type']);
        if ($('#id_type').val()) {
            $('#id_type').addClass('selected_filters');
        }
    }
    if (highlight_filters['id_large_people']) {
        $('#id_large_people').val(highlight_filters['id_large_people']);
        if ($('#id_large_people').val()) {
            $('#id_large_people').addClass('selected_filters');
        }
    }
}
function remove_filters() {
    localStorage.removeItem('filters_shop');
    localStorage.removeItem('selectedCategory');
    localStorage.removeItem('selectedCity');
    localStorage.removeItem('selectedExtras');
    localStorage.removeItem('selectedOperation');
    localStorage.removeItem('selectedType');
    localStorage.removeItem('selectedLargePeople');
    location.reload();
}
$(document).ready(function () {
    loadProperties();
    print_filters();
    filters_shop();
    clicks_shop();
});
