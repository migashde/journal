<?php

$sql = 'SELECT * FROM users WHERE type = "user"';
$query = mysqli_query($connection, $sql);
  
?>
<main id="main" class="wrapper" role="main">
    <div class="wrap-head">
        <h2>Хэрэглэгчид</h2>
    </div>
    <table class="midbox table">
        <thead>
        <tr>

            <th>id</th>
            <th>Овог нэр</th>
            <th>Хүйс</th>
            <th>Төрсөн огноо</th>
            <th>Утас</th>
            <th>Имэйл</th>
            <th>Хаяг</th>
            <th>Жолооч эсэх</th>
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
            <td>'.$row['family_name'].' '.$row['name'].'</td>
            <td>'.$row['huis'].'</td>
            <td>'.$row['birthday'].'</td>
            <td>'.$row['phone'].'</td>
            <td>'.$row['email'].'</td>
            <td>'.$row['address'].'</td>
            <td>'.$row['driver_license'].'</td>
        </tr>';
            }
          }
          ?>
        </tbody>
    </table>
</main>