
function launch_search() {
    load_brands();
    load_category();
    $(document).on('change', '#select1', function () {
        let brand = $(this).val();
        if (brand === 0) {
            load_category();
        } else {
            load_category({ brand });
        }
    });
}

function autocomplete() {
    $(".form-control").on("keyup", function () {
        let sdata = { complete: $(this).val() };
        if (($('#select1').val() != 0)) {
            sdata.type = $('#select1').val();
            if (($('#select1').val() != 0) && ($('#select2').val() != 0)) {
                sdata.city = $('#select2').val();
            }
        }
        if (($('#select1').val() == undefined) && ($('#select2').val() != 0)) {
            sdata.large_people = $('#select2').val();
        }
        ajaxPromise('module/search/controller/controller_search.php?op=autocomplete', 'POST', 'JSON', sdata)
            .then(function (data) {
                $('#searchAuto').empty();
                $('#searchAuto').fadeIn(10000000);
                for (row in data) {
                    $('<div></div>').appendTo('#search_auto').html(data[row].city).attr({ 'class': 'searchElement', 'id': data[row].city });
                }
                $(document).on('click', '.searchElement', function () {
                    $('.form-control').val(this.getAttribute('id'));
                    $('#search_auto').fadeOut(1000);
                });
                $(document).on('click scroll', function (event) {
                    if (event.target.id !== 'autocom') {
                        $('#search_auto').fadeOut(1000);
                    }
                });
            }).catch(function () {
                $('#search_auto').fadeOut(500);
            });
    });
}

function button_search() {
    $('.btn-primary').on('click', function () {
        var search = [];
        
        if ($('#select1').val() != undefined) {
            search.push({ "type": [$('#select1').val()] })
            if ($('#select2').val() != undefined) {
                search.push({ "city": [$('#select2').val()] })
            }
            if ($('.form-control').val() != undefined) {
                search.push({ "city": [$('.form-control').val()] })
            }
        } else if ($('#select1').val() == undefined) {
            if ($('#select2').val() != undefined) {
                search.push({ "category": [$('#select2').val()] })
            }
            if ($('.form-control').val() != undefined) {
                search.push({ "city": [$('.form-control').val()] })
            }
        }
        localStorage.removeItem('filters_search');
        if (search.length != 0) {
            localStorage.setItem('filters_search', JSON.stringify(search));
        }
        window.location.href = 'index.php?modules=shop&op=list';
    });
}

$(document).ready(function () {
    launch_search();
    autocomplete();
    button_search();
});