<?php
$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/model/connect.php");

class DAOShop{
	function select_all_properties($total_prod,$items_page){
		// $sql = "SELECT * 
		// FROM property p, property_type t, property_category c
		// WHERE t.id_property = p.id_property
		// AND c.id_property = p.id_property
		// ORDER BY p.id_property DESC
		// LIMIT $total_prod, $items_page";
		$sql = "SELECT *
		FROM property p
		ORDER BY p.id_property DESC
		LIMIT $total_prod, $items_page";
		

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$retrArray = array();
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$retrArray[] = $row;
			}
		}
		return $retrArray;
	}

	function select_one_property($id){
		// $sql = "SELECT * 
		// FROM property p, property_type t, property_category c, property_extras e,city ci
		// WHERE p.id_property = '$id'
		// AND t.id_property = p.id_property
		// AND c.id_property = p.id_property
		// AND e.id_property = p.id_property
		// AND ci.id_city = p.id_city";
	
		$sql = "SELECT p.*,	c.name_city,
		(SELECT GROUP_CONCAT(DISTINCT t.name_type) FROM property_type pt JOIN type t ON pt.id_type = t.id_type WHERE pt.id_property = p.id_property) as types,
		(SELECT GROUP_CONCAT(DISTINCT e.name_extras) FROM property_extras pe JOIN extras e ON pe.id_extras = e.id_extras WHERE pe.id_property = p.id_property) as extras,
		(SELECT GROUP_CONCAT(DISTINCT cat.name_category) FROM property_category pc JOIN category cat ON pc.id_category = cat.id_category WHERE pc.id_property = p.id_property) as categories,
		(SELECT GROUP_CONCAT(DISTINCT o.name_operation) FROM property_operation po JOIN operation o ON po.id_operation = o.id_operation WHERE po.id_property = p.id_property) as operations
		FROM property p
		LEFT JOIN city c ON p.id_city = c.id_city
		WHERE p.id_property = '$id'";
		

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql)->fetch_object();
		connect::close($conexion);

		return $res;
	}

	function select_imgs_property($id){
		$sql = "SELECT *
			    FROM images
			    WHERE id_property = '$id'";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$imgArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($imgArray, $row);
			}
		}
		return $imgArray;
	}
}
