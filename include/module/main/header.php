<?php
$cats=$this->db->fetch('SELECT * FROM article_cats ORDER BY id DESC');
?>
<header id="header">
  <div class="wrapper">
    <a class="logo" href="test">Miga's journal</a>
    <nav id="topnav" class="navbar">
      <?php
        if (mysqli_num_rows($cats)==0) {
          echo '
        <a class="nav-link" href="test">Нийтлэлүүд</a>';
        }
        else
        {
          while ($cat=mysqli_fetch_array($cats)) {
            echo '<a href="test2?cat='.$cat["id"].'">'.$cat["name"].'</a>';
          };
        }
      ?>
      <div class="sep">|</div>
      <?php if($this->cs->is('id') == 0):?>
      <a class="btn" href="test3">нэвтрэх</a>
      <a class="btn" href="test4">бүртгүүлэх</a>
      <?php else:?>
      <a class="btn" href="test5"><?=$this->cs->get('login');?></a>
      <a class="btn" href="test6">гарах</a>
      <?php endif;?>

      <?php if($this->cs->is('id') == 2&&$this->cs->get('type')== 'admin'):?>
      <a class="btn" href="testadmin">admin</a>
      <?php endif;?>

      <a href="javascript:void(0);" class="icon" onclick="myFunction()"><i class="fa fa-bars"></i></a>
    </nav>
  </div>
</header>