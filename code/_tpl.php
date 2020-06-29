<?php
  $sql = 'SELECT * FROM article_cats';
  $cats = mysqli_query($connection, $sql);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Тест сайт</title>
  <link type="text/css" rel="stylesheet" href="<?=$folder;?>/data/assets/css/styles.css" />
    <script type="text/javascript" src="<?=$folder;?>/data/assets/js/my.js"></script>
    <?php
    if($aCss){
      foreach($aCss as $css) echo '<link type="text/css" rel="stylesheet" href="<?=$folder;?>/data/css/'.$css.'.css" />
    ';
    }
    if($aJs){
      foreach($aJs as $js) echo '<script type="text/javascript" src="<?=$folder;?>/data/js/'.$js.'.js"></script>
    ';
    }
  ?>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<header id="header">
  <div class="wrapper">
    <a class="logo" href="<?=$folder;?>">Miga's journal</a>
    <nav id="topnav" class="navbar">
      <?php
        if (mysqli_num_rows($cats)==0) {
          echo '
        <a class="nav-link" href="/">Нийтлэлүүд</a>';
        }
        else
        {
          while ($cat=mysqli_fetch_array($cats)) {
            echo '<a href="cat_posts?cat='.$cat["id"].'">'.$cat["name"].'</a>';
          };
        }
      ?>
      <div class="sep">|</div>
      <?php if($loggedin == false):?>
      <a class="btn" href="login">нэвтрэх</a>
      <a class="btn" href="register">бүртгүүлэх</a>
      <?php else:?>
      <a class="btn" href="profile"><?php echo $_SESSION['login'];?></a>
      <a class="btn" href="functions/logout">гарах</a>
      <?php endif;?>

      <?php if($loggedin == true):?>
      <?php if($_SESSION['type'] == 'admin'):?>
      <a class="btn" href="admin">admin</a>
      <?php endif;?>
      <?php endif;?>

      <a href="javascript:void(0);" class="icon" onclick="myFunction()"><i class="fa fa-bars"></i></a>
    </nav>
  </div>
</header>
		<?=$siteContent?>
<footer id="footer">
  <div class="wrapper">

    <ul class="footer-nav">
        <a href="#">Эхлэл</a>
        <a href="#">Эхлэл</a>
    </ul>
    <div class="copy">
      &copy; Miga's journal 2020
      All rights reserved.
    </div>
  </div>
</footer>
<script>
function myFunction() {
  var x = document.getElementById("topnav");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}
</script>
</body>
</html>