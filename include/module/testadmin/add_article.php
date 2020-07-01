<?php
$error = '';
if($_SERVER["REQUEST_METHOD"] == "POST"){
  if(!empty($_POST['title'])&&!empty($_POST['content'])&&!empty($_FILES['media'])){

    require_once "src/class.upload.php";

    $foo = new Upload($_FILES['media']);
    $cat = $_POST['cat'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $number = '';

    if ($foo->uploaded) {
      $number = date("Ymdhis");
      
      $foo->file_new_name_body = 'image_resized_'.$number;
      $foo->image_resize = true;
      $foo->image_ratio_crop = true;
      $foo->image_convert = jpg;
      $foo->image_x = 200;
      $foo->image_ratio_y = true;
      $foo->process('C://xampp/htdocs/test/uploads/images/thumbnail');
      $foo->processed;

        
      $foo2 = new Upload($_FILES['media']);
      $foo2->file_new_name_body = 'image_'.$number;
      $foo2->image_resize = true;
      $foo2->image_ratio_crop = true;
      $foo2->image_convert = jpg;
      $foo2->image_x = 1000;
      $foo2->image_ratio_y = true;
      $foo2->process('sdata/uploads/images/');
      if ($foo2->processed) {
        echo 'image renamed, converted to JPG';
        $foo2->clean();
      } else {
        echo 'error : ' . $foo2->error;
      }
    }


    $name = $_POST['name'];
    $description = $_POST['description'];

    $sql = "INSERT INTO article_cats(name, description, media_id)
    VALUES (?,?,?)";

    $this->db->modify('article_cats', array(
      'name' => $name,
      'description' => $description,
      'media_id' => 0
    ));
    $this->req->url('testadmin/cats');



    $sql = "INSERT INTO media (path, full_path)
    VALUES ('/sdata/uploads/images/thumbnail/image_resized_".$number.".jpg', '/sdata/uploads/images/image_".$number.".jpg')";

    if ($connection->query($sql) === TRUE) {
      $media = $connection->insert_id;
    } else {
      $media = 0;
    }


    $sql = "INSERT INTO articles(cat_id, title, content, media, media_id)
      VALUES (?,?,?,?,?)";

      $stmt = $db->prepare($sql);


      try {
        $stmt->execute([$cat, $title, $content, $number.'.jpg', $media]);
        header('Location: /test/index.php');

        }

       catch (Exception $e) {
          $e->getMessage();
          echo "Error";
      }
  } else {
    $error = 'Ангилалын нэршил, дэлгэрэнгүй заавал бичнэ';
  }
}

$cats2=$this->db->fetch('SELECT * FROM article_cats');
  
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Нийтлэл нэмэх хэсэг</h2>
    </div>
    <section class="midbox">
      <form method="post" enctype="multipart/form-data">
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