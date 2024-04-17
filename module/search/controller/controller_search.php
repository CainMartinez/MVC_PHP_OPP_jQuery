<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/module/search/model/DAO_search.php");
    @session_start();
    if (isset($_SESSION["tiempo"])) {  
        $_SESSION["tiempo"] = time();
    }
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
        try {
            $daosearch = new DAOSearch();
            if (isset($_POST['id_city'])) {
                $Dates_Properties = $daosearch->select_search_type($_POST['id_city']);
            } else {
                $Dates_Properties = $daosearch->select_search_type();
            }

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
            $Dates_Properties = $daosearch->select_auto($_POST['id_city'], $_POST['id_type'], $_POST['complete'] );

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
