<?php
$error = '';
if($_SERVER["REQUEST_METHOD"] == "POST"){
  if(!empty($_POST['name'])){
      $this->db->modify("article_cats", array('name' => trim($_POST['name']), 'description' => trim($_POST['description'])),"id = ".trim($_POST['id']).";");
      $this->req->url('testadmin/cats');  
    } else {
      $error = 'Ангилалын нэршилийг заавал бичнэ';
    }
}

if (isset($_GET['id'])) {
  $postid = $_GET['id'];
  $query=$this->db->fetch("SELECT * FROM article_cats WHERE id='$postid'");
} else {
  $this->req->url('testadmin/cats');
}
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Ангилал шинэчлэх</h2>
    </div>
    <section class="midbox">
      <?php if($error!='') echo '<p style="color:brown">'.$error.'</p>';?>
      <form method="post">
        <?php 
          while ($row = mysqli_fetch_assoc($query)) {
          echo '<input type="hidden" name="id" value="'.$row["id"].'"><div class="form-group">
              <label>Нэршил</label>
              <input type="text" class="form-c" name="name" value="'.$row["name"].'">
            </div>

            <textarea name="description" class="form-c">'.$row["description"].'</textarea>';}?>

            <br>
            <div class="text-right">
                <button type="submit" class="btn btn-primary">Засах</button>
            </div>
        </form>
    </section>
</main>