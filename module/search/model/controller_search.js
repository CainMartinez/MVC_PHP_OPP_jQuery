var selectedCategory;
function load_search_city() {
    ajaxPromise('GET', 'JSON', 'module/search/controller/controller_search.php?op=dynamic_search_city')
        .then(function (data) {
            for (let row in data) {
                let city = data[row];
                $('#search_city').append('<option value="' + city.id_city + '">' + city.name_city + '</option>');
            }
            // console.log(data);
        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
        });
}
function load_search_type(data = undefined) {
    $('#search_type').empty();
    let ajaxUrl = 'module/search/controller/controller_search.php?op=dynamic_search_type';
    let ajaxData = {};
    if (data !== undefined) {
        ajaxData.id_city = data['id_city'];
    }
    ajaxPromise('POST', 'JSON', ajaxUrl, ajaxData)
        .then(function (data) {
            $('<option>Select Type</option>').attr('selected', true).attr('disabled', true).appendTo('#search_type');
            for (let row in data) {
                let type = data[row];
                $('#search_type').append('<option value="' + type.id_type + '">' + type.name_type + '</option>');
            }
        }).catch(function (e) {
            console.error(e);
            // window.location.href = "index.php?page=503";
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
        $('#search_results').css('display', 'block')
        let auto_complete_data = {complete: $(this).val()};
        // console.log(auto_complete_data);
        if (($('#search_type').val() != 0)){
            auto_complete_data.id_type = $('#search_type').val();
            // console.log(auto_complete_data.id_type);
            if(($('#search_type').val() != 0) && ($('#search_city').val() != 0)){
                auto_complete_data.id_city = $('#search_city').val();
                // console.log(auto_complete_data.id_city);
            }
        }
        if(($('#search_type').val() == 0) && ($('#search_city').val() != 0)){ 
            auto_complete_data.id_city = $('#search_city').val();
        }
        // console.log(auto_complete_data);
        ajaxPromise('POST', 'JSON','module/search/controller/controller_search.php?op=autocomplete', auto_complete_data)
        .then(function(data) {
            $('#search_results').empty();
            $('#search_results').fadeIn(10000000);
            for (row in data) {
                $('<li></li>').appendTo('#search_results').html(data[row].name_category).attr({'class': 'list-group-item list-group-item-action search_element', 'id': data[row].id_category});
            }
            $(document).on('click', '.search_element', function() {
                $('#autocom').val($(this).text());
                selectedCategory = $(this).attr('id');
                $('#search_results').fadeOut(1000);
            });
        }).catch(function(e) {
            console.error(e);
            $('#search_results').fadeOut(500);
        });
    });
}
function search_button() {
    $('#search_button').on('click', function() {
        var search = [];
        if(($('#search_city').val() == 0) && ($('#search_type').val() == 0)){
            if($('#autocom').val() != ""){
                search.push({"id_category": selectedCategory});
            }
        }else if(($('#search_city').val() != 0) && ($('#search_type').val() == 0)){
            if($('#autocom').val() != ""){
                search.push({"id_category": selectedCategory});
            }
            search.push({"type_name":[$('#search_city').val()]});
        }else if(($('#search_city').val() == 0) && ($('#search_type').val() != 0)){
            if($('#autocom').val() != ""){
                search.push({"id_category": selectedCategory});
            }
            search.push({"name_type":[$('#search_type').val()]});
        }else{
            if($('#autocom').val() != ""){
                search.push({"id_category": selectedCategory});
            }
            search.push({"id_city":[$('#search_city').val()]});
            search.push({"id_type":[$('#search_type').val()]});
        }
        if(search.length != 0){
            localStorage.setItem('filters_search', JSON.stringify(search));
            localStorage.setItem('filters_shop', JSON.stringify(search));
            console.log(search);
            setTimeout(function(){ 
                window.location.href = 'index.php?page=shop';
            }, 1000);
        }
        let selectedCity = $('#search_city').val();
        let selectedType = $('#search_type').val();

        localStorage.setItem('selectedType', selectedType);
        localStorage.setItem('selectedCategory', selectedCategory);
        localStorage.setItem('selectedCity', selectedCity);

        selectedType = localStorage.getItem('selectedType');
        selectedCity = localStorage.getItem('selectedCity');
        if (selectedType) {
            $('#search_type').val(selectedType);
            $('#search_type').addClass('selected_filters');
        }
        if (selectedCity) {
            $('#search_city').val(selectedCity);
            $('#search_city').addClass('selected_filters');
        }
        if (selectedCategory) {
            $('#autocom').val(selectedCategory);
            $('#autocom').addClass('selected_filters');
        }
    });
}
$(document).ready(function() {
    launch_search();
    autocomplete();
    search_button();
});