<?php

$error = '';

if($_SERVER["REQUEST_METHOD"] == "POST"){
  if(!empty($_POST['name'])){
    $this->db->modify("profs", array('name' => trim($_POST['name'])),"id = ".trim($_POST['id']).";");
    $this->req->url('testadmin/profs');  
  } else {
    $error = 'Мэргэжлийн нэршлийг заавал бичнэ';
  }
}
if (isset($_GET['id'])) {
  $postid = $_GET['id'];
  $query=$this->db->fetch("SELECT * FROM profs WHERE id='$postid'");
} else {
  $this->req->url('testadmin/profs'); 
}
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Мэргэжил засах</h2>
    </div>
    <section class="midbox">
      <?php if($error!='') echo '<p style="color:brown">'.$error.'</p>';?>
      <form method="post" enctype="multipart/form-data">
        <?php 
        while ($row = mysqli_fetch_assoc($query)) {

        echo '<input type="hidden" name="id" value="'.$row["id"].'"><div class="form-group">
            <label>Нэршил</label>
            <input type="text" class="form-c" name="name" value="'.$row["name"].'">
          </div>';}?>
   
          <div class="text-right">
              <button type="submit" class="btn btn-primary">Засах</button>
          </div>
      </form>
    </section>
</main>