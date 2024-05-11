<?php
	class connect{
		public static function con(){
			$env = parse_ini_file('C:/sites/.env.ini');

			$host = $env['DB_HOST'];
			$db= $env['DB_NAME'];
			$pass = $env['DB_PASSWORD'];
			$user = $env['DB_USER'];                     
    		$port = $env['DB_PORT'];
    		
    		$conection = mysqli_connect($host, $user, $pass, $db, $port);
			if (!$conection) {
				die("Conection error: " . mysqli_connect_error());
			}
			return $conection;
		}
		public static function close($conection){
			mysqli_close($conection);
		}
	}