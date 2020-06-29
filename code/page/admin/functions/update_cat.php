<?php

require_once "C://xampp/htdocs/test/functions/db.php";
require_once "loggedin.php";


if($loggedadmin == false) {
  header("Location: /test/admin/index.php");
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
  

  if(!empty($_POST['name'])){

        $sql = "UPDATE article_cats SET name = '".trim($_POST['name'])."', description = '".trim($_POST['description'])."' WHERE id = ".trim($_POST['id']).";";

        if ($connection->query($sql) === TRUE) {
          header('Location: /test/admin/cats.php');
        } else {
          echo "Error updating record: " . $connection->error;
        }

    } else {
        header("Location: /test/admin/cats.php");
    }

} else {
  header("Location: /test/admin/cats.php");
}
  
?>