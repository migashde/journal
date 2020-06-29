<?php

require_once "db.php";

  $family_name = $_POST['family_name'];
  $name = $_POST['name'];
  $huis = $_POST['huis'];
  $birthday = $_POST['birthday'];
  $prof = $_POST['prof'];
  $personal1 = $_POST['personal1'];
  $personal2 = $_POST['personal2'];
  $personal_id = $_POST['personal_id'];
  $phone = $_POST['phone'];
  $email = trim(htmlspecialchars($_POST['email']));
  $email = filter_var($email, FILTER_VALIDATE_EMAIL);
  $address = $_POST['address'];


if($_SERVER["REQUEST_METHOD"] == "POST"){

  if($_POST["driver_license"]) { 
    $i = 0;
    foreach ($_POST['driver_license'] as $subject){
      if ($i == 0) {
        $driver_license = $subject;
      } else {
        $driver_license = $driver_license.','.$subject;
      }
      $i++;
    }
  }

  $sql = "SELECT email, phone, type FROM users WHERE email = ? OR phone = ?";

  if($stmt = mysqli_prepare($connection, $sql)){

      mysqli_stmt_bind_param($stmt, "ss", $email, $phone);

      if(mysqli_stmt_execute($stmt)){

          mysqli_stmt_store_result($stmt);

          if(mysqli_stmt_num_rows($stmt) > 1){
              mysqli_stmt_bind_result($stmt, $email, $phone, $type);

              if(mysqli_stmt_fetch($stmt)){

                  
                header('Location:../profile.php?error=1');

              }

          } else {


            $sql = "UPDATE users SET family_name = '".$family_name."', name = '".$name."', huis = '".$huis."', birthday = '".$birthday."', prof_id = '".$prof."', personal_id = '".$personal1.$personal2.$personal_id."', phone = '".$phone."', email = '".$email."', address = '".$address."', driver_license = '".$driver_license."' WHERE id = ".trim($_POST['id']).";";

            if ($connection->query($sql) === TRUE) {
                session_start();
              unset($_SESSION['login']);
              unset($_SESSION['type']);
              unset($_SESSION['id']);
              session_destroy();
              session_start();
              $_SESSION['login'] = $family_name.' '.$name;
              $_SESSION['type'] = $type;
              $_SESSION['id'] = $_POST['id'];
              header('Location: /test/profile.php');
            } else {
          echo false;
            }

          }
      } else {
          echo false;
      }
  }
  mysqli_stmt_close($stmt);

}

?>