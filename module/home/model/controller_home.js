function carousel_people() {
  ajaxPromise(
    "GET",
    "JSON",
    "module/home/controller/controller_home.php?op=Carrousel_People"
  )
    .then(function (data) {
      let html = "";
      for (row in data) {
        html += `
                <div class="swiper-slide swiper-slide_video carrousel_home" id='${data[row].id_large_people}' style="background-image: url('${data[row].image_people}')">
                    <div class="container">
                        <div class="jumbotron-classic-content">
                            <div class="wow-outer">
                                <div class="title-docor-text font-weight-bold title-decorated text-uppercase wow slideInLeft text-white">${data[row].name_large_people}</div>
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
      // window.location.href =
      //   "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Carrousel Type HOME";
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
            "<article class='thumbnail-light' id= "+ data[row].id_category+">" +
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
      // window.location.href =
      //   "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Categories HOME";
    });
}
function loadType() {
  ajaxPromise( 
    "GET",
    "JSON",
    "module/home/controller/controller_home.php?op=Carrousel_Type"
  )
  .then(function (data) {
    let html = "";
    for (row in data) {
      html += `
              <div class="col-md-6 wow-outer type_home" id='${data[row].id_type}'>
                  <article class="post-modern wow slideInLeft">
                      <a class="post-modern-media" href="#">
                          <img class="propertyImage" src="${data[row].image_type}" alt="" width="571" height="353"/>
                      </a>
                      <h4 class="post-modern-title title-city">
                          <a class="post-modern-title" href="#">${data[row].name_type}</a>
                      </h4>
                      <ul class="post-modern-meta"></ul>
                  </article>
              </div>
          `;
    }
    $("#propertyType").html(html);
  })
  .catch(function () {
    // window.location.href =
    //   "index.php?module=ctrl_exceptions&page=503&type=503&lugar= Type HOME";
  });
}
function loadOperation() {
  ajaxPromise(
    "GET",
    "JSON",
    "module/home/controller/controller_home.php?op=Operation"
  )
    .then(function (data) {
      var table = $("<table></table>");
      var row = $("<tr></tr>");
      for (var i = 0; i < data.length; i++) {
        var a = $("<a></a>");
        var article = $("<article></article>").attr("class", "box-minimal");
        var imgIcon = $("<img>")
          .attr("src", data[i].image_operation)
          .attr("class", "box-chloe__icon novi-icon");
        var divMain = $("<div></div>").attr("class", "box-minimal-main");
        var h4 = $("<h4></h4>")
          .attr("class", "box-minimal-title")
          .text(data[i].name_operation);

        divMain.append(h4);
        article.append(imgIcon, divMain);
        a.append(article);

        var cell = $("<td></td>").append(a).attr("class", "link-operation").attr("id", data[i].id_operation);
        row.append(cell);

        // Si hemos añadido 4 celdas a la fila, añadimos la fila a la tabla y creamos una nueva fila
        if ((i + 1) % 4 === 0) {
          table.append(row);
          row = $("<tr></tr>");
        }
      }

      // Añadimos la última fila a la tabla, en caso de que no tenga 4 celdas
      if (row.children().length > 0) {
        table.append(row);
      }

      $("#containerOperation").append(table);
    })
    .catch(function () {
      // window.location.href =
      //   "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Operation HOME";
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
                <div class="col-md-6 wow-outer city_home" id='${data[row].id_city}'>
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
      // window.location.href =
      //   "index.php?module=ctrl_exceptions&page=503&type=503&lugar=City HOME";
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
                <div class="col-md-10 col-lg-6 wow-outer extras_home" id='${data[row].id_extras}'>
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
      // window.location.href =
      //   "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Operation HOME";
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
                <div class="col-md-6 wow-outer property_recomendation" id="${data[row].id_property}">
                    <article class="post-modern wow slideInLeft">
                        <a class="post-modern-media">
                            <img src="${data[row].path_images}" alt="" width="571" height="353"/>
                        </a>
                        <h4 class="post-modern-title">
                            <a class="post-modern-title">${data[row].property_name}</a>
                        </h4>
                        <ul class="post-modern-meta">
                            <li><a class="button-winona">${data[row].price} €</a></li>
                            <li>${data[row].square_meters} Sq. Meters</li>
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
      // window.location.href =
      //   "index.php?module=ctrl_exceptions&page=503&type=503&lugar=Recomendation HOME";
    });
}
function clicks_home() {
  $(document).on("click",'div.property_recomendation', function (){
    // console.log('click_OK_Recomendation');
    localStorage.setItem('details_home', this.getAttribute('id'));
      setTimeout(function(){
        window.location.href = 'index.php?page=shop';
      }, 1000);
  });
  $(document).on("click",'article.thumbnail-light', function (){
    // console.log('click_OK_Category');
    var filters_home = [];
    filters_home.push({"category":[this.getAttribute('id')]});
    localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
      setTimeout(function(){ 
        window.location.href = 'index.php?page=shop';
      }, 1000);
  });
  $(document).on("click",'div.carrousel_home', function (){
    // console.log('click_OK_Carrousel');
    var filters_home = [];
    filters_home.push({"large_people":[this.getAttribute('id')]});
    localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
      setTimeout(function(){ 
        window.location.href = 'index.php?page=shop';
      }, 1000);
  });
  $(document).on("click",'div.type_home', function (){
    var filters_home = [];
    filters_home.push({"type":[this.getAttribute('id')]});
    localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
      setTimeout(function(){ 
        window.location.href = 'index.php?page=shop';
      }, 1000);
  });
  $(document).on("click",'td.link-operation', function (){
    // console.log('click_OK_Operation');
    var filters_home = [];
    filters_home.push({"operation":[this.getAttribute('id')]});
    localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
      setTimeout(function(){ 
        window.location.href = 'index.php?page=shop';
      }, 1000);
  });
  $(document).on("click",'div.city_home', function (){
    // console.log('click_OK_City');
    var filters_home = [];
    filters_home.push({"city":[this.getAttribute('id')]});
    localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
      setTimeout(function(){ 
        window.location.href = 'index.php?page=shop';
      }, 1000);
  });
  $(document).on("click",'div.extras_home', function (){
    // console.log('click_OK_Extras');
    var filters_home = [];
    filters_home.push({"extras":[this.getAttribute('id')]});
    localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
      setTimeout(function(){ 
        window.location.href = 'index.php?page=shop';
      }, 1000);
  });
}
$(document).ready(function () {
  carousel_people();
  loadCategories();
  loadOperation();
  loadCity();
  loadType();
  loadExtras();
  loadRecomendation();
  clicks_home();
});
