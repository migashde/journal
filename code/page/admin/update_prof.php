<?php

if (isset($_GET['id'])) {
  $postid = $_GET['id'];
  $sql = "SELECT * FROM profs WHERE id='$postid'";
  $query = mysqli_query($connection, $sql);
  
} else {
  header('Location: '.$folder.'/admin/profs');
}
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Мэргэжил засах</h2>
    </div>
    <section class="midbox">
      <form action="functions/update_prof.php" method="post" enctype="multipart/form-data">
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