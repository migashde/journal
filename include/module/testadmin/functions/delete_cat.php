<?php

require_once "C://xampp/htdocs/test/functions/db.php";
require_once "loggedin.php";

if($loggedadmin == false) {
  header("Location: /test/index.php");
}

if (isset($_GET['id'])) {
  $postid = $_GET['id'];
  $sql = "DELETE FROM article_cats WHERE id='$postid'";
  $query = mysqli_query($connection, $sql);
  header("Location: /test/admin/cats.php");
} else {
  header("Location: /test/admin/cats.php");
}
  
?>