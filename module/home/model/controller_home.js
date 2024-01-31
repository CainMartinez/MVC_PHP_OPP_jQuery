function carousel_type() {
  ajaxPromise(
    "GET",
    "JSON",
    "module/home/controller/controller_home.php?op=Carrousel_Type"
  )
    .then(function (data) {
      let html = "";
      for (row in data) {
        html += `
                <div class="swiper-slide swiper-slide_video" style="background-image: url('${data[row].image_type}')">
                    <div class="container">
                        <div class="jumbotron-classic-content">
                            <div class="wow-outer">
                                <div class="title-docor-text font-weight-bold title-decorated text-uppercase wow slideInLeft text-white">${data[row].name_type}</div>
                            </div>
                            <h1 class="text-uppercase text-white font-weight-bold wow-outer"><span class="wow slideInDown" data-wow-delay=".2s">Properties</span></h1>
                            <div class="wow-outer button-outer">
                                <a class="button button-md button-primary button-winona wow slideInDown" href="#" data-wow-delay=".4s">View Properties</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      }
      $(".swiper-wrapper").html(html);
    })
    .then(function () {
      let swiper = new Swiper(".swiper-container", {
        effect: "fade",
        loop: true,
        speed: 3000,
        autoplay: {
          delay: 4000,
        },
      });
    })
    .catch(function (error) {
      console.error(error);
      window.location.href =
        "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Carrousel Type HOME";
    });
}
function loadCategories() {
  ajaxPromise(
    "GET",
    "JSON",
    "module/home/controller/controller_home.php?op=Category"
  )
    .then(function (data) {
      var rowContainer = $("<div></div>").attr(
        "class",
        "owl-carousel owl-theme"
      );
      for (row in data) {
        $("<div></div>")
          .attr("class", "item")
          .appendTo(rowContainer)
          .html(
            "<article class='thumbnail-light'>" +
              "<a class='thumbnail-light-media' href='#'><img class='thumbnail-light-image' src='" +
              data[row].image_category +
              "' alt='' width='270' height='300' /></a>" +
              "<h4 class='thumbnail-light-title title-category'><a href='#'>" +
              data[row].name_category +
              "</a></h4>" +
              "</article>"
          );
      }
      $("#category_html").append(rowContainer);

      $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 50,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 5,
          },
        },
      });
    })
    .catch(function () {
      window.location.href =
        "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Categories HOME";
    });
}
function loadOperation() {
  ajaxPromise(
    "GET",
    "JSON",
    "module/home/controller/controller_home.php?op=Operation"
  )
    .then(function (data) {
      for (row in data) {
        var a = $("<a></a>").attr("href", "#").attr("class", "link-operation");
        var article = $("<article></article>").attr("class", "box-minimal");
        var imgIcon = $("<img>")
          .attr("src", data[row].image_operation)
          .attr("class", "box-chloe__icon novi-icon");
        var divMain = $("<div></div>").attr("class", "box-minimal-main");
        var h4 = $("<h4></h4>")
          .attr("class", "box-minimal-title")
          .text(data[row].name_operation);

        divMain.append(h4);
        article.append(imgIcon, divMain);
        a.append(article);

        $("#containerOperation").append(a);
      }
    })
    .catch(function () {
      window.location.href =
        "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Operation HOME";
    });
}
function loadCity() {
  ajaxPromise(
    "GET",
    "JSON",
    "module/home/controller/controller_home.php?op=City"
  )
    .then(function (data) {
      let html = "";
      for (row in data) {
        html += `
                <div class="col-md-6 wow-outer">
                    <article class="post-modern wow slideInLeft">
                        <a class="post-modern-media" href="#">
                            <img class="propertyImage" src="${data[row].image_city}" alt="" width="571" height="353"/>
                        </a>
                        <h4 class="post-modern-title title-city">
                            <a class="post-modern-title" href="#">${data[row].name_city}</a>
                        </h4>
                        <ul class="post-modern-meta"></ul>
                    </article>
                </div>
            `;
      }
      $("#propertyContainer").html(html);
    })
    .catch(function () {
      window.location.href =
        "index.php?module=ctrl_exceptions&page=503&type=503&lugar=City HOME";
    });
}
function loadExtras() {
  ajaxPromise(
    "GET",
    "JSON",
    "module/home/controller/controller_home.php?op=Extras"
  )
    .then(function (data) {
      let html = "";
      for (row in data) {
        html += `
                <div class="col-md-10 col-lg-6 wow-outer">
                    <article class="profile-creative wow slideInLeft">
                        <figure class="profile-creative-figure">
                            <img class="profile-creative-image" src="${data[row].image_extras}" alt="" width="270" height="273" />
                        </figure>
                        <div class="profile-creative-main">
                            <h5 class="profile-creative-title">
                                <a href="#">${data[row].name_extras}</a>
                            </h5>
                            <p class="profile-creative-position"></p>
                        </div>
                    </article>
                </div>
            `;
      }
      $(".row-lg-50.row-35.row-xxl-70").html(html);
    })
    .catch(function () {
      window.location.href =
        "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Operation HOME";
    });
}
function loadRecomendation() {
  ajaxPromise(
    "GET",
    "JSON",
    "module/home/controller/controller_home.php?op=Recomendation"
  )
    .then(function (data) {
      let html = "";
      for (row in data) {
        html += `
                <div class="col-md-6 wow-outer">
                    <article class="post-modern wow slideInLeft">
                        <a class="post-modern-media" href="#">
                            <img src="${data[row].path_images}" alt="" width="571" height="353"/>
                        </a>
                        <h4 class="post-modern-title">
                            <a class="post-modern-title" href="#">${data[row].cadastral_reference}</a>
                        </h4>
                        <ul class="post-modern-meta">
                            <li><a class="button-winona" href="#">$${data[row].price}/mon</a></li>
                            <li>${data[row].square_meters} Sq. Ft.</li>
                            <li>${data[row].number_of_rooms} Rooms</li>
                        </ul>
                        <p>${data[row].description}</p>
                    </article>
                </div>
                `;
      }
      $("#propertyRecomendation").html(html);
    })
    .catch(function () {
      window.location.href =
        "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Recomendation HOME";
    });
}
$(document).ready(function () {
  carousel_type();
  loadCategories();
  loadOperation();
  loadCity();
  loadExtras();
  loadRecomendation();
});
