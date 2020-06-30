<?php
$query=$this->db->fetch('SELECT * FROM articles ORDER BY id DESC');
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
		
		$query4=$this->db->fetch('SELECT * FROM article_cats WHERE id = '.$row['cat_id'].'');

        $str = $row["content"];
        $str = wordwrap($str, 28);
        $str = explode("\n", $str);
        $str = $str[0] . '...';
        echo '<a href="test1?id='.$row["id"].'">
        <article class="post">
          <div class="post-image" style="background: url(sdata/uploads/images/image_'.$row["media"].') center center;background-size: cover; ">
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
  <?$this->module('main/sidebar');?>
</main>