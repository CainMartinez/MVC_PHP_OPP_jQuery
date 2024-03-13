<?php

$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/model/connect.php");

class DAOSearch{
	
	function select_auto($complete, $name_type, $name_city){
		if (!empty($name_type) && empty($name_city)){
			return $this->select_type($complete, $name_type);
		} else if (!empty($name_type) && !empty($name_city)){
			return $this->select_auto_type_city($complete, $name_type, $name_city);
		} else if (empty($name_type) && !empty($name_city)){
			return $this->select_city($name_city, $complete);
		} else {
			return $this->select_autos($complete);
		}
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
	function select_type_null(){
		$sql = "SELECT DISTINCT * FROM type";

		$conexion = connect::con();
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
	function select_search_type($city){
		error_log($city, 3, "debug.txt");
		$sql = "SELECT DISTINCT t.name_type
		FROM type t,property_type pt,property p
		WHERE t.id_type = pt.id_type 
		AND pt.id_property = p.id_property
		AND p.id_city='$city'";
	
		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);
		// error_log($sql, 3, "debug.txt");

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