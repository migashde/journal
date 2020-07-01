<?php
$query=$this->db->fetch('SELECT * FROM article_cats');
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Ангилалууд <a href="testadmin/add_cat" class="btn" style="margin-left: 40px; font-size: 12px;"><i class="fa fa-plus"></i> нэмэх</a></h2>
    </div>
    <table class="midbox table">
        <thead>
        <tr>

            <th>id</th>
            <th>Нэршил</th>
            <th>Дэлгэрэнгүй</th>
            <th class="text-right">Тохиргоо</th>
        </tr>
        </thead>
        <tbody>
          <?php
          if (mysqli_num_rows($query)==0) {
            echo "<b style='color:brown;'>Уучлаарай одоогоор ангилал алга байна. Та дараа дахин шалгана уу! </b> <br><br>";
          }
          else
          {
            while ($row=mysqli_fetch_array($query)) {
              echo '<tr>
            <td>'.$row['id'].'</td>
            <td>'.$row['name'].'</td>
            <td><strong>'.$row['description'].'</strong></td>
            <td class="text-right"><a href="testadmin/updatecat?id='.$row['id'].'" class="btn btn-success btn-xs"><i class="fa fa-trash"></i> засах</a> <a href="testadmin/deletecat?id='.$row['id'].'" class="btn btn-danger btn-xs"><i class="fa fa-trash"></i> устгах</a></td>
        </tr>';
            }
          }
          ?>
        </tbody>
    </table>
</main>