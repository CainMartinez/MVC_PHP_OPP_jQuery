<?php
    require_once "JWT.php";

    function create_token($username){
        $jwt = parse_ini_file('C:/sites/.env.ini');
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        
        $payload = '{"iat":"' . time() . '","exp":"' . time() + (600) . '","username":"' . $username . '"}';
        
        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);
        // error_log($token . "\n", 3, "debug.txt");
        return $token;
    }
    function decode_token($token){
        $jwt = parse_ini_file('jwt.ini');
        $secret = $jwt['secret'];
        
        $JWT = new JWT;
        $token_dec = $JWT->decode($token, $secret);
        
        $rt_token = json_decode($token_dec, TRUE);
        return $rt_token["username"];
    }
    // $token = create_token("yomogan");
    // echo $token; echo '<br>';
    // $username = decode_token($token);
    // echo $username;
?>