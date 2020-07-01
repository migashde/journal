<?php
$error = '';
if($_SERVER["REQUEST_METHOD"] == "POST"){
  if(!empty($_POST['name'])&&!empty($_POST['description'])){
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
  } else {
    $error = 'Ангилалын нэршил, дэлгэрэнгүй заавал бичнэ';
  }
}
?><main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Ангилал нэмэх</h2>
    </div>
    <section class="midbox">
    <?php if($error!='') echo '<p style="color:brown">'.$error.'</p>';?>
      <form method="post" enctype="multipart/form-data">
            <div class="form-group">
              <label>Нэршил</label>
              <input type="text" class="form-c" name="name" placeholder="Нэршилийг энд бичнэ үү">
            </div>

            <textarea name="description" class="form-c" placeholder="Ангилалын дэлгэрэнгүй"></textarea><br>
            <div class="text-right">
                <button type="reset" class="btn btn-default">Цэвэрлэх</button>
                <button type="submit" class="btn btn-primary">Нэмэх</button>
            </div>
        </form>
    </section>
</main>