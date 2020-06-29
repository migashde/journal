<?php

require_once "C://xampp/htdocs/test/functions/db.php";
require_once "loggedin.php";


if($loggedadmin == false) {
  header("Location: /test/admin/index.php");
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
  

  if(!empty($_POST['name'])&&!empty($_POST['description'])){
      $name = $_POST['name'];
      $description = $_POST['description'];


        $sql = "INSERT INTO article_cats(name, description, media_id)
        VALUES (?,?,?)";

        $stmt = $db->prepare($sql);


        try {
          $stmt->execute([$name, $description, 0]);
          header('Location: /test/admin/cats.php');

          }

         catch (Exception $e) {
            $e->getMessage();
            echo "Error";
        }
    } else {
        header("Location: /test/admin/cats.php");
    }

} else {
  header("Location: /test/admin/cats.php");
}
  
?>