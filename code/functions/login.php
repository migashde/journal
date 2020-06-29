<?php
ob_start();
session_start();

$db['db_host'] = 'localhost';
$db['db_user'] = 'root';
$db['db_pass'] = '';
$db['db_name'] = 'test';

foreach($db as $key=>$value){
  define(strtoupper($key),$value);
}
global $conn;
$conn = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME);
if(!$conn){
  die("Cannot Establish A Secure Connection To The Host Server At The Moment!");
}

try{
  $db = new PDO('mysql:dbhost=localhost;dbname=test;charset=utf8','root','');
} catch(Exception $e){
    die('Cannot Establish A Secure Connection To The Host Server At The Moment!');
}


$login = $password = "";

$login_err = $password_err = "";



if($_SERVER["REQUEST_METHOD"] == "POST"){

    if(empty(trim($_POST["login"]))){
        $login_err = 'Имэйл юм уу утасны хаягаа оруулна уу.';
    } else{
        $login = trim($_POST["login"]);
    }


    if(empty(trim($_POST['password']))){
        $password_err = 'Нууц үг оруулна уу.';
    } else{
        $password = trim($_POST['password']);
    }

    $prev_url = trim($_POST["prev_url"]);

    // Validate
    if(empty($login_err) && empty($password_err)){

        $sql = "SELECT id, family_name, name ,email, phone, passwd, type FROM users WHERE email = ? OR phone = ?";

        if($stmt = mysqli_prepare($conn, $sql)){

            mysqli_stmt_bind_param($stmt, "ss", $param_login, $param_login);
            $param_login = $login;

            if(mysqli_stmt_execute($stmt)){

                mysqli_stmt_store_result($stmt);

                if(mysqli_stmt_num_rows($stmt) == 1){
                    mysqli_stmt_bind_result($stmt, $id, $family_name, $name, $email, $phone, $hashed_password, $type);

                    if(mysqli_stmt_fetch($stmt)){

                        if(password_verify($password, $hashed_password)){

                            

                            if(!empty($_SERVER['HTTP_CLIENT_IP'])){
                              $ip = $_SERVER['HTTP_CLIENT_IP'];
                            }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
                              $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
                            }else{
                              $ip = $_SERVER['REMOTE_ADDR'];
                            }
                            $browser = $_SERVER['HTTP_USER_AGENT'];

                            $sql2 = "INSERT INTO login_logs(user_id, ip_address, browser_info)
                            VALUES (?, ?,?)";
                            $stmt2 = $db->prepare($sql2);
                            try {
                              $stmt2->execute([$id, $ip, $browser]);
                            } catch (Exception $e2) {
                                $e2->getMessage();
                                echo "Алдаа гарлаа";
                            }

                            $_SESSION['login'] = $family_name.' '.$name;
                            $_SESSION['type'] = $type;
                            $_SESSION['id'] = $id;

                            $statement = mysqli_query($conn, $sql);

                            if ($prev_url == '/test/index.php') {
                              if ($type == 'admin') {
                                header("Location: /test/admin/index.php");
                              } else {
                                header("Location: /test/index.php");
                              }
                            } else {
                              header("Location: ".$prev_url);
                            }

                            

                        } else{
                            header('Location:../login.php?error=1');
                        }

                    }

                } else{
                    header('Location:../login.php?error=2');
                }
            } else{
                echo "Баазын алдаа.";
            }
        }
        mysqli_stmt_close($stmt);
    }
    mysqli_close($conn);
}
?>