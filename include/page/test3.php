<?php

ob_start();
session_start();

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

        $sql = 'SELECT id, family_name, name ,email, phone, passwd, type FROM users WHERE email = "'.$login.'" OR phone = "'.$login.'"';

        if(!empty($this->db->fetch($sql, 4))){

        	$user = $this->db->fetch($sql, 4);

			if(password_verify($password, $user['passwd'])){
						
				if(!empty($_SERVER['HTTP_CLIENT_IP'])){
					$ip = $_SERVER['HTTP_CLIENT_IP'];
	            }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
	                $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	            }else{
					$ip = $_SERVER['REMOTE_ADDR'];
				}
				
				$browser = $_SERVER['HTTP_USER_AGENT'];
				
				
				$this->db->modify('login_logs', array('user_id' => $user['id'],'ip_address' => $ip,'browser_info' => $browser));

	            $_SESSION['login'] = $user['family_name'].' '.$user['name'];
	            $_SESSION['type'] = $user['type'];
	            $_SESSION['id'] = $user['id'];
				
	            if ($prev_url == '../') {
					if ($type == 'admin') {
						header("Location: test");
					} else {
						header("Location: test");
					}
				} else {
	              header("Location: ".$prev_url);
	            }
				
            } else {
                header('Location: test3?error=1');
            }

        } else{
        	header('Location: test3?error=2');
        }
    }
}

if (isset($_GET['url'])) {
  $prev_url = $_GET['url'];
} else {
  $prev_url = '../';
}

$error = '';
if (isset($_GET['error'])) {
  if ($_GET['error']==1) {
    $error = 'Нууц үг буруу байна!';
  } else {
    $error = 'Тохирох хаяг олдсонгүй';
  }
}
?>
<main id="main" class="wrapper" role="main">
	<section class="midform">
		<h3 class="b-title">Нэвтрэх хэсэг</h3>
		<?php if($error!=''){echo '<p style="color:brown">'.$error.'</p>';}?>
		<form method="post">
			<input type="hidden" name="prev_url" value="<?php echo $prev_url;?>">
			<div class="form-group">
				<label>Имэйл эсвэл утасны дугаар:</label>
				<input type="text" class="form-c" name="login" placeholder="Имэйл эсвэл утасны дугаараа энд бичнэ үү">
			</div>
			<div class="form-group">
				<label>Нууц үг:</label>
				<input type="password" class="form-c" name="password" placeholder="Нууц үгээ энд бичнэ үү">
			</div>
			<button type="submit" class="btn">Нэвтрэх</button>
		</form>
	</section>
</main>