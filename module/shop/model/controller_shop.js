function loadProperties() {
    ajaxForSearch('module/shop/controller/controller_shop.php?op=all_properties');
}

function ajaxForSearch(url) {
    ajaxPromise('POST', 'JSON', url)
        .then(function(data) {
            $('#properties_shop').empty();
            $('#images_properties').empty();

            if (data == "error") {
                $('<div></div>').appendTo('#properties_shop')
                    .html(
                        '<h3>¡No se encuentran resultados con los filtros aplicados!</h3>'
                    )
            } else {
                for (row in data) {
                    $('<div></div>').attr({ 'class': 'col-md-6 wow-outer' }).appendTo('#properties_shop')
                        .html(`
                            <article class='post-modern wow slideInLeft'>
                                <a class='post-modern-media' href='#'>
                                    <img src='${data[row].path_images}' alt='' width='571' height='353'/>
                                </a>
                                <h4 class='post-modern-title'>
                                    <a class='post-modern-title' href='#'>${data[row].cadastral_reference} ${data[row].id_property}</a>
                                </h4>
                                <ul class='post-modern-meta'>
                                    <li><a class='button-winona' href='#'>${data[row].price} €</a></li>
                                    <li>City: ${data[row].name_city}</li>
                                    <li>Square meters: ${data[row].square_meters}</li>
                                </ul>
                                <p>${data[row].description}</p><br>
                                <div class='buttons'>
                                    <table id='table-shop'> 
                                        <tr>
                                            <td>
                                                <button id='${data[row].id_property}' class='more_info_list button button-primary button-winona button-md'>More Info</button><br>
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
            system.error(error);
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

        $('<h2></h2>').addClass('post-modern-title').text(data[0].description).appendTo('#images_properties');
        $('<hr>').appendTo('#images_properties');
        $('<br><br>').appendTo('#images_properties');

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
        $('<div></div>').addClass('property-type').text('Type: ' + data[0].name_type).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-category').text('Category: ' + data[0].name_category).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('icon-bathroom').html('<i class="fas fa-bath"></i> 3 bathrooms').appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('icon-bedroom').html('<i class="fas fa-bed"></i> ' + data[0].number_of_rooms+" rooms").appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-operation').text('Operation: ' + data[0].name_operation).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-extras').text('Extras: ' + data[0].name_extras).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-city').text('City: ' + data[0].name_city).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-cadastral-reference').text('Cadastral Reference: ' + data[0].cadastral_reference).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-square-meters').text('Square Meters: ' + data[0].square_meters).appendTo(propertyDetailsDiv);
        $('<div></div>').addClass('property-price').text('Price: ' + data[0].price).appendTo(propertyDetailsDiv);
        var propertyDescriptionDiv = $('<div></div>').addClass('property-description').appendTo(rowDiv);
        $('<p></p>').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.').appendTo(propertyDescriptionDiv);
        
    }).catch(function(error) {
        system.error(error);

        // window.location.href = "index.php?pages=503;
    });
}

$(document).ready(function() {
    loadProperties();
    clicks();
});
