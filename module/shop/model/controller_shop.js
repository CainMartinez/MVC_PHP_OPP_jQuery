function loadProperties() {
    ajaxForSearch('module/shop/controller/controller_shop.php?op=all_properties');
}

function ajaxForSearch(url) {
    ajaxPromise('POST', 'JSON', url)
        .then(function(data) {
            console.log(data);
            $('#properties_shop').empty();
            $('#images_properties').empty();

            if (data == "error") {
                $('<div></div>').appendTo('#properties_shop')
                    .html(
                        '<h3>¡No se encuentran resultados con los filtros aplicados!</h3>'
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
                            "' alt='Image " + (parseInt(row) + 1) + "' width='270' height='300' /></a>" +
                            "</article>"
                        );
                    }

                    owlCarouselDiv.owlCarousel({
                        loop:true,
                        margin:100,
                        nav:true,
                        responsive:{
                            0:{
                                items:1
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
                                            <td>
                                                <button class='button button-primary-white' style='border: 1px solid;'>Buy</button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </article>
                        `)
                }
            }
        }).catch(function(error) {
            console.error(error);
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

        $('#properties_shop').empty();
        $('#images_properties').empty();
    
        var type = data[2][0].type_concat;
        var operation = data[3][0].operation_concat;
        var category = data[4][0].category_concat;
        var extras = data[5][0].extras_concat;
        $('<h3></h3>').addClass('post-modern-title').text(data[0].property_name).appendTo('#images_properties');
        $('<hr>').appendTo('#images_properties');

        var rowDiv = $('<div></div>').addClass('row row-35 row-xxl-70 offset-top-2').appendTo('#images_properties');
        var propertyDetailsDiv = $('<div></div>').addClass('property-details').appendTo(rowDiv);
        var owlCarouselDiv = $('<div></div>').addClass('owl-carousel owl-theme carrousel_details').appendTo('#properties_shop');
        for (row in data[1][0]) {
            $("<div></div>").addClass("item").appendTo(owlCarouselDiv).html(
                "<article class='thumbnail-light'>" +
                "<a class='thumbnail-light-media' href='#'><img class='thumbnail-light-image' src='" +
                data[1][0][row].path_images +
                "' alt='Image " + (parseInt(row) + 1) + "' width='270' height='300' /></a>" +
                "<h4 class='thumbnail-light-title title-category'><a href='#'>" +
                "Image " + (parseInt(row) + 1) +
                "</a></h4>" +
                "</article>"
            );
        }
        owlCarouselDiv.owlCarousel({
            loop:true,
            margin:100,
            nav:true,
            responsive:{
                0:{
                    items:1
                },
            }
        });
        $('<div></div>').addClass('property-type').text('Type: ' + type).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-category').text('Category: ' + category).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('icon-bedroom').html('<i class="fas fa-bed"></i> ' + data[0].number_of_rooms+" rooms").appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-operation').text('Operation: ' + operation).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-extras').text('Extras: ' + extras).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-city').text('City: ' + data[0].name_city).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-cadastral-reference').text('Cadastral Reference: ' + data[0].cadastral_reference).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-square-meters').text('Square Meters: ' + data[0].square_meters).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-price').text('Price: ' + data[0].price).appendTo(propertyDetailsDiv);
        $('<div></div>').text('Description: '+ data[0].description).appendTo(propertyDetailsDiv);
        
    }).catch(function(error) {
        console.error(error);

        // window.location.href = "index.php?pages=503;
    });
}

$(document).ready(function() {
    loadProperties();
    clicks();
});
