<?php

require_once "../functions/db.php";
require_once "functions/loggedin.php";


  


if($loggedadmin == false) {
  header("Location: /test/index.php");
}

if (isset($_GET['id'])) {
  $postid = $_GET['id'];
  $sql = "SELECT * FROM articles WHERE id='$postid'";
  $query = mysqli_query($connection, $sql);

  $sql2 = 'SELECT * FROM article_cats';
  $cats2 = mysqli_query($connection, $sql2);
  
} else {
  header("Location: /test/admin/index.php");
}


?>
<?php 
  include("header.php");
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Нийтлэл шинэчлэх</h2>
    </div>
    <section class="midbox">
      <form action="functions/update_post.php" method="post" enctype="multipart/form-data">
        <?php 
        while ($row = mysqli_fetch_assoc($query)) {

        echo '<input type="hidden" name="id" value="'.$row["id"].'"><div class="form-group">
            <label>Нийтлэлийн гарчиг</label>
            <input type="text" class="form-c" name="title" value="'.$row["title"].'">
          </div>

          <div class="form-group">
            <label>Нийтлэлийн гарчиг</label>
            <select class="form-c" name="cat">';
            $selected = '';
          if (mysqli_num_rows($cats)==0) {
                  echo "<option>Уучлаарай сонгох ангилал алга</option>";
                }
                else
                {
                  while ($row2=mysqli_fetch_array($cats2)) {
                    if ($row["cat_id"] == $row2["id"]) {
                       $selected = 'selected';
                    }
                    echo '<option value="'.$row2["id"].'" '.$selected.'>'.$row2["name"].'</option>';
                    $selected = '';
                  }
                }
                echo '</select>
          </div>

          <div class="form-group">
          <img class="card-img" src="/test/uploads/images/thumbnail/image_resized_'.$row["media"].'" alt="" />
            <label>Нийтлэлийн зураг</label>
            <input type="file" class="form-c" name="media">
          </div>

          <textarea class="summernote" name="content">'.$row["content"].'</textarea>
          <div class="text-right">
              <button type="submit" class="btn btn-primary">Засах</button>
          </div>';}
        ?>
            
      </form>
    </section>
</main>
<?php 
  include("footer.php");
?>