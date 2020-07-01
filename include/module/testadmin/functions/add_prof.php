<?php

require_once "C://xampp/htdocs/test/functions/db.php";
require_once "loggedin.php";


if($loggedadmin == false) {
  header("Location: /test/admin/index.php");
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
  

  if(!empty($_POST['name'])){
      $name = $_POST['name'];


        $sql = "INSERT INTO profs(name)
        VALUES (?)";

        $stmt = $db->prepare($sql);


        try {
          $stmt->execute([$name]);
          header('Location: /test/admin/profs.php');

          }

         catch (Exception $e) {
            $e->getMessage();
            echo "Error";
        }
    } else {
        header("Location: /test/admin/profs.php");
    }

} else {
  header("Location: /test/admin/profs.php");
}
  
?>