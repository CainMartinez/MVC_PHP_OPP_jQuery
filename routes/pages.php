<?php
	if (isset($_GET['page'])) {
		$page = $_GET['page'];
	} else {
		$page = 'index';
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
		case "register";
			include("module/login/view/register.html");
			break;
		case "index";
			include("index.html");
			break;
		case "login";
			include("module/login/view/login.html");
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
			include("index.html");
			break;
	}
?>