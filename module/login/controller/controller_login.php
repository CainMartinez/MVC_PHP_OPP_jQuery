<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/module/login/model/DAO_login.php");

    @session_start();
    switch ($_GET['op']) {
        case 'register':
            try{
                $daoRegister = new DAOLogin();
                $rdo = $daoRegister -> registerUser($_POST['usernameRegister'],$_POST['emailRegister'],$_POST['passwordRegister'],$_POST['f_nacimientoRegister']);
            } catch (Exception $e){
                echo json_encode("error");
            }
    
            echo json_encode($rdo); 
    
            break;
        
        case 'login':
            // echo json_encode($_POST['passwordLogin']);
            try {
                $daoLogin = new DAOLogin();
                $rdo = $daoLogin -> loginUser($_POST['usernameLogin'],$_POST['passwordLogin']);
            } catch(Exception $e) {
                echo json_encode("error");
            }
    
            if($rdo == "error_username"){ 
                echo json_encode("error_username");
                exit;
            } else if(password_verify($_POST['passwordLogin'], $rdo)) {
                $_SESSION['username'] = $_POST['usernameLogin'];
                $_SESSION['time_out'] = time();
                echo json_encode($output);
                exit;
            } else {
                echo json_encode("error_password");
                exit;
            }
    
            echo json_encode($rdo);
            break;
            
        case 'logout':
            unset($_SESSION['username']);
            unset($_SESSION['time_out']);
            session_destroy();
    
            echo json_encode('Done');
            break;
    }
?>