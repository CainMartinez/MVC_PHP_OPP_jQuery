function carousel_type() {
    var swiper;
    ajaxPromise('GET', 'JSON','module/home/controller/controller_home.php?op=Carrousel_Type')
    .then(function(data) {
        var swiperContainer = $('<section></section>').attr('class', "section swiper-container swiper-slider swiper-slider-minimal")
            .attr('data-loop', "true")
            .attr('data-slide-effect', "fade")
            .attr('data-autoplay', "4759")
            .attr('data-simulate-touch', "true");

        var swiperWrapper = $('<div></div>').attr('class', "swiper-wrapper");

        for (row in data) {
            var swiperSlide = $('<div></div>').attr('class', "swiper-slide")
                .attr('data-slide-bg', data[row].image_type);

            var container = $('<div></div>').attr('class', "container");

            var jumbotronContent = $("<div></div>").attr('class', "jumbotron-classic-content")
                .html(
                    "<div class='wow-outer'>" +
                    "<div class='title-docor-text font-weight-bold title-decorated text-uppercase wow slideInLeft text-white'>" + data[row].name_type + "</div>" +
                    "</div>" +
                    "<h1 class='text-uppercase text-white font-weight-bold wow-outer'><span class='wow slideInDown' data-wow-delay='.2s'>Properties</span></h1>" +
                    "<p class='text-white wow-outer'><span class='wow slideInDown' data-wow-delay='.35s'>inHouse provides you with lots of great properties throughout the USA so that you could easily choose your dream property.</span></p>" +
                    "<div class='wow-outer button-outer'><a class='button button-md button-primary button-winona wow slideInDown' href='#' data-wow-delay='.4s'>View Properties</a></div>"
                );

            container.append(jumbotronContent);
            swiperSlide.append(container);
            swiperWrapper.append(swiperSlide);
        }

        var swiperPaginationOuter = $('<div></div>').attr('class', "swiper-pagination-outer container");
        var swiperPagination = $('<div></div>').attr('class', "swiper-pagination swiper-pagination-modern swiper-pagination-marked")
            .attr('data-index-bullet', "true");

        swiperPaginationOuter.append(swiperPagination);
        swiperContainer.append(swiperWrapper).append(swiperPaginationOuter);

        $('#carousel_container').append(swiperContainer);

        setTimeout(function() {
            swiper = new Swiper('.swiper-container', {
                loop: true,
                effect: 'fade',
                autoplay: false, // Desactiva el autoplay de Swiper
                simulateTouch: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });

            var delay = 5000; // Configura el delay en milisegundos
            var slideIndex = 0;

            setInterval(function() {
                if (swiper && swiper.slides) {
                    slideIndex++;
                    if (slideIndex >= swiper.slides.length) {
                        slideIndex = 0;
                    }
                    swiper.slideTo(slideIndex);
                }
            }, delay);
        }, 0);
    })
    .catch(function() {
        console.log("Error Carrousel_Type");
        // window.location.href = "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Carrusel_Type HOME";
    });
}

function loadCategories() {
    ajaxPromise('GET', 'JSON','module/home/controller/controller_home.php?op=Category')
    .then(function(data) {
        var rowContainer = $('<div></div>').attr('class', "row glide__slides center-divs");
        for (row in data) {
            $('<div></div>').attr('class', "col-custom-5 glide__slide").appendTo(rowContainer)
                .html(
                    "<article class='thumbnail-light'>" +
                    "<a class='thumbnail-light-media' href='#'><img class='thumbnail-light-image' src='" + data[row].image_category + "' alt='' width='270' height='300' /></a>" +
                    "<h4 class='thumbnail-light-title title-category'><a href='#'>" + data[row].name_category + "</a></h4>" +
                    "</article>"
                )
        }
        $('#category_html').append(rowContainer);

        $('<div></div>').attr('class', "col-md-12 wow-outer").appendTo('#category_html')
            .html("<br><a class='button button-primary button-winona button-md' href='#'>view all properties</a>");

    }).catch(function() {
        window.location.href = "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Categories HOME";
    });
}

function loadOperation() {
    ajaxPromise('GET', 'JSON','module/home/controller/controller_home.php?op=Operation')
    .then(function(data) {
        for (row in data) {
            var a = $('<a></a>').attr('href', '#').attr('class', 'link-operation');
            var article = $('<article></article>').attr('class', "box-minimal");
            var imgIcon = $('<img>').attr('src', data[row].image_operation).attr('class', "box-chloe__icon novi-icon");
            var divMain = $('<div></div>').attr('class', "box-minimal-main");
            var h4 = $('<h4></h4>').attr('class', "box-minimal-title").text(data[row].name_operation);

            divMain.append(h4);
            article.append(imgIcon, divMain);
            a.append(article);

            $('#containerOperation').append(a);
        }
    }).catch(function() {
        window.location.href = "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Operation HOME";
    });
}
function loadCity() {
    ajaxPromise('GET', 'JSON','module/home/controller/controller_home.php?op=City')
    .then(function(data) {
        let html = '';
        for (row in data) {
            html += '<div class="col-md-6 wow-outer"><article class="post-modern wow slideInLeft"><a class="post-modern-media" href="#"><img class="propertyImage" src="' + data[row].image_city + '" alt="" width="571" height="353" /></a><h4 class="post-modern-title title-city"><a class="post-modern-title" href="#">' + data[row].name_city + '</a></h4><ul class="post-modern-meta"></ul></p></article></div>';        }
        $('#propertyContainer').html(html);
    }).catch(function() {
        window.location.href = "index.php?module=ctrl_exceptions&page=503&type=503&lugar=City HOME";
    });
}

$(document).ready(function() {
    // carousel_type();
    loadCategories();
    loadOperation();
    loadCity();
});