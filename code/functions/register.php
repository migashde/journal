<?php

require_once "db.php";

if ($_POST['password']==$_POST['password2']) {
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
  $driver_license = $_POST['driver_license'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);


if($_SERVER["REQUEST_METHOD"] == "POST"){

  $sql = "SELECT email, phone FROM users WHERE email = ? OR phone = ?";

  if($stmt = mysqli_prepare($connection, $sql)){

      mysqli_stmt_bind_param($stmt, "ss", $email, $phone);

      if(mysqli_stmt_execute($stmt)){

          mysqli_stmt_store_result($stmt);

          if(mysqli_stmt_num_rows($stmt) >= 1){
              mysqli_stmt_bind_result($stmt, $email, $phone);

              if(mysqli_stmt_fetch($stmt)){


                header('Location:../register.php?error=1');

              }

          } else {
            $sql = "INSERT INTO users(family_name, name, huis, birthday, prof_id, personal_id, phone, email, address, driver_license, passwd)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            $stmt = $db->prepare($sql);
            try {
              $stmt->execute([$family_name, $name, $huis, $birthday, $prof, $personal1.$personal2.$personal_id, $phone, $email, $address, $driver_license, $password]);
              header('Location:../login.php?sent');
            } catch (Exception $e) {
                $e->getMessage();
                echo false;
            }
          }
      } else {
          echo false;
      }
  }
  mysqli_stmt_close($stmt);

}

    
    
  
} else {
  header('Location:../register.php?error=2');
}

?>