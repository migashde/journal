<?php

  require_once "functions/db.php";
  require_once "functions/loggedin.php";

  if ($loggedin == true) {
    header("Location: /test/index.php");
  }
  $error = '';
  if (isset($_GET['error'])) {
    if ($_GET['error']==1) {
      $error = 'Утасны дугаар, имэйлийг өөр хэрэглэгч ашигласан байна!';
    } else {
      $error = 'Нууц үг тохирсонгүй!';
    }
  }

  $sql = 'SELECT * FROM profs';
  $profs = mysqli_query($connection, $sql);
  
?>
<?php 
  include("header.php");
?>
<main id="main" class="wrapper" role="main">
  <section class="midform">
    <h3 class="b-title">Бүртгүүлэх хэсэг</h3>
    <?php if($error!=''){echo '<p style="color:brown">'.$error.'</p>';}?>
      <form id="regform" name="regform" action="functions/register.php" method="post" onsubmit="return validateworm()">
          <div class="form-group">
            <label for="name">Овог:</label>
            <input type="text" id="fname" class="form-c" name="family_name" placeholder="Овог" >
            <span id="fnamet" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Нэр:</label>
            <input type="text" id="name" class="form-c" name="name" placeholder="Нэр" >
            <span id="namet" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Хүйс:</label>
            <div class="form-group"><input type="radio" id="huis1" name="huis" value="Эр" checked=""><label for="huis1">Эр</label></div>
          <div class="form-group"><input type="radio" id="huis2" name="huis" value="Эм"><label for="huis2">Эм</label></div>
          <div class="form-group"><input type="radio" id="huis3" name="huis" value="Бусад"><label for="huis3">Бусад</label></div>
            <span id="huist" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Төрсөн огноо:</label>
            <input type="date" class="form-c" name="birthday" placeholder="Төрсөн огноо"  min="1900-01-01" max="<?php echo date("Y-m-d");?>" value="<?php echo date("Y-m-d");?>">
            <span id="birthdayt" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Мэргэжил:</label>
            <select class="form-c" name="prof">
              <?php
                if (mysqli_num_rows($profs)==0) {
                  echo "<option>Уучлаарай сонгох мэргэжил алга</option>";
                }
                else
                {
                  while ($row=mysqli_fetch_array($profs)) {
                    echo '<option value="'.$row["id"].'">'.$row["name"].'</option>';
                  }
                }
                ?>
            </select>
            <span id="proft" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Регистрийн дугаар:</label>
            <select name="personal1" class="form-c form-personal" id="personal1">
              <option value="А">А</option>
              <option value="Б">Б</option>
              <option value="В">В</option>
              <option value="Г">Г</option>
              <option value="Д">Д</option>
              <option value="Е">Е</option>
              <option value="Ё">Ё</option>
              <option value="Ж">Ж</option>
              <option value="З">З</option>
              <option value="И">И</option>
              <option value="Й">Й</option>
              <option value="К">К</option>
              <option value="Л">Л</option>
              <option value="М">М</option>
              <option value="Н">Н</option>
              <option value="О">О</option>
              <option value="Ө">Ө</option>
              <option value="П">П</option>
              <option value="Р">Р</option>
              <option value="С">С</option>
              <option value="Т">Т</option>
              <option value="У">У</option>
              <option value="Ү">Ү</option>
              <option value="Ф">Ф</option>
              <option value="Х">Х</option>
              <option value="Ц">Ц</option>
              <option value="Ч">Ч</option>
              <option value="Ш">Ш</option>
              <option value="Щ">Щ</option>
              <option value="Ъ">Ъ</option>
              <option value="Ы">Ы</option>
              <option value="Ь">Ь</option>
              <option value="Э">Э</option>
              <option value="Ю">Ю</option>
              <option value="Я">Я</option>
            </select>
            <select name="personal2" class="form-c form-personal" id="personal2">
              <option value="А">А</option>
              <option value="Б">Б</option>
              <option value="В">В</option>
              <option value="Г">Г</option>
              <option value="Д">Д</option>
              <option value="Е">Е</option>
              <option value="Ё">Ё</option>
              <option value="Ж">Ж</option>
              <option value="З">З</option>
              <option value="И">И</option>
              <option value="Й">Й</option>
              <option value="К">К</option>
              <option value="Л">Л</option>
              <option value="М">М</option>
              <option value="Н">Н</option>
              <option value="О">О</option>
              <option value="Ө">Ө</option>
              <option value="П">П</option>
              <option value="Р">Р</option>
              <option value="С">С</option>
              <option value="Т">Т</option>
              <option value="У">У</option>
              <option value="Ү">Ү</option>
              <option value="Ф">Ф</option>
              <option value="Х">Х</option>
              <option value="Ц">Ц</option>
              <option value="Ч">Ч</option>
              <option value="Ш">Ш</option>
              <option value="Щ">Щ</option>
              <option value="Ъ">Ъ</option>
              <option value="Ы">Ы</option>
              <option value="Ь">Ь</option>
              <option value="Э">Э</option>
              <option value="Ю">Ю</option>
              <option value="Я">Я</option>
            </select>
            <input type="number" id="personal" class="form-c form-personaler" name="personal_id" placeholder="Регистрийн дугаараа энд бичнэ үү">
            <span id="personalt" class="wtext"></span>
            <span id="personalt2"></span>
          </div>
          <div class="form-group">
            <label for="name">Утасны дугаар:</label>
            <input type="number" id="phone" id="phonen" class="form-c" name="phone" placeholder="Утасны дугаараа энд бичнэ үү">
            <span id="phonet" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Имэйл:</label>
            <input type="email" id="email" class="form-c" name="email" placeholder="Имэйл хаягаа энд бичнэ үү" >
            <span id="emailt" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Гэрийн хаяг:</label>
            <input type="text" id="address" class="form-c" name="address" placeholder="Гэрийн хаягаа энд бичнэ үү" >
            <span id="addresst" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Жолооны үнэмлэхтэй эсэх:</label>
            <select class="form-c" id="driver" name="driver_license[]" multiple>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
            <span id="drivert" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Нууц үг:</label>
            <input type="password" id="pass" class="form-c" name="password" placeholder="Нууц үгээ бичнэ үү" >
            <span id="passt" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Нууц үг давтах:</label>
            <input type="password" id="pass2" class="form-c" name="password2" placeholder="Нууц үгээ давтаж бичнэ үү" >
            <span id="pass2t" class="wtext"></span>
          </div>

          <button type="submit" class="btn btn-success">Бүртгүүлэх</button>
        </form>
  </section>
