<?php
  ob_start();
    require_once "C://xampp/htdocs/test/functions/db.php";

    session_start();
    global $loggedadmin;
    if(!isset($_SESSION['login']) || empty($_SESSION['login']) || $_SESSION['type'] != 'admin'){
      $loggedadmin = false;
    } else {
      $loggedadmin = true;
    }
  
?>