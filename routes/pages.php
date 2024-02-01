<?php
	if (isset($_GET['page'])) {
		$page = $_GET['page'];
	} else {
		$page = 'homepage';
	}
	switch($page){
		case "homepage";
			include("module/home/view/home.html");
			break;
		case "shop";
			include("module/shop/view/shop.html");
			break;
		case "controller_shop";
			include("module/shop/controller/".$_GET['page'].".php");
			break;
		case "controller_home";
			include("module/home/controller/".$_GET['page'].".php");
			break;
		case "typography";
			include("typography.html");
			break;
		case "index";
			include("index.html");
			break;
		case "aboutus";
			include("about-us.html");
			break;
		case "contactus";
			include("contacts.html");
			break;
		case "404";
			include("views/inc/error".$_GET['page'].".html");
			break;
		case "503";
			include("views/inc/error".$_GET['page'].".html");
			break;
		default;
			include("module/home/view/home.html");
			break;
	}
?>