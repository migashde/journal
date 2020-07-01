<?php

require_once "../functions/db.php";
require_once "functions/loggedin.php";

if($loggedadmin == false) {
  header("Location: /test/index.php");
}
?>
<?php 
  include("header.php");
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Мэргэжил нэмэх</h2>
    </div>
    <section class="midbox">
      <form action="functions/add_prof.php" method="post" enctype="multipart/form-data">
        <div class="form-group">
              <label>Нэршил</label>
              <input type="text" class="form-control" name="name" placeholder="Нэршилийг энд бичнэ үү">
            </div>
            <div class="text-right">
                <button type="reset" class="btn btn-default">Цэвэрлэх</button>
                <button type="submit" class="btn btn-primary">Нэмэх</button>
            </div>
        </form>
    </section>
</main>
<?php 
  include("footer.php");
?>