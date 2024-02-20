function loadProperties() {
    var filters_home = localStorage.getItem('filters_home') || false;
    let details_home = localStorage.getItem('details_home') || false;
    let filters_search = localStorage.getItem('filters_search') || false;
    let filters_shop = localStorage.getItem('filters_shop') || false;

    if (filters_home !== false) {
        // console.log('Envio en la URL op=home_filter');
        ajaxForSearch('module/shop/controller/controller_shop.php?op=home_filter');
        localStorage.removeItem('filters_home');
    } else if (details_home !== false) {
        loadDetails(details_home);
        localStorage.removeItem('details_home');
    } else if (filters_search !== false) {
        // if para el filtro de la barra de busqueda
    } else if (filters_shop !== false) {
        ajaxForSearch("modules/shop/crtl/crtl_shop.php?op=filters_shop");
        localStorage.removeItem('filters_shop');
    } else {
        ajaxForSearch('module/shop/controller/controller_shop.php?op=all_properties');
    }
}
function ajaxForSearch(url) {

    var filters_home = JSON.parse(localStorage.getItem('filters_home'));
    // console.log(filters_home);
    localStorage.removeItem('filters_home');
    ajaxPromise('POST', 'JSON', url, { 'filters_home': filters_home })
        .then(function (data) {
            // console.log(data);
            // console.log('entra en el then HOME_FILTER');
            $('#properties_shop').empty();
            $('#images_properties').empty();

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
                                    <li><a class='button-winona' href='#'>${property.price} €</a></li>
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
            }
        }).catch(function (error) {
            console.error(error);
            window.location.href = "index.php?page=503";
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

            $('#properties_shop').empty();
            $('#images_properties').empty();
            // console.log(data);
            console.log(data[0].type_concat);
            var type = data[0].type_concat;
            var operation = data[0].operation_concat;
            var category = data[0].category_concat;
            var extras = data[0].extras_concat;
            $('<h2></h2>').addClass('post-modern-title').text(data[0].property_name).appendTo('#shop_div');
            $('<hr>').appendTo('#images_properties');

            var rowDiv = $('<div></div>').addClass('row row-35 row-xxl-70 offset-top-2').appendTo('#images_properties');
            var propertyDetailsDiv = $('<div></div>').addClass('property-details').appendTo(rowDiv);
            var owlCarouselDiv = $('<div></div>').addClass('owl-carousel owl-theme carrousel_details').appendTo('#properties_shop');
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
            $('<td></td>').attr('colspan', 3).addClass('large-person').html('<i class="fas fa-user-plus" style="font-size: 1.3em;"></i> <span style="font-size: 1.3em;">Adapted for a Large Persons: ' + data[0].large_person + '</span><hr>').appendTo(row5);

            var row6 = $("<tr></tr>").appendTo(table);
            $('<td></td>').attr('colspan', 3).addClass('property-description').css('text-align', 'center').html('<i class="fas fa-align-left" style="font-size: 1.5em;"></i> <span style="font-size: 1.5em;">Description: ' + data[0].description + '</span><hr>').appendTo(row6);
            var row7 = $("<tr></tr>").appendTo(table);
            $('<td></td>').attr('colspan', 3).addClass('property-price').html('<i class="fas fa-euro-sign" style="font-size: 2em;"></i> <span style="font-size: 2em;">Price: ' + data[0].price + '</span><hr>').appendTo(row7);
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

        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
        });
}
function print_filters() {
    $('<div class="div-filters container"></div>').appendTo('#title_property')
        .html('<div class="row">' +
            '<div class="col-md-4">' +
            '<label for="filter_category">Category:</label>' +
            '<select id="filter_category" class="form-control filter_category">' +
            '<option value="" selected disabled>Select Category</option>' +
            '<option value="New Building">New Building</option>' +
            '<option value="Pool">Pool</option>' +
            '<option value="Beach">Beach</option>' +
            '<option value="Garden">Garden</option>' +
            '<option value="Garage">Garage</option>' +
            '<option value="Storage">Storage</option>' +
            '<option value="Terrace">Terrace</option>' +
            '</select>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<label for="filter_city">City:</label>' +
            '<select id="filter_city" class="form-control filter_city">' +
            '<option value="" selected disabled>Select City</option>' +
            '<option value="Ontinyent">Ontinyent</option>' +
            '<option value="Gandia">Gandia</option>' +
            '<option value="Albaida">Albaida</option>' +
            '<option value="Alcoi">Alcoi</option>' +
            '<option value="Xativa">Xativa</option>' +
            '</select>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<label for="filter_extras">Extras:</label>' +
            '<select id="filter_extras" class="form-control filter_extras">' +
            '<option value="" selected disabled>Select Extras</option>' +
            '<option value="Heating">Heating</option>' +
            '<option value="Air Conditioning">Air Conditioning</option>' +
            '<option value="Fireplace">Fireplace</option>' +
            '<option value="Elevator">Elevator</option>' +
            '<option value="Sauna">Sauna</option>' +
            '<option value="Solar Panel">Solar Panel</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-md-4">' +
            '<label for="filter_operation">Operation:</label>' +
            '<select id="filter_operation" class="form-control filter_operation">' +
            '<option value="" selected disabled>Select Operation</option>' +
            '<option value="Sale">Sale</option>' +
            '<option value="Rent">Rent</option>' +
            '<option value="Share">Share</option>' +
            '<option value="Rent to Own">Rent to Own</option>' +
            '</select>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<label for="filter_type">Type:</label>' +
            '<select id="filter_type" class="form-control filter_type">' +
            '<option value="" selected disabled>Select Type</option>' +
            '<option value="Apartment">Apartment</option>' +
            '<option value="House">House</option>' +
            '<option value="Townhouse">Townhouse</option>' +
            '<option value="Duplex">Duplex</option>' +
            '<option value="Office">Office</option>' +
            '</select>' +
            '</div>' +
            // '<div class="col-md-4">' +
            // '<label>Adapted for Large Persons:</label><hr>' +
            // '<div class="d-flex justify-content-center">' +
            // '<div class="form-check form-check-inline mr-3">' +
            // '<input type="radio" id="filter_large_persons_yes" name="filter_large_persons" class="form-check-input">' +
            // '<label class="form-check-label" for="filter_large_persons_yes">Yes</label>' +
            // '</div>' +
            // '<div class="form-check form-check-inline">' +
            // '<input type="radio" id="filter_large_persons_no" name="filter_large_persons" class="form-check-input">' +
            // '<label class="form-check-label" for="filter_large_persons_no">No</label>' +
            // '</div>' +
            // '</div>' +
            // '</div>' +
            '<div class="col-md-4">' +
            '<label>Adapted for Large Persons:</label><hr>' +
            '<select id="filter_large_persons" class="form-control filter_large_persons">' +
            '<option value="" selected disabled>Select Option</option>' +
            '<option value="Yes">Yes</option>' +
            '<option value="Partially">Partially</option>'+
            '<option value="No">No</option>' +
            '</select>' +
            '</div>' +
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
            '<button class="button button-primary filter_button button_spinner mr-5" id="Button_filter">Filter</button>' +
            '<button class="button button-primary-white filter_remove ml-5" id="Remove_filter">Remove</button>' +
            '</div>' +
            '</div>')
            $(document).on('click', '#Button_filter', function() {
                apply_filters();
            });
            $(document).on('click', '#Remove_filter', function() {
                remove_filters();
            });
}
function filter_button() {
    // Filter category
    $('#filter_category').change(function () {
        localStorage.setItem('filter_category', this.value);
    });
    if (localStorage.getItem('filter_category')) {
        $('#filter_category').val(localStorage.getItem('filter_category'));
    }

    // Filter city
    $('#filter_city').change(function () {
        localStorage.setItem('filter_city', this.value);
    });
    if (localStorage.getItem('filter_city')) {
        $('#filter_city').val(localStorage.getItem('filter_city'));
    }

    // Filter extras
    $('#filter_extras').change(function () {
        localStorage.setItem('filter_extras', this.value);
    });
    if (localStorage.getItem('filter_extras')) {
        $('#filter_extras').val(localStorage.getItem('filter_extras'));
    }

    // Filter operation
    $('#filter_operation').change(function () {
        localStorage.setItem('filter_operation', this.value);
    });
    if (localStorage.getItem('filter_operation')) {
        $('#filter_operation').val(localStorage.getItem('filter_operation'));
    }

    // Filter type
    $('#filter_type').change(function () {
        localStorage.setItem('filter_type', this.value);
    });
    if (localStorage.getItem('filter_type')) {
        $('#filter_type').val(localStorage.getItem('filter_type'));
    }
    $('#filter_large_persons').change(function () {
        localStorage.setItem('filter_large_persons', this.value);
    });
    if (localStorage.getItem('filter_large_persons')) {
        $('#filter_large_persons').val(localStorage.getItem('filter_large_persons'));
    }
    // // Filter for large persons
    // $('input[name="filter_large_persons"]').change(function () {
    //     localStorage.setItem('filter_large_persons', this.value);
    // });
    // if (localStorage.getItem('filter_large_persons')) {
    //     $('input[name="filter_large_persons"][value="' + localStorage.getItem('filter_large_persons') + '"]').prop('checked', true);
    // }
}
function apply_filters() {
    var filter = [];

    if (localStorage.getItem('filter_category')) {
        filter.push(['category', localStorage.getItem('filter_category')])
    }
    if (localStorage.getItem('filter_city')) {
        filter.push(['city', localStorage.getItem('filter_city')])
    }
    if (localStorage.getItem('filter_extras')) {
        filter.push(['extras', localStorage.getItem('filter_extras')])
    }
    if (localStorage.getItem('filter_operation')) {
        filter.push(['operation', localStorage.getItem('filter_operation')])
    }
    if (localStorage.getItem('filter_type')) {
        filter.push(['type', localStorage.getItem('filter_type')])
    }
    if (localStorage.getItem('filter_large_persons')) {
        filter.push(['large_persons', localStorage.getItem('filter_large_persons')])
    }

    return filter;
}
// function highlight(filter) {
//     if (filter != 0) {
//         $('.highlight').empty();
//         $('<div style="display: inline; float: right;"></div>').appendTo('.highlight')
//             .html('<p style="display: inline; margin:10px;">Sus filtros: </p>');
//         for (row in filter) {
//             $('<div style="display: inline; float: right;"></div>').appendTo('.highlight')
//                 .html('<p style="display: inline; margin:3px;">' + filter[row] + '</p>');
//         }
//     }
//     else {
//         $('.highlight').empty();
//         location.reload();
//     }
// }

function remove_filters() {
    localStorage.removeItem('filter_category');
    localStorage.removeItem('filter_city');
    localStorage.removeItem('filter_extras');
    localStorage.removeItem('filter_operation');
    localStorage.removeItem('filter_type');
    localStorage.removeItem('filter_large_persons');
    localStorage.removeItem('filter');
    location.reload();
}

$(document).ready(function () {
    loadProperties();
    print_filters();
    filter_button();
    clicks_shop();
});
