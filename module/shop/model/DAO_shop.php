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
	function select_filter_home($filters_home){
		$sql = "SELECT *
		FROM property p, city c, property_type pt, property_operation po, property_category pc, property_extras pe
		WHERE p.id_city = c.id_city 
		AND p.id_property = pt.id_property 
		AND p.id_property = po.id_property 
		AND p.id_property = pc.id_property 
		AND p.id_property = pe.id_property";

		if (isset($filters_home[0]['category'])){
			$category = $filters_home[0]['category'][0];
			$sql.= " AND pc.id_category = '$category'";
		}
		else if(isset($filters_home[0]['type'])) {
			$type = $filters_home[0]['type'][0];
			$sql.= " AND pt.id_type = '$type'";
		}
		else if(isset($filters_home[0]['operation'])) {
			$operation = $filters_home[0]['operation'][0];
			$sql.= " AND po.id_operation = '$operation'";
		}
		else if(isset($filters_home[0]['extras'])) {
			$extras = $filters_home[0]['extras'][0];
			$sql.= " AND pe.id_extras= '$extras'";
		}
		else if(isset($filters_home[0]['city'])) {
			$city = $filters_home[0]['city'][0];
			$sql.= " AND c.id_city = '$city'";
		}
		$sql .= " GROUP BY p.id_property;";
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
