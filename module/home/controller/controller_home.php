<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/module/home/model/DAO_home.php");

    switch ($_GET['op']) {
        case 'list';
            include ('module/home/view/home.html');
        break;

        case 'Carrousel_Type';
            try{
                $daohome = new DAOHome();
                $SelectType = $daohome->select_type();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectType)){
                echo json_encode($SelectType); 
            }
            else{
                echo json_encode("error");
            }
        break;

        case 'Category';
            try{
                $daohome = new DAOHome();
                $SelectCategory = $daohome->select_categories();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectCategory)){
                echo json_encode($SelectCategory); 
            }
            else{
                echo json_encode("error");
            }
        break;

        case 'Operation';
            try{
                $daohome = new DAOHome();
                $SelectOperation = $daohome->select_operation();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectOperation)){
                echo json_encode($SelectOperation); 
            }
            else{
                echo json_encode("error");
            }
        break;

        case 'City';
            try{
                $daohome = new DAOHome();
                $SelectCity = $daohome->select_city();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectType)){
                echo json_encode($SelectType); 
            }
            else{
                echo json_encode("error");
            }
        break;

        default;
            include("views/inc/error404.html");
        break;
    }
?>