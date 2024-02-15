function loadProperties() {
    let filters_home = localStorage.getItem('filters_home') || false;
    let details_home = localStorage.getItem('details_home') || false;
    let filters_search = localStorage.getItem('filters_search') || false;
    let filters_shop = localStorage.getItem('filters_shop') || false;

    if (filters_home !== "false") {
        ajaxForSearch('module/shop/controller/controller_shop.php?op=all_properties', filters_home);
    } else if (details_home !== "false") {
        loadDetails(details_home);    
    } else if (filters_search !== "false") {
        // if para el filtro de la barra de busqueda
    } else if (filters_shop !== "false") {
        // if para el filtro del shop mediante botones
    } else {
        ajaxForSearch('module/shop/controller/controller_shop.php?op=all_properties');
    }
}
function filters_click(){
    $(function() {
        $('.filter_category').change(function() {
            localStorage.setItem('filter_category', this.value);
        });
        if (localStorage.getItem('filter_category')) {
            $('.filter_category').val(localStorage.getItem('filter_category'));
        }
    });
    $(function() {
        $('.filter_type').change(function() {
            localStorage.setItem('filter_type', this.value);
        });
        if (localStorage.getItem('filter_type')) {
            $('.filter_type').val(localStorage.getItem('filter_type'));
        }
    });
    $(function() {
        $('.filter_operation').change(function() {
            localStorage.setItem('filter_operation', this.value);
        });
        if (localStorage.getItem('filter_operation')) {
            $('.filter_operation').val(localStorage.getItem('filter_operation'));
        }
    });
    $(function() {
        $('.filter_city').change(function() {
            localStorage.setItem('filter_city', this.value);
        });
        if (localStorage.getItem('filter_city')) {
            $('.filter_city').val(localStorage.getItem('filter_city'));
        }
    });
    $(function() {
        $('.filter_extras').change(function() {
            localStorage.setItem('filter_extras', this.value);
        });
        if (localStorage.getItem('filter_extras')) {
            $('.filter_extras').val(localStorage.getItem('filter_extras'));
        }
    });
    $(document).on("click", ".filter_button", function() {
        let filters = [];
        localStorage.removeItem('filters_home');
        localStorage.removeItem('details_home');
        // localStorage.removeItem('filters_search');
        // localStorage.removeItem('filters_shop');
        if (localStorage.getItem('filter_category')) {
            filters.push(localStorage.getItem('filter_category'));
        }
        if (localStorage.getItem('filter_type')) {
            filters.push(localStorage.getItem('filter_type'));
        }
        if (localStorage.getItem('filter_operation')) {
            filters.push(localStorage.getItem('filter_operation'));
        }
        if (localStorage.getItem('filter_city')) {
            filters.push(localStorage.getItem('filter_city'));
        }
        if (filters){
            ajaxForSearch('module/shop/controller/controller_shop.php?op=all_properties', filters);
            pagination(filters);
        }
    });
    $(document).on("click", ".filter_remove", function() {
        location.reload();
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_operation');
        localStorage.removeItem('filter_city');
        loxalStorage.removeItem('filters_home');
        localStorage.removeItem('details_home');
        // localStorage.removeItem('filters_search');
        // localStorage.removeItem('filters_shop');
        filters.length = 0;
        if (filters == 0){
            ajaxForSearch('module/shop/controller/controller_shop.php?op=all_properties', filters);
        }
    });
}

function ajaxForSearch(url) {
    localStorage.removeItem('details');
    let redirect = [];
    redirect.push("index.php?modules=shop&op=list");
    if (total_prod != 0) {
        if (localStorage.getItem('id')) {
            var object_id = JSON.parse(localStorage.getItem('id'))
        }
        redirect.push(total_prod);
        localStorage.setItem('move', JSON.stringify(redirect));
    } else {
        if (localStorage.getItem('move')) {
            total_prod = JSON.parse(localStorage.getItem('move'))[1];
            if (localStorage.getItem('id')) {
                var object_id = JSON.parse(localStorage.getItem('id'))
            }
        }
        redirect.push(total_prod);
        localStorage.setItem('move', JSON.stringify(redirect));
    }
    var url2 = url;
    ajaxPromise('POST', 'JSON', url2)
        .then(function(data) {
            // console.log(data);
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
                                        </tr>
                                    </table>
                                </div>
                            </article>
                        `)
                }
            }
            if (localStorage.getItem('id')) {
                document.getElementById(object_id).scrollIntoView();
            }
        }).catch(function(error) {
            console.error(error);
            // window.location.href = "index.php?page=503";
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
            loop:true,
            margin:100,
            nav:true,
            responsive:{
                0:{
                    items:1
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

        var row6 = $("<tr></tr>").appendTo(table);
        $('<td></td>').addClass('icon-bedroom').css('text-align', 'left').html('<i class="fas fa-bed" style="font-size: 1.25em;"></i> <span style="font-size: 1.25em;">' + data[0].number_of_rooms+" rooms</span><hr>").appendTo(row6);
        $('<td></td>').appendTo(row6);
        $('<td></td>').addClass('property-operation').css('text-align', 'left').html('<i class="fas fa-handshake" style="font-size: 1.25em;"></i> <span style="font-size: 1.25em;">Operation: ' + operation + '</span><hr>').appendTo(row6);

        var row4 = $("<tr></tr>").appendTo(table);
        $('<td></td>').attr('colspan', 3).addClass('property-description').css('text-align', 'center').html('<i class="fas fa-align-left" style="font-size: 1.5em;"></i> <span style="font-size: 1.5em;">Description: ' + data[0].description + '</span><hr>').appendTo(row4);
        
        var row5 = $("<tr></tr>").appendTo(table);
        $('<td></td>').attr('colspan', 3).addClass('property-price').html('<i class="fas fa-euro-sign" style="font-size: 2em;"></i> <span style="font-size: 2em;">Price: ' + data[0].price + '</span><hr>').appendTo(row5);
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
                function() {
                    $(this).css('background-color', 'green');
                }, 
                function() {
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
        
    }).catch(function(e) {
        console.error(e);
        // window.location.href = "index.php?page=503";
    });
}

$(document).ready(function() {
    loadProperties();
    clicks();
    filters_click();
});
