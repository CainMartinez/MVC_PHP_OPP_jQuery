function load_search_city() {
    ajaxPromise('GET', 'JSON', 'module/search/controller/controller_search.php?op=dynamic_search_city')
        .then(function (data) {
            
            for (let row in data) {
                let city = data[row];
                $('#search_city').append('<option value="' + city.id_city + '">' + city.name_city + '</option>');

            }
            // console.log(data);

            let selectedCity = localStorage.getItem('selectedCity');
            if (selectedCity) {
                $('#search_city').val(selectedCity);
                $('#search_city').addClass('selected_filters');
            }
        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
        });
        
    $('#search_city').change(function() {
        let selectedCity = $(this).val();
        localStorage.setItem('selectedCity', selectedCity);
    });
}
function load_search_type(data = undefined) {
    $('#search_type').empty();
    if (data == undefined) {
        ajaxPromise('POST', 'JSON', 'module/search/controller/controller_search.php?op=dynamic_search_type_null')
            .then(function (data) {
                $('<option>Type</option>').attr('selected', true).attr('disabled', true).appendTo('#search_type');
                for (let row in data) {
                    let type = data[row];
                    $('<option value="' + type.id_type + '">' + type.name_type + '</option>').appendTo('#search_type');
                }
                // console.log(data);
            }).catch(function (e) {
                console.error(e);
                // window.location.href = "index.php?page=503";
            });
    } else {
        console.log(data['id_city']);
        id_city=data['id_city'];
        ajaxPromise('POST', 'JSON', 'module/search/controller/controller_search.php?op=dynamic_search_type', {id_city})
            .then(function (data) {
                for (let row in data) {
                    let type = data[row];
                    $('<option value="' + type.id_type + '">' + type.name_type + '</option>').appendTo('#search_type');
                }
            }).catch(function (e) {
                console.error(e);
                // window.location.href = "index.php?page=503";
            });
    }
    $('#search_type').change(function() {
        let selectedType = $(this).val();
        localStorage.setItem('selectedType', selectedType);
    });
}
function launch_search(){
    load_search_city();
    load_search_type();
    $('#search_city').on('change', function(){
        let id_city = $(this).val();
        if (id_city === 0) {
            load_search_type();
        }else {
            load_search_type({id_city});
        }
    });
}
function autocomplete(){
    $("#autocom").on("keyup", function () {
        $('#search_type').css('display', 'block');
        let auto_complete_data = {complete: $(this).val()};
        if (($('#search_type').val() != 0)){
            auto_complete_data.name_type = $('#search_type').val();
            if(($('#search_type').val() != 0) && ($('#search_city').val() != 0)){
                auto_complete_data.name_city = $('#search_city').val();
            }
        }
        if(($('#search_type').val() == 0) && ($('#search_city').val() != 0)){ 
            auto_complete_data.name_city = $('#search_city').val();
        }
            
        ajaxPromise('module/search/controller/controller_search.php?op=autocomplete', 'POST', 'JSON', auto_complete_data)
        .then(function(data) {
            $('#search_auto').empty();
            $('#search_auto').fadeIn(10000000);
            // console.log(data);
                for (row in data) {
                    $('<div></div>').appendTo('#search_auto').html(data[row].city).attr({'class': 'search_element', 'id': data[row].id_property});
                }
            $(document).on('click', '.search_element', function() {
                $('#autocom').val(this.getAttribute('id'));
                $('#search_auto').fadeOut(1000);
            });
            $(document).on('click scroll', function(event) {
                if (event.target.id !== 'autocom') {
                    $('#search_auto').fadeOut(1000);
                }
            });
        }).catch(function() {
            $('#search_auto').fadeOut(500);
        });
    });
}
function search_button() {
    $('#search_button').on('click', function() {
        var search = [];
        if(($('#search_type').val() == 0) && ($('#search_city').val() == 0)){
            if($('#autocom').val() != ""){
                search.push({"property":[$('#autocom').val()]});
            }
        }else if(($('#search_type').val() != 0) && ($('#search_city').val() == 0)){
            if($('#autocom').val() != ""){
                search.push({"property":[$('#autocom').val()]});
            }
            search.push({"type_name":[$('#search_type').val()]});
        }else if(($('#search_type').val() == 0) && ($('#search_city').val() != 0)){
            if($('#autocom').val() != ""){
                search.push({"property":[$('#autocom').val()]});
            }
            search.push({"brand_name":[$('#search_city').val()]});
        }else{
            if($('#autocom').val() != ""){
                search.push({"property":[$('#autocom').val()]});
            }
            search.push({"name_type":[$('#search_type').val()]});
            search.push({"name_city":[$('#search_city').val()]});
        }
        localStorage.removeItem('filters_search');
        localStorage.setItem('currentPage', 'shop-list');
        if(search.length != 0){
            localStorage.setItem('filters_search', JSON.stringify(search));
        }
        window.location.href = 'index.php?module=shop&op=list';
    });
}
$(document).ready(function() {
    launch_search();
    autocomplete();
    search_button();
});