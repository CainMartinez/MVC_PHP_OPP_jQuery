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

	function select_one_property($id){
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
	function select_type_property($id){
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
		while($row = mysqli_fetch_assoc($res)){
			$result[] = $row;
		}
		connect::close($conexion);

		return $result;
	}

	function select_operation_property($id){
		$sql = "SELECT p.id_property,GROUP_CONCAT(o.name_operation)operation_concat
		FROM property p
		INNER JOIN property_operation po ON p.id_property = po.id_property
		INNER JOIN operation o ON po.id_operation = o.id_operation
		WHERE p.id_property = '$id'
		GROUP BY p.id_property";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		$result = array();
		while($row = mysqli_fetch_assoc($res)){
			$result[] = $row;
		}
		connect::close($conexion);

		return $result;
	}

	function select_category_property($id){
		$sql = "SELECT p.id_property,GROUP_CONCAT(c.name_category)category_concat
		FROM property p
		INNER JOIN property_category pc ON p.id_property = pc.id_property
		INNER JOIN category c ON pc.id_category = c.id_category
		WHERE p.id_property = '$id'
		GROUP BY p.id_property";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		$result = array();
		while($row = mysqli_fetch_assoc($res)){
			$result[] = $row;
		}
		connect::close($conexion);

		return $result;
	}

	function select_extras_property($id){
		$sql = "SELECT p.id_property,GROUP_CONCAT(e.name_extras)extras_concat
		FROM property p
		INNER JOIN property_extras pe ON p.id_property = pe.id_property
		INNER JOIN extras e ON pe.id_extras = e.id_extras
		WHERE p.id_property = '$id'
		GROUP BY p.id_property";
		
		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		$result = array();
		while($row = mysqli_fetch_assoc($res)){
			$result[] = $row;
		}
		connect::close($conexion);

		return $result;
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

	function select_filter_property(){
		$total_prod =  $_POST['total_prod'];
		$items_page =  $_POST['items_page'];

		// Recoger las variables de cada uno de los filtros que vienen parseadas de antes
		$category = $_GET['category'];
		$operation = $_GET['operation'];
		$type = $_GET['type'];
		$city = $_GET['city'];
		$extras = $_GET['extras'];

		// Guardaremos los filtros pulsados dependiendo de si están llenos o no
		$filters = "";

		if ($category != '*') {
			$filters .= " AND category = '" . $category . "'";
		}
		if ($operation != '*') {
			$filters .= " AND operation = '" . $operation . "'";
		}
		if ($type != '*') {
			$filters .= " AND type = '" . $type . "'";
		}
		if ($city != '*') {
			$filters .= " AND city = '" . $city . "'";
		}
		if ($extras != '*') {
			$exp_extras = explode(",", $extras);
			for ($i = 0; $i < sizeof($exp_extras); $i++) {
				if ($i == 0) {
					$filters .= " AND (extras ='" . $exp_extras[$i] . "'";
				} else if ($i == (sizeof($exp_extras) - 1)) {
					$filters .= " OR extras = '" . $exp_extras[$i] . "')";
				} else {
					$filters .= " OR extras = '" . $exp_extras[$i] . "'";
				}
				if (sizeof($exp_extras) == 1) {
					$filters .= ")";
				}
			}
		}

		if ($category == '*' && $operation == '*' && $type == '*' && $city == '*' && $extras == '*') {
			$sql = "SELECT p.*, c.name_city, t.name_type, o.name_operation, e.name_extras
			FROM properties p, city c, type t, operation o, extras e
			WHERE p.id_city = c.id_city 
			AND p.id_type = t.id_type
			AND p.id_operation = o.id_operation
			AND p.id_extras = e.id_extras";		
		} else {
			$sql = "SELECT p.*, c.name_city, t.name_type, o.name_operation, e.name_extras
			FROM properties p, city c, type t, operation o, extras e
			WHERE p.id_city = c.id_city 
			AND p.id_type = t.id_type
			AND p.id_operation = o.id_operation
			AND p.id_extras = e.id_extras
			AND $filters";
		}

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$filtArray = array();
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$filtArray[] = $row;
			}
		}
		return $filtArray;
	}
	function select_filter_home(){
		$opc_filter = $_GET['opc'];
		$filter = "";

		if ($opc_filter == "brand") {
			$brand = $_GET['brand'];
			$filter = "m.id_brand = '" . $brand . "'";
		} else if ($opc_filter == "cate") {
			$category = $_GET['category'];
			$filter = "ca.name_cat = '" . $category . "'";
		} else {
			$type_motor = $_GET['motor'];
			$filter = "t.name_tmotor = '" . $type_motor . "'";
		}

		$sql = "SELECT c.*,m.id_brand, m.name_model, t.name_tmotor, ca.name_cat
    	FROM car c, model m, type_motor t, category ca
    	WHERE  c.model = m.id_model 
    	AND c.category = ca.id_cat
    	AND c.motor = t.cod_tmotor
    	AND $filter";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$carArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($carArray, $row);
			}
		}
		return $carArray;
	}
	
}
