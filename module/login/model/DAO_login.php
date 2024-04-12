<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");
    class DAOLogin{

        function registerUser($username, $email, $passwd) {
            $hashed_pass = password_hash($passwd, PASSWORD_DEFAULT, ['cost' => 12]);
            $hashavatar = md5(strtolower(trim($email))); 
            $avatar = "https://i.pravatar.cc/500?u=$hashavatar";
            $sql = "INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`) 
            VALUES ('$username','$hashed_pass','$email','client','$avatar')";
            //error_log($sql, 3, "debug.txt");
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
        }
        function select_user($username){
			$sql = "SELECT `username`, `password`, `email`, `type_user`, `avatar` FROM `users` WHERE username='$username'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            // error_log($sql . "\n", 3, "debug.txt");
            if ($res) {
                $value = get_object_vars($res);
                return $value;
            }else {
                return "error_user";
            }
        }
        function select_data_user($username){
			$sql = "SELECT * FROM users WHERE username='$username'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
        }
    }
?>