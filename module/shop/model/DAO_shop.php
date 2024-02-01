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
	
		$sql = "SELECT *
		FROM property p
		WHERE p.id_property = '$id'";
		

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql)->fetch_object();
		connect::close($conexion);

		return $res;
	}

	function select_imgs_property($id){
		$sql = "SELECT id_property, path_images
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
