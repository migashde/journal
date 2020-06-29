<?php

if (isset($_GET['id'])) {
  $postid = $_GET['id'];

  $sql = "SELECT * FROM articles WHERE id='$postid'";
  $query = mysqli_query($connection, $sql);

  $sql2 = 'SELECT * FROM articles ORDER BY id DESC LIMIT 3';
  $query2 = mysqli_query($connection, $sql2);


  if ($loggedin == false) {
    header("Location: /test/login?url=/test/post?id=".$postid);
  }
  
} else {
  header('Location:posts');
}?>
<main id="main" class="wrapper" role="main">
  <section id="contents">
    <?php 
          while ($row = mysqli_fetch_assoc($query)) {


          $sql3 = 'SELECT * FROM article_cats WHERE id = '.$row['cat_id'].'';
          $query3 = mysqli_query($connection, $sql3);


          echo '<article class="post-single">
                <h1 class="single-title">'.$row['title'].'</h1>
   
                <div class="single-meta"><time class="timeago" datetime="'.$row['created_date'].'">'.$row['created_date'].'</time></a>, Ангилал: <a href="cat_posts?cat='.$row['cat_id'].'">';
                while ($row3 = mysqli_fetch_assoc($query3)) {
                  echo $row3['name'];
                }

                echo '</a></div>
              <img class="single-img" src="'.$folder.'/data/uploads/images/image_'.$row["media"].'" alt="" />
            <div class="single-body">'.$row['content'].'

            

            </div>
          </article>';}
          ?>
  </section>
  <section id="sidebar"> 
    <?php 
      include("sidebar.php");
    ?>
  </section>
</main>