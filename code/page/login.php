<?php



  if ($loggedin == true) {
    header("Location: ".$folder);
  }

 
if (isset($_GET['url'])) {
  $prev_url = $_GET['url'];
  
} else {
  $prev_url = $folder;
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
      <form action="functions/login" method="post">
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