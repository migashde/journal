<?php

$sql = 'SELECT * FROM articles ORDER BY id DESC';
$query = mysqli_query($connection, $sql);
  
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Нийтлэлүүд <a href="/test/admin/add_article.php" class="btn" style="margin-left: 40px; font-size: 12px;"><i class="fa fa-plus"></i> нэмэх</a></h2>
    </div>
    <table class="midbox table">
        <thead>
        <tr>

            <th>id</th>
            <th>Гарчиг</th>
            <th>Ангилал</th>
            <th>Нийтлэгдсэн огноо</th>
            <th class="text-right">Тохиргоо</th>
        </tr>
        </thead>
        <tbody>
          <?php
          if (mysqli_num_rows($query)==0) {
            echo "<b style='color:brown;'>Уучлаарай одоогоор нийтлэл алга байна. Та дараа дахин шалгана уу! </b> <br><br>";
          }
          else
          {
            while ($row=mysqli_fetch_array($query)) {
              echo '<tr>
            <td>'.$row['id'].'</td>
            <td>'.$row['title'].'</td>
            <td><strong>'.$row['cat_id'].'</strong></td>
            <td>'.$row['created_date'].'</td>
            <td class="text-right"><a href="update_article.php?id='.$row['id'].'" class="btn btn-success btn-xs"><i class="fa fa-trash"></i> засах</a> <a href="functions/delete.php?id='.$row['id'].'" class="btn btn-danger btn-xs"><i class="fa fa-trash"></i> устгах</a></td>
        </tr>';
            }
          }
          ?>
        </tbody>
    </table>
</main>