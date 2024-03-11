<?php
$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/module/shop/model/DAO_shop.php");

switch ($_GET['op']) {
    case 'dynamic_search_city':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_search_city();

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'dynamic_search_operation':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_search_operations();

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
