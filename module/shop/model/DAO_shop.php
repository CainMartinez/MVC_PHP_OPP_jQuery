<?php

$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/model/connect.php");

class DAOShop
{
	function select_all_properties()
	{
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
	function select_images_property()
	{
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
	function select_filter_home(){
		// return "hola";

		// return $_POST['filters_home'];
		// return "hola";
			
			$opt_filter = $_POST['filter_home'];
			$filter = "";

			if ($opt_filter == "type") {
				$type = $_POST['type'];
				$filter = " pt.type_id = '" . $type . "'";
			} else if ($opt_filter == "operation") {
				$operation = $_POST['operation'];
				$filter = " po.operation_id = '" . $operation . "'";
			} else if ($opt_filter == "category") {
				$category = $_POST['category'];
				$filter = " pc.category_id = '" . $category . "'";
			} else if ($opt_filter == "extras") {
				$extras = $_POST['extras'];
				$filter = " pe.extras_id = '" . $extras . "'";
			} else if ($opt_filter == "city") {
				$city = $_POST['city'];
				$filter = " p.id_city = '" . $city . "'";
			}

			$sql = "SELECT DISTINCT p.*,c.*
					FROM property p
					JOIN city c ON p.id_city = c.id_city
					LEFT JOIN property_type pt ON p.id = pt.property_id
					LEFT JOIN property_operation po ON p.id = po.property_id
					LEFT JOIN property_category pc ON p.id = pc.property_id
					LEFT JOIN property_extras pe ON p.id = pe.property_id
					WHERE $filter";
		
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
	
	function select_images_filter_home()
	{
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

	function select_one_property($id)
	{
		$sql = "SELECT DISTINCT p.*,c.name_city
		FROM property p, city c
		WHERE p.id_city = c.id_city
		AND p.id_property = '$id' 
		GROUP BY p.id_property
		ORDER BY p.id_property DESC";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql)->fetch_object();
		connect::close($conexion);

		return $res;
	}
	function select_type_property($id)
	{
		$sql = "SELECT p.id_property,GROUP_CONCAT(t.name_type)type_concat
		FROM property p
		INNER JOIN property_type pt ON p.id_property = pt.id_property
		INNER JOIN type t ON pt.id_type = t.id_type
		WHERE p.id_property = '$id'
		GROUP BY p.id_property";

		// $sql = "SELECT p.id_property, t.name_type
		// FROM property p
		// INNER JOIN property_type pt ON p.id_property = pt.id_property
		// INNER JOIN type t ON pt.id_type = t.id_type
		// WHERE p.id_property = '$id'";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		$result = array();
		while ($row = mysqli_fetch_assoc($res)) {
			$result[] = $row;
		}
		connect::close($conexion);

		return $result;
	}

	function select_operation_property($id)
	{
		$sql = "SELECT p.id_property,GROUP_CONCAT(o.name_operation)operation_concat
		FROM property p
		INNER JOIN property_operation po ON p.id_property = po.id_property
		INNER JOIN operation o ON po.id_operation = o.id_operation
		WHERE p.id_property = '$id'
		GROUP BY p.id_property";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		$result = array();
		while ($row = mysqli_fetch_assoc($res)) {
			$result[] = $row;
		}
		connect::close($conexion);

		return $result;
	}

	function select_category_property($id)
	{
		$sql = "SELECT p.id_property,GROUP_CONCAT(c.name_category)category_concat
		FROM property p
		INNER JOIN property_category pc ON p.id_property = pc.id_property
		INNER JOIN category c ON pc.id_category = c.id_category
		WHERE p.id_property = '$id'
		GROUP BY p.id_property";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		$result = array();
		while ($row = mysqli_fetch_assoc($res)) {
			$result[] = $row;
		}
		connect::close($conexion);

		return $result;
	}

	function select_extras_property($id)
	{
		$sql = "SELECT p.id_property,GROUP_CONCAT(e.name_extras)extras_concat
		FROM property p
		INNER JOIN property_extras pe ON p.id_property = pe.id_property
		INNER JOIN extras e ON pe.id_extras = e.id_extras
		WHERE p.id_property = '$id'
		GROUP BY p.id_property";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		$result = array();
		while ($row = mysqli_fetch_assoc($res)) {
			$result[] = $row;
		}
		connect::close($conexion);

		return $result;
	}

	function select_imgs_property($id)	{
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
