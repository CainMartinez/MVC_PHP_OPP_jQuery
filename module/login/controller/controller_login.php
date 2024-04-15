<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/module/login/model/DAO_login.php");
    include($path . "/model/middleware_auth.php");


    @session_start();
    switch ($_GET['op']) {
        case 'register':
            // error_log('ctlr reg', 3, "debug.txt");
            try{
                $daoRegister = new DAOLogin();
                $rdo = $daoRegister -> registerUser($_POST['usernameRegister'],$_POST['emailRegister'],$_POST['passwordRegister']);
                
            } catch (Exception $e){
                echo json_encode("error");
            }
            echo json_encode($rdo);     
    
        break;
        
        case 'login':
            // echo json_encode($_POST['usernameLogin']);
            try {
                // error_log($_POST['usernameLogin'] . "\n", 3, "debug.txt");
                // error_log($_POST['passwordLogin'] . "\n", 3, "debug.txt");
                $daoLog = new DAOLogin();
                $rdo = $daoLog->select_user($_POST['usernameLogin']);
                if ($rdo == "error_user") {
                    echo json_encode("error_user");
                    exit;
                } else {
                    if (password_verify($_POST['passwordLogin'], $rdo['password'])) {
                        $token= create_token($rdo["username"]);
                        $_SESSION['usernameLogin'] = $rdo['username']; //Guardamos el usario 
                        $_SESSION['tiempo'] = time(); //Guardamos el tiempo que se logea
                        echo json_encode($token);
                        exit;
                    } else {
                        echo json_encode("error_password");
                        exit;
                    }
                }
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }
        break;
            
        case 'logout':
            unset($_SESSION['username']);
            unset($_SESSION['tiempo']);
            session_destroy();
    
            echo json_encode('Done');
            break;
    
        case 'data_user':
            // error_log($_POST['token']."token" . "\n", 3, "debug.txt");
            $json = decode_token($_POST['token']);
            // error_log($json['username']."username" . "\n", 3, "debug.txt");
            $daoLog = new DAOLogin();
            $rdo = $daoLog->select_data_user($json['username']);
            echo json_encode($rdo);
            exit;
            break;
    
        case 'actividad':
            if (!isset($_SESSION["tiempo"])) {
                echo json_encode("inactivo");
                exit();
            } else {
                if ((time() - $_SESSION["tiempo"]) >= 1800) { //1800s=30min
                    echo json_encode("inactivo");
                    exit();
                } else {
                    echo json_encode("activo");
                    exit();
                }
            }
            break;
        case 'controluser':
            $token_dec = decode_token($_POST['token']);
    
            if ($token_dec['exp'] < time()) {
                echo json_encode("Wrong_User");
                exit();
            }
    
            if (isset($_SESSION['username']) && ($_SESSION['username']) == $token_dec['username']) {
                echo json_encode("Correct_User");
                exit();
            } else {
                echo json_encode("Wrong_User");
                exit();
            }
            break;
    
        case 'refresh_token':
            $old_token = decode_token($_POST['token']);
            $new_token = create_token($old_token['username']);
            echo json_encode($new_token);
            break;
    
        case 'refresh_cookie':
            session_regenerate_id();
            echo json_encode("Done");
            exit;
            break;
    
    }
?>