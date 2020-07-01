<?php

if (isset($_GET['id'])) {
  $postid = $_GET['id'];
  $query=$this->db->fetch("SELECT * FROM articles WHERE id='$postid'");
  
} else {
  $this->req->url('@');
}

?>
<main id="main" class="wrapper" role="main">
  <section id="contents">
    <?php
        while ($row = mysqli_fetch_assoc($query)) {
			$query3=$this->db->fetch('SELECT * FROM article_cats WHERE id = '.$row['cat_id'].'');
			
			echo '<article class="post-single">
                <h1 class="single-title">'.$row['title'].'</h1>
   
                <div class="single-meta"><time class="timeago" datetime="'.$row['created_date'].'">'.$row['created_date'].'</time></a>, Ангилал: <a href="test2?cat='.$row['cat_id'].'">';
                while ($row3 = mysqli_fetch_assoc($query3)) {
                  echo $row3['name'];
                }

                echo '</a></div>
				<img class="single-img" src="sdata/uploads/images/image_'.$row["media"].'" alt="" />
				<div class="single-body">'.$row['content'].'
				</div>
				</article>';
		}
	?>
	</section>
	<?$this->module('main/sidebar');?>
</main>