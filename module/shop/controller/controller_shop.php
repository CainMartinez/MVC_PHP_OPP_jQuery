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
            $Date_images = $daoshop->select_images_property();

            foreach ($Dates_Properties as $key => $property) {
                $Dates_Properties[$key]['images'] = array_values(array_filter($Date_images, function ($image) use ($property) {
                    return $image['id_property'] == $property['id_property'];
                }));
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

    case 'home_filter':

        // echo json_encode("Entra correcto al HOME_FILTER php");
        // echo json_encode($_POST['filters_home']);
        // break;
        $daoshop = new DAOShop();
        $Dates_Properties = $daoshop->select_filter_home($_POST['filters_home']);
        // echo json_encode($Dates_Properties);
        // break;

        $Date_images = $daoshop->select_images_property();

        foreach ($Dates_Properties as $key => $property) {
            $Dates_Properties[$key]['images'] = array_values(array_filter($Date_images, function ($image) use ($property) {
                return $image['id_property'] == $property['id_property'];
            }));
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
            $Date_property = $daoshop->select_details_property($_GET['id']);
            $Date_images = $daoshop->select_imgs_property($_GET['id']);
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

    case 'filters_shop':

        try {
            $daoshop = new DAOShop();
            // $Dates_Properties = $daoshop->select_all_properties();

            $Dates_Properties = $daoshop->filters_shop($_POST['filters_shop']);
            $Date_images = $daoshop->select_images_property();

            foreach ($Dates_Properties as $key => $property) {
                $Dates_Properties[$key]['images'] = array_values(array_filter($Date_images, function ($image) use ($property) {
                    return $image['id_property'] == $property['id_property'];
                }));
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
    case 'dynamic_filters_shop':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_all_properties();

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
