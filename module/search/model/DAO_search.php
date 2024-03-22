<?php

$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/model/connect.php");

class DAOSearch{
	
	function select_auto($name_city, $name_type, $complete){
		if (!empty($name_city) && empty($name_type)){
			return $this->select_only_one_city($name_city, $complete);
		} else if (!empty($name_type) && !empty($name_city)){
			return $this->select_auto_type_city($name_city, $name_type, $complete);
		} else if (!empty($name_type) && empty($name_city)){
			return $this->select_only_one_type($name_type, $complete);
		} else {
			return $this->select_category($complete);
		}
	}
	function select_category($complete){
		
		$sql = "SELECT DISTINCT c.name_category,c.id_category
		FROM property p,property_category pc,category c 
		WHERE p.id_property = pc.id_property
		AND pc.id_category = c.id_category
		AND c.name_category LIKE '$complete%'";
		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);

		// error_log($sql, 3, "debug.txt");

		connect::close($conexion);
		$retrArray = array();
		if ($res -> num_rows > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$retrArray[] = $row;
			}
		}
		return $retrArray;
	}
	function select_only_one_type($type, $complete){
		$sql = "SELECT DISTINCT c.name_category 
		FROM property p,property_category pc,category c,type t,property_type pt
		WHERE p.id_property = pc.id_property
		AND pc.id_category = c.id_category
        AND pt.id_type = t.id_type
        AND pt.id_property = p.id_property
		AND t.id_type = '$type'
		AND c.name_category LIKE '$complete%'";
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
	function select_only_one_city($city,$complete){
		$sql = "SELECT DISTINCT c.name_category 
		FROM property p,property_category pc,category c 
		WHERE p.id_property = pc.id_property
		AND pc.id_category = c.id_category
		AND p.id_city = '$city'
		AND c.name_category LIKE '$complete%'";

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
	function select_auto_type_city($city, $type, $complete){
		$sql = "SELECT DISTINCT c.name_category 
		FROM property p,property_category pc,category c,type t,property_type pt
		WHERE p.id_property = pc.id_property
		AND pc.id_category = c.id_category
        AND pt.id_type = t.id_type
        AND pt.id_property = p.id_property
		AND t.id_type = '$type'
        AND p.id_city = '$city'
		AND c.name_category LIKE '$complete%'";

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
			$sql = "SELECT DISTINCT *
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