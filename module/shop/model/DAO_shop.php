<?php

$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/model/connect.php");

class DAOShop{
	function incrementVisits($id_property) {
		$sql = "UPDATE property SET visits = visits + 1 WHERE id_property = ?";
	
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->bind_param("i", $id_property);
		$stmt->execute();
		connect::close($conexion);
	}
	function insertCurrentDate($id_property) {
		$sql = "UPDATE property SET currently_date = NOW() WHERE id_property = ?";

		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->bind_param("i", $id_property);
		$stmt->execute();
		connect::close($conexion);
	}
	function select_all_properties($offset = 0, $limit = 3){
		$sql = "SELECT DISTINCT p.*,c.*,i.path_images
		FROM property p, city c, images i
		WHERE p.id_city = c.id_city
		AND p.id_property = i.id_property
        GROUP BY p.id_property
		ORDER BY p.id_property DESC
		LIMIT $offset, $limit;";

		error_log($sql, 3, "debug.txt");
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
	function select_order_properties($filters_shop, $offset = 0, $limit = 3){
		$order = 'ASC';
		$filter = 'price';

		if ($filters_shop['order'] == 'price') {
			$order = 'DESC';
			$filter = 'price';
		}else if ($filters_shop['order'] == 'name') {
			$order = 'ASC';
			$filter = 'property_name';
		} else if ($filters_shop['order'] == 'visits') {
			$order = 'DESC';
			$filter = 'visits';
		}

		$sql = "SELECT DISTINCT p.*,c.*
		FROM property p, city c
		WHERE p.id_city = c.id_city";

		// Aplicar los otros filtros
		foreach ($filters_shop as $key => $value) {
			if (isset($filters_shop[$key]) && $key != 'order') {
				switch ($key) {
					case 'id_city':
						$sql .= " AND c.id_city = " . $filters_shop['id_city'];
						break;
					case 'id_large_people':
						$sql .= " AND p.id_large_people = " . $filters_shop['id_large_people'];
						break;
					case 'id_type':
						$sql .= " AND p.id_property IN (SELECT pt.id_property FROM property_type pt WHERE pt.id_type = " . $filters_shop['id_type'] . ")";
						break;
					case 'id_operation':
						$sql .= " AND p.id_property IN (SELECT po.id_property FROM property_operation po WHERE po.id_operation = " . $filters_shop['id_operation'] . ")";
						break;
					case 'id_category':
						$sql .= " AND p.id_property IN (SELECT pc.id_property FROM property_category pc WHERE pc.id_category = " . $filters_shop['id_category'] . ")";
						break;
					case 'id_extras':
						if (is_array($filters_shop['id_extras'])) {
							$extras = array_map('intval', $filters_shop['id_extras']);
							$conditions = [];
							foreach ($extras as $extra) {
								$conditions[] = "p.id_property IN (SELECT pe.id_property FROM property_extras pe WHERE pe.id_extras = $extra)";
							}
							$sql .= " AND " . implode(' AND ', $conditions);
						} else {
							$sql .= " AND p.id_property IN (SELECT pe.id_property FROM property_extras pe WHERE pe.id_extras = " . intval($filters_shop['id_extras']) . ")";
						}
						break;
					case 'minPrice':
						$sql .= " AND p.price >= " . $filters_shop['minPrice'];
						break;
					case 'maxPrice':
						$sql .= " AND p.price <= " . $filters_shop['maxPrice'];
						break;
				}
			}
		}

		$sql .= " GROUP BY p.id_property
		ORDER BY p.$filter $order
		LIMIT $offset, $limit;";
		error_log($sql, 3, "debug.txt");
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
	function search_filter($filters_search, $offset = 0, $limit = 3){
		$id_category = isset($filters_search['id_category']) ? $filters_search['id_category'] : null;
		$id_city = isset($filters_search['id_city']) ? $filters_search['id_city'] : null;
		$id_type = isset($filters_search['id_type']) ? $filters_search['id_type'] : null;

		$sql = "SELECT DISTINCT p.*,c.*,t.*,cat.*,i.path_images
		FROM property p, city c,type t,property_type pt,category cat, property_category pc, images i
		WHERE p.id_city = c.id_city
		AND pt.id_property = p.id_property
		AND cat.id_category = pc.id_category
		AND pc.id_property = p.id_property
		AND pt.id_type = t.id_type
		AND p.id_property = i.id_property"
		. ($id_type ? " AND t.id_type = $id_type" : "")
		. ($id_city ? " AND p.id_city = $id_city" : "")
		. ($id_category ? " AND cat.id_category = '$id_category'" : "") .
		" GROUP BY p.id_property
		ORDER BY p.id_property ASC
		LIMIT $offset, $limit;";

		error_log($sql, 3, "debug.txt");
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
	function select_city(){
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
	function select_type() {
		$sql= "SELECT * FROM `type` ORDER BY id_type ASC LIMIT 30;";

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
	function select_large_people(){
		$sql= "SELECT * FROM `large_people` ORDER BY id_large_people ASC LIMIT 30;";

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
	function select_extras() {
		$sql= "SELECT * FROM `extras`;";

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
	function select_categories() {
		$sql= "SELECT * FROM category";

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
	function select_operations(){
		$sql= "SELECT * FROM operation";

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
	// function select_filter_home($filters_home){
	// 	$sql = "SELECT *,i.path_images
	// 	FROM property p,large_people lp, city c, property_type pt, property_operation po, property_category pc, property_extras pe, images i
	// 	WHERE p.id_city = c.id_city
	// 	AND p.id_property = i.id_property
	// 	AND p.id_large_people = lp.id_large_people
	// 	AND p.id_property = pt.id_property 
	// 	AND p.id_property = po.id_property 
	// 	AND p.id_property = pc.id_property 
	// 	AND p.id_property = pe.id_property";

	// 	if (isset($filters_home[0]['id_category'])) {
	// 		$category = $filters_home[0]['id_category'][0];
	// 		$sql .= " AND pc.id_category = '$category'";
	// 	} else if (isset($filters_home[0]['id_type'])) {
	// 		$type = $filters_home[0]['id_type'][0];
	// 		$sql .= " AND pt.id_type = '$type'";
	// 	} else if (isset($filters_home[0]['id_operation'])) {
	// 		$operation = $filters_home[0]['id_operation'][0];
	// 		$sql .= " AND po.id_operation = '$operation'";
	// 	} else if (isset($filters_home[0]['id_extras'])) {
	// 		$extras = $filters_home[0]['id_extras'][0];
	// 		$sql .= " AND pe.id_extras= '$extras'";
	// 	} else if (isset($filters_home[0]['id_city'])) {
	// 		$city = $filters_home[0]['id_city'][0];
	// 		$sql .= " AND c.id_city = '$city'";
	// 	} else if (isset($filters_home[0]['id_large_people'])) {
	// 		$large_people = $filters_home[0]['id_large_people'][0];
	// 		$sql .= " AND lp.id_large_people = '$large_people'";
	// 	}
	// 	$sql .= " GROUP BY p.id_property;";
	// 	$conexion = connect::con();
	// 	$res = mysqli_query($conexion, $sql);
	// 	connect::close($conexion);
	// 	if (isset($filters_home[0]['id_category'])) {
	// 		$id_category = (string) $filters_home[0]['id_category'];
	// 		// error_log($id_category, 3, "debug.txt");
	// 	} else {
	// 		// error_log('id_category not set', 3, "debug.txt");
	// 	}		
	// 	$retrArray = array();
	// 	if ($res->num_rows > 0) {
	// 		while ($row = mysqli_fetch_assoc($res)) {
	// 			$retrArray[] = $row;
	// 		}
	// 	}
	// 	return $retrArray;
	// }
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
		$sql = "SELECT p.*, c.name_city,lp.name_large_people,i.path_images,
				(SELECT GROUP_CONCAT(t.name_type) FROM property_type pt INNER JOIN type t ON pt.id_type = t.id_type WHERE pt.id_property = p.id_property) as type_concat,
				(SELECT GROUP_CONCAT(o.name_operation) FROM property_operation po INNER JOIN operation o ON po.id_operation = o.id_operation WHERE po.id_property = p.id_property) as operation_concat,
				(SELECT GROUP_CONCAT(c.name_category) FROM property_category pc INNER JOIN category c ON pc.id_category = c.id_category WHERE pc.id_property = p.id_property) as category_concat,
				(SELECT GROUP_CONCAT(e.name_extras) FROM property_extras pe INNER JOIN extras e ON pe.id_extras = e.id_extras WHERE pe.id_property = p.id_property) as extras_concat
				FROM property p
				INNER JOIN city c ON p.id_city = c.id_city
				INNER JOIN large_people lp ON p.id_large_people = lp.id_large_people
				INNER JOIN images i ON p.id_property = i.id_property
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
	function filters_shop($filters_shop, $offset = 0, $limit = 3){
		if (is_object($filters_shop)) {
			$filters_shop = get_object_vars($filters_shop);
		}
		if (!is_array($filters_shop)) {
			error_log('El array $filters_shop no es un array', 3, "debug.txt");
			return [];
		}
		// error_log($filters_shop, 3, "debug.txt");
		error_log(print_r($filters_shop, true), 3, "debug.txt");
		$consulta = "SELECT DISTINCT p.*, c.name_city,lp.name_large_people,i.path_images,
			(SELECT GROUP_CONCAT(t.name_type) FROM property_type pt INNER JOIN type t ON pt.id_type = t.id_type WHERE pt.id_property = p.id_property) as type_concat,
			(SELECT GROUP_CONCAT(o.name_operation) FROM property_operation po INNER JOIN operation o ON po.id_operation = o.id_operation WHERE po.id_property = p.id_property) as operation_concat,
			(SELECT GROUP_CONCAT(c.name_category) FROM property_category pc INNER JOIN category c ON pc.id_category = c.id_category WHERE pc.id_property = p.id_property) as category_concat,
			(SELECT GROUP_CONCAT(e.name_extras) FROM property_extras pe INNER JOIN extras e ON pe.id_extras = e.id_extras WHERE pe.id_property = p.id_property) as extras_concat
			FROM property p
			INNER JOIN city c ON p.id_city = c.id_city
			INNER JOIN images i ON p.id_property = i.id_property
			INNER JOIN large_people lp ON p.id_large_people = lp.id_large_people";

		foreach ($filters_shop as $key => $value) {
			error_log("Dentro del bucle foreach. Clave: $key, Valor: $value", 3, "debug.txt");
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
						if (is_array($filters_shop['id_extras'])) {
							$extras = array_map('intval', $filters_shop['id_extras']);
							$conditions = [];
							foreach ($extras as $extra) {
								$conditions[] = "p.id_property IN (SELECT pe.id_property FROM property_extras pe WHERE pe.id_extras = $extra)";
							}
							$consulta .= " AND " . implode(' AND ', $conditions);
						} else {
							$consulta .= " AND p.id_property IN (SELECT pe.id_property FROM property_extras pe WHERE pe.id_extras = " . intval($filters_shop['id_extras']) . ")";
						}
						break;
					case 'minPrice':
						$consulta .= " AND p.price >= " . $filters_shop['minPrice'];
						break;
					case 'maxPrice':
						$consulta .= " AND p.price <= " . $filters_shop['maxPrice'];
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
						if (is_array($filters_shop['id_extras'])) {
							$extras = array_map('intval', $filters_shop['id_extras']);
							$conditions = [];
							foreach ($extras as $extra) {
								$conditions[] = "p.id_property IN (SELECT pe.id_property FROM property_extras pe WHERE pe.id_extras = $extra)";
							}
							$consulta .= " WHERE " . implode(' AND ', $conditions);
						} else {
							$consulta .= " WHERE p.id_property IN (SELECT pe.id_property FROM property_extras pe WHERE pe.id_extras = " . intval($filters_shop['id_extras']) . ")";
						}
						break;
					case 'minPrice':
						$consulta .= " WHERE p.price >= " . $filters_shop['minPrice'];
						break;
					case 'maxPrice':
						$consulta .= " WHERE p.price <= " . $filters_shop['maxPrice'];
						break;
				}
			}
		}
		$consulta .= " GROUP BY p.id_property LIMIT $offset, $limit;";
		// error_log($filters_shop['id_extras'], 3, "debug.txt");
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
	function counting_filters($filters_shop){
		$sql = "SELECT COUNT(*)total 
		FROM property p";

		foreach ($filters_shop as $key => $value) {
			if (isset($filters_shop[$key])){
				switch ($key) {
					case 'id_city':
						$sql .= " INNER JOIN city c ON p.id_city = c.id_city AND c.id_city = " . $filters_shop['id_city'];
						break;
					case 'id_large_people':
						$sql .= " INNER JOIN large_people lp ON p.id_large_people = lp.id_large_people AND lp.id_large_people = " . $filters_shop['id_large_people'];
						break;
					case 'id_type':
						$sql .= " INNER JOIN property_type pt ON p.id_property = pt.id_property INNER JOIN type t ON pt.id_type = t.id_type AND t.id_type = " . $filters_shop['id_type'];
						break;
					case 'id_operation':
						$sql .= " INNER JOIN property_operation po ON p.id_property = po.id_property INNER JOIN operation o ON po.id_operation = o.id_operation AND o.id_operation = " . $filters_shop['id_operation'];
						break;
					case 'id_category':
						$sql .= " INNER JOIN property_category pc ON p.id_property = pc.id_property INNER JOIN category cat ON pc.id_category = cat.id_category AND cat.id_category = " . $filters_shop['id_category'];
						break;
					case 'id_extras':
						if (is_array($filters_shop['id_extras'])) {
							$extras = array_map('intval', $filters_shop['id_extras']);
							foreach ($extras as $extra) {
								$sql .= " INNER JOIN property_extras pe ON p.id_property = pe.id_property INNER JOIN extras e ON pe.id_extras = e.id_extras AND e.id_extras = $extra";
							}
						} else {
							$sql .= " INNER JOIN property_extras pe ON p.id_property = pe.id_property INNER JOIN extras e ON pe.id_extras = e.id_extras AND e.id_extras = " . intval($filters_shop['id_extras']);
						}
						break;
				}
			}
		}
		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);
		error_log($sql, 3, "debugCount.txt");
		$retrArray = array();
		if ($res -> num_rows > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$retrArray[] = $row;
			}
		}
		return $retrArray;
	}
	function counting(){
		$sql = "SELECT COUNT(*)total 
		FROM property p";

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
}