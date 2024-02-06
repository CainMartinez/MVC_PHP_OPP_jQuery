<?php
$path = $_SERVER['DOCUMENT_ROOT'];
include($path . "/model/connect.php");

class DAOShop{
	function select_all_properties(){
		$sql = "SELECT DISTINCT p.*,c.*,i.*
		FROM property p, city c,images i 
		WHERE p.id_city = c.id_city
		AND i.id_property = p.id_property
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

	function select_one_property($id){
		$sql = "SELECT 
		i.*,
		p.cadastral_reference,
		p.square_meters,
		p.number_of_rooms,
		p.description,
		p.price,
		c.name_city,
		t.name_type,
		o.name_operation,
		e.name_extras,
		cat.name_category
	FROM images i
	JOIN property p ON i.id_property = p.id_property
	JOIN city c ON p.id_city = c.id_city
	LEFT JOIN property_type pt ON p.id_property = pt.id_property
	LEFT JOIN type t ON pt.id_type = t.id_type
	LEFT JOIN property_operation po ON p.id_property = po.id_property
	LEFT JOIN operation o ON po.id_operation = o.id_operation
	LEFT JOIN property_extras pe ON p.id_property = pe.id_property
	LEFT JOIN extras e ON pe.id_extras = e.id_extras
	LEFT JOIN property_category pc ON p.id_property = pc.id_property
	LEFT JOIN category cat ON pc.id_category = cat.id_category
	WHERE p.id_property = '$id' AND i.id_property = '$id' GROUP BY i.id_property";
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
