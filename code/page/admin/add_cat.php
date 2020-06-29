<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Ангилал нэмэх</h2>
    </div>
    <section class="midbox">
      <form action="functions/add_cat.php" method="post" enctype="multipart/form-data">
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