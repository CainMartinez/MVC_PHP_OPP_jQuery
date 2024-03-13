<?php

$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/model/connect.php");

class DAOSearch{
	
	function select_auto($complete, $name_type, $name_city){
		if (!empty($name_type) && empty($name_city)){
			return $this->select_only_one_type($complete, $name_type);
		} else if (!empty($name_type) && !empty($name_city)){
			return $this->select_auto_type_city($complete, $name_type, $name_city);
		} else if (empty($name_type) && !empty($name_city)){
			return $this->select_only_one_city($name_city, $complete);
		} else {
			return $this->select_property($complete);
		}
	}
	function select_property($complete){
		$sql = "SELECT * FROM property WHERE property_name LIKE '$complete%'";
		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$retrArray = array();
		if ($res -> num_rows > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$retrArray[] = $row;
			}
		}
		return $retrArray;
	}
	function select_only_one_city($city, $complete){
		$sql = "SELECT *
		FROM property p
		AND p.id_city = '$city'
		AND p.property_name LIKE '$complete%'";
		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$retrArray = array();
		if ($res -> num_rows > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$retrArray[] = $row;
			}
		}
		return $retrArray;
	}
	function select_only_one_type($complete,$city){
		$sql = "SELECT *
		FROM property p, type t, property_type pt
		WHERE p.id_property = pt.id_property
		AND pt.id_type = t.id_type
		AND p.id_city = '$city'
		AND t.name_type LIKE '$complete%'";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$retrArray = array();
        if ($res -> num_rows > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
	}
	function select_auto_type_city($complete, $type, $city){
		$sql = "SELECT *
		FROM property p, type t, property_type pt
		WHERE p.id_property = pt.id_property
		AND pt.id_type = t.id_type
		AND p.id_city = '$city'
		AND t.id_type = '$type'
		AND p.name_property LIKE '$complete%'";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$retrArray = array();
		if ($res -> num_rows > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$retrArray[] = $row;
			}
		}
		return $retrArray;
	}
	function select_search_city(){
		$sql = "SELECT * FROM city";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$cityArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($cityArray, $row);
			}
		}
		return $cityArray;
	
	}
	function select_search_type($city = null){
		$conexion = connect::con();

		if ($city === null) {
			$sql = "SELECT DISTINCT * FROM type";
		} else {
			$sql = "SELECT DISTINCT t.name_type
			FROM type t,property_type pt,property p
			WHERE t.id_type = pt.id_type 
			AND pt.id_property = p.id_property
			AND p.id_city=$city";
		}

		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$typeArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($typeArray, $row);
			}
		}
		return $typeArray;
	}
		// error_log($filters_shop['id_extras'], 3, "debug.txt");
		
}