<?php

$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/model/connect.php");

class DAOShop{
	function select_all_properties(){
		$sql = "SELECT DISTINCT p.*,c.*
		FROM property p, city c
		WHERE p.id_city = c.id_city
        GROUP BY p.id_property
		ORDER BY p.id_property DESC";


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
	function select_images_property(){
		$sql = "SELECT *
			    FROM images";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$imagesArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($imagesArray, $row);
			}
		}
		return $imagesArray;
	}
	function select_filter_home($filters_home){
		$sql = "SELECT *
		FROM property p, city c, property_type pt, property_operation po, property_category pc, property_extras pe
		WHERE p.id_city = c.id_city 
		AND p.id_property = pt.id_property 
		AND p.id_property = po.id_property 
		AND p.id_property = pc.id_property 
		AND p.id_property = pe.id_property";

		if (isset($filters_home[0]['category'])) {
			$category = $filters_home[0]['category'][0];
			$sql .= " AND pc.id_category = '$category'";
		} else if (isset($filters_home[0]['type'])) {
			$type = $filters_home[0]['type'][0];
			$sql .= " AND pt.id_type = '$type'";
		} else if (isset($filters_home[0]['operation'])) {
			$operation = $filters_home[0]['operation'][0];
			$sql .= " AND po.id_operation = '$operation'";
		} else if (isset($filters_home[0]['extras'])) {
			$extras = $filters_home[0]['extras'][0];
			$sql .= " AND pe.id_extras= '$extras'";
		} else if (isset($filters_home[0]['city'])) {
			$city = $filters_home[0]['city'][0];
			$sql .= " AND c.id_city = '$city'";
		}
		$sql .= " GROUP BY p.id_property;";
		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$retrArray = array();
		if ($res->num_rows > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$retrArray[] = $row;
			}
		}
		return $retrArray;
	}
	function select_images_filter_home(){
		$sql = "SELECT *
			    FROM images";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$imagesArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($imagesArray, $row);
			}
		}
		return $imagesArray;
	}
	function select_details_property($id){
		$sql = "SELECT p.*, c.name_city,lp.name_large_people,
				(SELECT GROUP_CONCAT(t.name_type) FROM property_type pt INNER JOIN type t ON pt.id_type = t.id_type WHERE pt.id_property = p.id_property) as type_concat,
				(SELECT GROUP_CONCAT(o.name_operation) FROM property_operation po INNER JOIN operation o ON po.id_operation = o.id_operation WHERE po.id_property = p.id_property) as operation_concat,
				(SELECT GROUP_CONCAT(c.name_category) FROM property_category pc INNER JOIN category c ON pc.id_category = c.id_category WHERE pc.id_property = p.id_property) as category_concat,
				(SELECT GROUP_CONCAT(e.name_extras) FROM property_extras pe INNER JOIN extras e ON pe.id_extras = e.id_extras WHERE pe.id_property = p.id_property) as extras_concat
				FROM property p
				INNER JOIN city c ON p.id_city = c.id_city
				INNER JOIN large_people lp ON p.id_large_people = lp.id_large_people
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
	function filters_shop($filters_shop){
		error_log(print_r($filters_shop, true), 3, "debug.txt");

		$consulta = "SELECT p.*, c.name_city,lp.name_large_people,
			(SELECT GROUP_CONCAT(t.name_type) FROM property_type pt INNER JOIN type t ON pt.id_type = t.id_type WHERE pt.id_property = p.id_property) as type_concat,
			(SELECT GROUP_CONCAT(o.name_operation) FROM property_operation po INNER JOIN operation o ON po.id_operation = o.id_operation WHERE po.id_property = p.id_property) as operation_concat,
			(SELECT GROUP_CONCAT(c.name_category) FROM property_category pc INNER JOIN category c ON pc.id_category = c.id_category WHERE pc.id_property = p.id_property) as category_concat,
			(SELECT GROUP_CONCAT(e.name_extras) FROM property_extras pe INNER JOIN extras e ON pe.id_extras = e.id_extras WHERE pe.id_property = p.id_property) as extras_concat
			FROM property p
			INNER JOIN city c ON p.id_city = c.id_city
			INNER JOIN large_people lp ON p.id_large_people = lp.id_large_people";

		foreach ($filters_shop as $key => $value) {
			if (isset($filters_shop[$key])) {
				if (strpos($consulta, 'WHERE') !== false) {
					switch ($key) {
						case 'id_city':
							$consulta .= " AND c.id_city = " . $filters_shop['id_city'];
							break;
						case 'id_large_people':
							$consulta .= " AND lp.id_large_people = " . $filters_shop['id_large_people'];
							break;
						case 'id_type':
							$consulta .= " AND p.id_property IN (SELECT pt.id_property FROM property_type pt WHERE pt.id_type = " . $filters_shop['id_type'] . ")";
							break;
						case 'id_operation':
							$consulta .= " AND p.id_property IN (SELECT po.id_property FROM property_operation po WHERE po.id_operation = " . $filters_shop['id_operation'] . ")";
							break;
						case 'id_category':
							$consulta .= " AND p.id_property IN (SELECT pc.id_property FROM property_category pc WHERE pc.id_category = " . $filters_shop['id_category'] . ")";
							break;
						case 'id_extras':
							$consulta .= " AND p.id_property IN (SELECT pe.id_property FROM property_extras pe WHERE pe.id_extras = " . $filters_shop['id_extras'] . ")";
							break;
					}
				} else {
					switch ($key) {
						case 'id_city':
							$consulta .= " WHERE c.id_city = " . $filters_shop['id_city'];
							break;
						case 'id_large_people':
							$consulta .= " WHERE lp.id_large_people = " . $filters_shop['id_large_people'];
							break;
						case 'id_type':
							$consulta .= " WHERE p.id_property IN (SELECT pt.id_property FROM property_type pt WHERE pt.id_type = " . $filters_shop['id_type'] . ")";
							break;
						case 'id_operation':
							$consulta .= " WHERE p.id_property IN (SELECT po.id_property FROM property_operation po WHERE po.id_operation = " . $filters_shop['id_operation'] . ")";
							break;
						case 'id_category':
							$consulta .= " WHERE p.id_property IN (SELECT pc.id_property FROM property_category pc WHERE pc.id_category = " . $filters_shop['id_category'] . ")";
							break;
						case 'id_extras':
							$consulta .= " WHERE p.id_property IN (SELECT pe.id_property FROM property_extras pe WHERE pe.id_extras = " . $filters_shop['id_extras'] . ")";
							break;
					}
				}
			}
		}

		// error_log($consulta, 3, "debug.txt");

		$conexion = connect::con();
		$res = mysqli_query($conexion, $consulta);
		connect::close($conexion);

		$retrArray = array();
		if ($res -> num_rows > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$retrArray[] = $row;
			}
		}
		return $retrArray;
	}
}
