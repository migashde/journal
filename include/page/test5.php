<?php
if ($this->cs->is('id')==0) {
    header('Location: test3');
}
if($_SERVER["REQUEST_METHOD"] == "POST"){

$family_name = $_POST['family_name'];
$name = $_POST['name'];
$huis = $_POST['huis'];
$birthday = $_POST['birthday'];
$prof = $_POST['prof'];
$personal1 = $_POST['personal1'];
$personal2 = $_POST['personal2'];
$personal_id = $_POST['personal_id'];
$phone = $_POST['phone'];
$email = trim(htmlspecialchars($_POST['email']));
$email = filter_var($email, FILTER_VALIDATE_EMAIL);
$address = $_POST['address'];
$driver_license = '';

if($_POST["driver_license"]) {
  $i = 0;
  foreach ($_POST['driver_license'] as $subject){
    if ($i == 0) {
      $driver_license = $subject;
    } else {
      $driver_license = $driver_license.','.$subject;
    }
    $i++;
  }
}

  $sql = 'SELECT email, phone FROM users WHERE email = "'.$email.'" OR phone = "'.$phone.'"';

  if($this->db->fetch($sql)->num_rows <= 1){

    $this->db->modify('users', array(
      'family_name' => $family_name,
      'name' => $name,
      'huis' => $huis,
      'birthday' => $birthday,
      'prof_id' => $prof,
      'personal_id' => $personal1.$personal2.$personal_id,
      'phone' => $phone,
      'email' => $email,
      'address' => $address,
      'driver_license' => $driver_license
    ), 'id = "'.$this->cs->get('id').'"');

    $_SESSION['login'] = $family_name.' '.$name;


    header('Location: test3?sent');
  } else {
    header('Location: test5?error=1');
  }
}

$error = '';
if (isset($_GET['error'])) {
    if ($_GET['error']==1) {
        $error = 'Утасны дугаар, имэйлийг өөр хэрэглэгч ашигласан байна!';
    } else {
      $error = 'Нууц үг тохирсонгүй!';
    }
}

$user=$this->db->fetch('SELECT * FROM users WHERE id = "'.$this->cs->get('id').'"', 4);

