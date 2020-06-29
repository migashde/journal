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
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
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
  <!-- Footer-->
    <footer id="footer">
        <span class="pull-right">
            Welcome Miga's Journal
        </span>
        Miga's Journal 2020-<?php echo date("Y"); ?>
    </footer>
<script>

    $(function () {

        $('.summernote').summernote({
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']]
            ]
        });


    });

</script>  
</body>
</html>