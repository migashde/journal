<?php

$sql = 'SELECT * FROM profs';
$query = mysqli_query($connection, $sql);
  
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Мэргэжлүүд <a href="<?=$folder?>/admin/add_prof.php" class="btn" style="margin-left: 40px; font-size: 12px;"><i class="fa fa-plus"></i> нэмэх</a></h2>
    </div>
    <table class="midbox table">
        <thead>
        <tr>

            <th>id</th>
            <th>Нэршил</th>
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
            <td class="text-right"><a href="update_prof.php?id='.$row['id'].'" class="btn btn-success btn-xs"><i class="fa fa-trash"></i> засах</a> <a href="functions/delete_prof.php?id='.$row['id'].'" class="btn btn-danger btn-xs"><i class="fa fa-trash"></i> устгах</a></td>
        </tr>';
            }
          }
          ?>
        </tbody>
    </table>
</main>