$profs=$this->db->fetch('SELECT * FROM profs ORDER BY id DESC');
?>
<main id="main" class="wrapper" role="main">
  <section class="midform">
    <h3 class="b-title">Бүртгүүлэх хэсэг</h3>
    <?php if($error!=''){echo '<p style="color:brown">'.$error.'</p>';}?>
      <form id="upform" name="upform" method="post" onsubmit="return validateform()">
        <?php if(isset($user)) {
          echo '<input type="hidden" name="id" value="'.$user['id'].'"><div class="form-group">
          <label for="name">Овог:</label>
          <input type="text" id="fname"  class="form-c" name="family_name" value="'.$user['family_name'].'">
            <span id="fnamet" class="wtext"></span>
        </div>
        <div class="form-group">
          <label for="name">Нэр:</label>
          <input type="text" id="name" class="form-c" name="name" value="'.$user['name'].'">
            <span id="namet" class="wtext"></span>
        </div>
        <div class="form-group">
          <label for="name">Хүйс:</label>
          ';
          $huiser = '';
          $huisem = '';
          $huisbu = '';
          if ($user['huis'] == 'Эр') {
            $huiser = 'checked';
          }
          if ($user['huis'] == 'Эм') {
            $huisem = 'checked';
          }
          if ($user['huis'] == 'Бусад') {
            $huisbu = 'checked';
          }

          echo '<div class="form-group"><input type="radio" id="huis1" name="huis" value="Эр" '.$huiser.'><label for="huis1">Эр</label></div>
          <div class="form-group"><input type="radio" id="huis2" name="huis" value="Эм" '.$huisem.'><label for="huis2">Эм</label></div>
          <div class="form-group"><input type="radio" id="huis3" name="huis" value="Бусад" '.$huisbu.'><label for="huis3">Бусад</label></div>
            <span id="huist" class="wtext"></span>
        </div>
        <div class="form-group">
          <label for="name">Төрсөн огноо:</label>
          <input type="date" class="form-c" name="birthday" value="'.$user['birthday'].'" min="1900-01-01" max="'.date("Y-m-d").'">
            <span id="birthdayt" class="wtext"></span>
        </div>
        <div class="form-group">
          <label for="name">Мэргэжил:</label>
          <select class="form-c" name="prof">'
          ;
          if (mysqli_num_rows($profs)==0) {
                echo "<option>Уучлаарай сонгох мэргэжил алга</option>";
              }
              else
              {
                $selected = '';
                while ($row2=mysqli_fetch_array($profs)) {
                  if ($user['prof_id']==$row2['id']) {
                    $selected = 'selected';
                  }
                  echo '<option value="'.$row2["id"].'" '.$selected.'>'.$row2["name"].'</option>';
                  $selected = '';
                }
              }

$per1 = mb_substr($user["personal_id"], 0, 1, 'utf-8');
$per2 = mb_substr($user["personal_id"], 1, 1, 'utf-8');
$per3 = mb_substr($user["personal_id"], 2, 8);

              echo '</select>
            <span id="proft" class="wtext"></span>
        </div>
        <div class="form-group">
          <label for="name">Регистрийн дугаар:</label>
          <select name="personal1" class="form-c form-personal" id="personal1">
              <option value="'.$per1.'" selected>'.$per1.'</option>
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
              <option value="'.$per2.'" selected>'.$per2.'</option>
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
          <input type="number" id="personal" class="form-c form-personaler" name="personal_id" placeholder="Регистрийн дугаараа энд бичнэ үү" value="'.$per3.'">
            <span id="personalt" class="wtext"></span>
            <span id="personalt2"></span>
        </div>
        <div class="form-group">
          <label for="name">Утасны дугаар:</label>
          <input type="number" id="phone" class="form-c" name="phone" value="'.$user['phone'].'">
            <span id="phonet" class="wtext"></span>
        </div>
        <div class="form-group">
          <label for="name">Имэйл:</label>
          <input type="email" id="email" class="form-c" name="email" value="'.$user['email'].'">
            <span id="emailt" class="wtext"></span>
        </div>
        <div class="form-group">
          <label for="name">Гэрийн хаяг:</label>
          <input type="text" id="address class="form-c" name="address" value="'.$user['address'].'">
            <span id="addresst" class="wtext"></span>
        </div>
        <div class="form-group">
          <label for="name">Жолооны үнэмлэхтэй эсэх:</label>
          <select class="form-c" name="driver_license[]" multiple>
          ';

          $drived = explode(',', $user['driver_license']);
          $driveda = '';
          $drivedb = '';
          $drivedc = '';
          $drivedd = '';
          $drivede = '';
          foreach ($drived as $drives) {
            if ($drives == 'A') {
              $driveda = 'selected';
            }
            if ($drives == 'B') {
              $drivedb = 'selected';
            }
            if ($drives == 'C') {
              $drivedc = 'selected';
            }
            if ($drives == 'D') {
              $drivedd = 'selected';
            }
            if ($drives == 'E') {
              $drivede = 'selected';
            }
          }

            echo '
            <option value="A" '.$driveda.'>A</option>
            <option value="B" '.$drivedb.'>B</option>
            <option value="C" '.$drivedc.'>C</option>
            <option value="D" '.$drivedd.'>D</option>
            <option value="E" '.$drivede.'>E</option>
          </select>
            <span id="drivert" class="wtext"></span>
        </div>';
        }?>

        <button type="submit" class="btn btn-success">Засах</button>
      </form>
  </section>
</main>
<script
  src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous"></script>
<script>
function validateform() {
  var d = 0;
  var x = document.forms["upform"]["family_name"].value;
  if (x == "") {
    var element = document.getElementById("fname");
    element.classList.add("warning");
    $("#fnamet").text("Та овог заавал бичсэн байх шаардлагатай");
    d++;
  }
  var x2 = document.forms["upform"]["name"].value;
  if (x2 == "") {
    var element = document.getElementById("name");
    element.classList.add("warning");
    $("#namet").text("Та нэр заавал бичсэн байх шаардлагатай");
    d++;
  }
  var x3 = document.forms["upform"]["personal_id"].value;
  if (x3 == ""||x3 < 10000000||x3 > 99999999) {
    var element = document.getElementById("personal");
    element.classList.add("warning");
    $("#personalt").text("Та регистрийн дугаар заавал бичсэн байх шаардлагатай");
    d++;
  }
  var x4 = document.forms["upform"]["phone"].value;
  if (x4 == ""||x4 < 10000000||x4 > 99999999) {
    var element = document.getElementById("phone");
    element.classList.add("warning");
    $("#phonet").text("Та утасны дугаараа заавал бичсэн байх шаардлагатай");
    d++;
  }
  var x5 = document.forms["upform"]["email"].value;
  if (x5 == "") {
    var element = document.getElementById("email");
    element.classList.add("warning");
    $("#emailt").text("Та имэйл заавал бичсэн байх шаардлагатай");
    d++;
  }
  if (d > 0) {
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
    var personaler = document.forms["upform"]["personal_id"].value;
    if (personaler < 10000000||personaler > 99999999) {
      $("#personalt2").text("Таны регистр зөв байх ёстой");
    } else {
      $("#personalt2").text("");
    }
  });
  $("#phone").keyup(function(){
    var element = document.getElementById("phone");
    element.classList.remove("warning");
    $("#phonet").text("");
    var phoner = document.forms["upform"]["phone"].value;
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
  $("#fname").keypress(function(){
    var element = document.getElementById("fname");
    element.classList.remove("warning");
    $("#fnamet").text("");
  });
});
</script>