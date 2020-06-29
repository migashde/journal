<?php

  require_once "functions/db.php";

  $sql = 'SELECT * FROM articles ORDER BY id DESC';
  $query = mysqli_query($connection, $sql);

?>
<?php 
  include("header.php");
?>
<main id="main" class="wrapper" role="main">
  <section id="contents">
    <?php
    if (mysqli_num_rows($query)==0) {
      echo "<b style='color:brown;'>Уучлаарай одоогоор нийтлэл алга байна. Та дараа дахин шалгана уу! </b> <br><br>";
    }
    else
    {
      while ($row=mysqli_fetch_array($query)) {
        $sql4 = 'SELECT * FROM article_cats WHERE id = '.$row['cat_id'].'';
      $query4 = mysqli_query($connection, $sql4);

        $str = $row["content"];
        $str = wordwrap($str, 28);
        $str = explode("\n", $str);
        $str = $str[0] . '...';
        echo '<a href="article.php?id='.$row["id"].'">
        <article class="post">
          <div class="post-image" style="background: url(/test/uploads/images/image_'.$row["media"].') center center;background-size: cover; ">
          </div>
          <div class="post-content">
            <h2 class="post-title">'.$row["title"].'</h2>
            <div class="meta">'.$row["created_date"].'</div>
            <div class="desc">'.$str.'</div>
          </div>
        </article>
        </a>';
      }
    }
    ?>
  </section>
  <section id="sidebar"> 
    <?php 
      include("sidebar.php");
    ?>
  </section>
</main>
<?php 
  include("footer.php");
?>