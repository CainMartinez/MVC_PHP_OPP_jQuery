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
        $jwt_local = parse_ini_file('C:/sites/.env.ini');
        $secret = $jwt_local['JWT_SECRET'];
        
        $JWT = new JWT;
        $token_dec = $JWT->decode($token, $secret);
        
        $rt_token = json_decode($token_dec, TRUE);
        return $rt_token;
    }
    function refresh_token($username){
        $jwt = parse_ini_file('C:/sites/.env.ini');
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        
        $payload = '{"iat":"' . time() . '","exp":"' . time() + (30) . '","username":"' . $username . '"}';
        
        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);
        // error_log($token . "\n", 3, "debug.txt");
        return $token;
    }
?>