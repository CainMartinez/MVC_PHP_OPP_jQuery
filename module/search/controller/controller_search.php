<?php
$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/module/search/model/DAO_search.php");

switch ($_GET['op']) {
    case 'dynamic_search_city':
        try {
            $daosearch = new DAOSearch();
            $Dates_Properties = $daosearch->select_search_city();

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'dynamic_search_type':

        $city = $_POST['id_city'];
        try {
            $daosearch = new DAOSearch();
            $Dates_Properties = $daosearch->select_search_type($city);

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        error_log($city, 3, "debug.txt");

        break;
    case 'dynamic_search_type_null':
        try {
            $daosearch = new DAOSearch();
            $Dates_Properties = $daosearch->select_type_null();

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'autocomplete':
        try {
            $daosearch = new DAOSearch();
            $Dates_Properties = $daosearch->select_auto($_POST['complete'], $_POST['name_type'], $_POST['name_city']);

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    default;
        include("views/inc/error404.html");
        break;
}
