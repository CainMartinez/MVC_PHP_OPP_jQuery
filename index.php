<?php
if ($page === 'home') {
    include("views/inc/top_page_home.html");
} elseif ($page === 'shop') {
    include("views/inc/top_page_shop.html");
}else {
    include("views/inc/top_page.html");
}
session_start();

include("views/inc/header.html");

include("routes/pages.php");

include("views/inc/footer.html");

include("views/inc/bottom_page.html");
?>