</main>
<footer id="footer">
  <div class="wrapper">

    <ul class="footer-nav">
        <a href="#">Эхлэл</a>
        <a href="#">Эхлэл</a>
    </ul>
    <div class="copy">
      &copy; Miga's journal 2020
      All rights reserved.
    </div>
  </div>
</footer>
<script
  src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous"></script>
<script>
function validateworm() {
  var i = 0;
  var x = document.forms["regform"]["family_name"].value;
  if (x == "") {
    var element = document.getElementById("fname");
    element.classList.add("warning");
    $("#fnamet").text("Та овог заавал бичсэн байх шаардлагатай");
    i++;
  }
  var x2 = document.forms["regform"]["name"].value;
  if (x2 == "") {
    var element = document.getElementById("name");
    element.classList.add("warning");
    $("#namet").text("Та нэр заавал бичсэн байх шаардлагатай");
    i++;
  }
  var x3 = document.forms["regform"]["personal_id"].value;
  if (x3 == ""||x3 < 10000000||x3 > 99999999) {
    var element = document.getElementById("personal");
    element.classList.add("warning");
    $("#personalt").text("Та регистрийн дугаар заавал бичсэн байх шаардлагатай");
    i++;
  }
  var x4 = document.forms["regform"]["phone"].value;
  if (x4 == ""||x4 < 10000000||x4 > 99999999) {
    var element = document.getElementById("phone");
    element.classList.add("warning");
    $("#phonet").text("Та утасны дугаараа заавал бичсэн байх шаардлагатай");
    i++;
  }
  var x5 = document.forms["regform"]["email"].value;
  if (x5 == "") {
    var element = document.getElementById("email");
    element.classList.add("warning");
    $("#emailt").text("Та имэйл заавал бичсэн байх шаардлагатай");
    i++;
  }
  var x6 = document.forms["regform"]["address"].value;
  if (x6 == "") {
    var element = document.getElementById("address");
    element.classList.add("warning");
    $("#addresst").text("Та хаягаа заавал бичсэн байх шаардлагатай");
    i++;
  }
  var x7 = document.forms["regform"]["pass"].value;
  if (x7 == "") {
    var element = document.getElementById("pass");
    element.classList.add("warning");
    $("#passt").text("Та нууц үг заавал бичсэн байх шаардлагатай");
    i++;
  }
  var x8 = document.forms["regform"]["pass2"].value;
  if (x8 == "") {
    var element = document.getElementById("pass2");
    element.classList.add("warning");
    $("#pass2t").text("Та нууц үгээ давтаж заавал бичсэн байх шаардлагатай");
    i++;
  }
  if (x7 != x8) {
    var element = document.getElementById("pass2");
    element.classList.add("warning");
    $("#pass2t").text("Та нууц үг давтаж бичих буруу байна");
    i++;
  }
  if (i > 0) {
    return false;
  }
}
$(document).ready(function(){
  $("#fname").keypress(function(){
    var element = document.getElementById("fname");
    element.classList.remove("warning");
    $("#fnamet").text("");
  });
  $("#name").keypress(function(){
    var element = document.getElementById("name");
    element.classList.remove("warning");
    $("#namet").text("");
  });
  $("#personal").keyup(function(){
    var element = document.getElementById("personal");
    element.classList.remove("warning");
    $("#personalt").text("");
    var personaler = document.forms["regform"]["personal_id"].value;
    if (personaler < 10000000||personaler > 99999999) {
      $("#personalt2").text("Таны регистр зөв байх ёстой");
      return false;
    } else {
      $("#personalt2").text("");
    }
  });
  $("#phone").keyup(function(){
    var element = document.getElementById("phone");
    element.classList.remove("warning");
    $("#phonet").text("");
    var phoner = document.forms["regform"]["phone"].value;
    if (phoner < 10000000||phoner > 99999999) {
      $("#phonet").text("Таны утасны дугаар зөв байх ёстой");
      return false;
    } else {
      $("#phonet").text("");
    }
  });
  $("#email").keypress(function(){
    var element = document.getElementById("email");
    element.classList.remove("warning");
    $("#emailt").text("");
  });
  $("#address").keypress(function(){
    var element = document.getElementById("address");
    element.classList.remove("warning");
    $("#addresst").text("");
  });
  $("#fname").keypress(function(){
    var element = document.getElementById("fname");
    element.classList.remove("warning");
    $("#fnamet").text("");
  });
  $("#pass").keypress(function(){
    var element = document.getElementById("pass");
    element.classList.remove("warning");
    $("#passt").text("");
  });
  $("#pass2").keypress(function(){
    var element = document.getElementById("pass2");
    element.classList.remove("warning");
    $("#pass2t").text("");
  });
});
</script>
<script>
function myFunction() {
  var x = document.getElementById("topnav");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}
</script>
</body>
</html>