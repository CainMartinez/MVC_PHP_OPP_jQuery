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
        function loginUser($username, $passwd) {
            $hashed_pass = password_hash($passwd, PASSWORD_DEFAULT, ['cost' => 12]);

            $sql = "CALL loginUserSinPassword('".$username."','".$hashed_pass."',@res);";
            $sql .= "SELECT @res AS resultado;";

            $conexion = connect::con();
            mysqli_multi_query($conexion, $sql);
            // Recorremos el retorno de mysql para comprobar si hay resultado hasta que lo encontramos y lo devolvemos con do-while
            $resultado = null;
            do {
                if ($result = mysqli_store_result($conexion)) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $resultado = $row['resultado'];
                    }
                    mysqli_free_result($result);
                }
            } while (mysqli_next_result($conexion));

            connect::close($conexion);

            return $resultado;
        }
        function selectDataUser($username){  
            $sql = "SELECT users.* FROM users WHERE users.username LIKE '".$username."'";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);

            $retrArray = array();
            if(mysqli_num_rows($res)>0){
                while($row = mysqli_fetch_assoc($res)){
                    $retrArray[] = $row;
                }
            }
            return $retrArray;
        }
    }
?>