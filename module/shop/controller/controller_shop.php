<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/module/shop/model/DAO_shop.php");
    @session_start();
    if (isset($_SESSION["tiempo"])) {  
        $_SESSION["tiempo"] = time();
    }
switch ($_GET['op']) {
    case 'order_properties':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_order_properties($_POST['filters_shop'],$_POST['offset'],$_POST['order']);
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
    case 'like_property':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->like_property($_POST['id'],$_POST['user'['username']]);
            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'list':
        include('module/shop/view/shop.html');
        break;
    case 'similar_properties':
        try{
            $daoshop = new DAOShop();
            $SelectRecomendation = $daoshop->select_similar_properties($_POST['id']);
        } catch(Exception $e){
            echo json_encode("error");
        }
        
        if(!empty($SelectRecomendation)){
            echo json_encode($SelectRecomendation); 
        }
        else{
            echo json_encode("error");
        }
        break;
    case 'all_properties':
        // error_log("order: " . print_r($_POST['order'], true), 3, "debug.txt");
        // return false;
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_all_properties($_POST['offset'],$_POST['order']);
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

        //     // echo json_encode("Entra correcto al HOME_FILTER php");
        //     // echo json_encode($_POST['filters_home']);
        //     // break;
        //     $daoshop = new DAOShop();
        //     $Dates_Properties = $daoshop->select_filter_home($_POST['filters_home']);
        //     // echo json_encode($Dates_Properties);
        //     // break;

        //     $Date_images = $daoshop->select_images_property();

        //     foreach ($Dates_Properties as $key => $property) {
        //         $Dates_Properties[$key]['images'] = array_values(array_filter($Date_images, function ($image) use ($property) {
        //             return $image['id_property'] == $property['id_property'];
        //         }));
        //     }

        //     if (!empty($Dates_Properties)) {
        //         echo json_encode($Dates_Properties);
        //     } else {
        //         echo json_encode("error");
        //     }

        break;

    case 'details_property':
        try {
            $daoshop = new DAOShop();
            $Date_property = $daoshop->select_details_property($_GET['id']);
            $Date_images = $daoshop->select_imgs_property($_GET['id']);
            $daoshop->incrementVisits($_GET['id']);
            $daoshop->insertCurrentDate($_GET['id']);
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
            // error_log("filters_shop: " . print_r($_POST['filters_shop'], true), 3, "debug.txt");
            // error_log("offset: " . print_r($_POST['offset'], true), 3, "debug.txt");
            $Dates_Properties = $daoshop->filters_shop($_POST['filters_shop'], $_POST['offset'],$_POST['order']);
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
    case 'dynamic_city':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_city();

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'dynamic_type':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_type();

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'dynamic_operation':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_operations();

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'dynamic_large_people':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_large_people();

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'dynamic_extras':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_extras();

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'dynamic_category':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->select_categories();

            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'search_filter':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->search_filter($_POST['filters_search'],$_POST['offset']);            
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
    case 'pagination_filters':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->counting_filters($_POST['filters_shop']);
            if (!empty($Dates_Properties)) {
                echo json_encode($Dates_Properties);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;
    case 'pagination':
        try {
            $daoshop = new DAOShop();
            $Dates_Properties = $daoshop->counting();
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