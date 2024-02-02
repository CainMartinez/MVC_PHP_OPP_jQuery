<?php
$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/module/shop/model/DAO_shop.php");

switch ($_GET['op']) {
    case 'list':
        include('module/shop/view/shop.html');
        break;

    case 'all_properties':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_all_properties();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_Properties)) {
            echo json_encode($Dates_Properties);
        } else {
            echo json_encode("error");
        }
        break;

    case 'details_property':
        try {
            $daoshop = new DAOShop();
            $Date_property = $daoshop->select_one_property($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_img = new DAOShop();
            $Date_images = $daoshop_img->select_imgs_property($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Date_property || $Date_images)) {
            $rdo = array();
            $rdo[0] = $Date_property;
            $rdo[1][] = $Date_images;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;

    default;
        include("views/inc/error404.html");
        break;
}
