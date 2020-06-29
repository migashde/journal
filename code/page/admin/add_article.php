<?php

$sql = 'SELECT * FROM article_cats';
$cats2 = mysqli_query($connection, $sql);
  
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Нийтлэл нэмэх хэсэг</h2>
    </div>
    <section class="midbox">
      <form action="<?=$folder?>functions/add_post" method="post" enctype="multipart/form-data">
        <div class="form-group">
          <label>Нийтлэлийн гарчиг</label>
          <input type="text" class="form-c" name="title" placeholder="Нийтлэлийн гарчигийг энд бичнэ үү">
        </div>

        <div class="form-group">
          <label>Нийтлэлийн ангилал</label>
          <select class="form-c" name="cat">
            <?php
              if (mysqli_num_rows($cats)==0) {
                echo "<option>Уучлаарай сонгох ангилал алга</option>";
              }
              else
              {
                while ($row=mysqli_fetch_array($cats2)) {
                  echo '<option value="'.$row["id"].'">'.$row["name"].'</option>';
                }
              }
            ?>
          </select>
        </div>

        <div class="form-group">
          <label>Нийтлэлийн зураг</label>
          <input type="file" class="form-c" name="media">
        </div>

        <textarea class="summernote" name="content"></textarea>
        <div class="text-right">
            <button type="reset" class="btn">Цэвэрлэх</button>
            <button type="submit" class="btn">Нэмэх</button>
        </div>
      </form>
    </section>
</main>