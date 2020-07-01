<?php

$this->js('test4');

if ($this->cs->is('id')==2) {
    $this->req->url('@');
}

$error = '';

if($_SERVER["REQUEST_METHOD"] == "POST"){

  if ($_POST['password']==$_POST['password2']) {
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
    $password = md5($_POST['password']);

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
        'driver_license' => $driver_license,
        'passwd' => $password
      ));
    } else {
      $error = 'Утасны дугаар, имэйлийг өөр хэрэглэгч ашигласан байна!';
    }


    
  } else {
    $error = 'Нууц үг тохирсонгүй!';
  }
}

$profs=$this->db->fetch('SELECT * FROM profs ORDER BY id DESC');
  
?>
<main id="main" class="wrapper" role="main">
  <section class="midform">
    <h3 class="b-title">Бүртгүүлэх хэсэг</h3>
    <?php if($error!=''){echo '<p style="color:brown">'.$error.'</p>';}?>
      <form id="regform" name="regform" method="post" onsubmit="return validateworm()">
          <div class="form-group">
            <label for="family_name">Овог:</label>
            <input type="text" id="family_name" class="form-c" name="family_name" placeholder="Овог" >
            <span id="fnamet" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="name">Нэр:</label>
            <input type="text" id="name" class="form-c" name="name" placeholder="Нэр" >
            <span id="namet" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="huis">Хүйс:</label>
            <div class="form-group"><input type="radio" id="huis1" name="huis" value="Эр" checked=""><label for="huis1">Эр</label></div>
          <div class="form-group"><input type="radio" id="huis2" name="huis" value="Эм"><label for="huis2">Эм</label></div>
          <div class="form-group"><input type="radio" id="huis3" name="huis" value="Бусад"><label for="huis3">Бусад</label></div>
            <span id="huist" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="birthday">Төрсөн огноо:</label>
            <input type="date" class="form-c" id="birthday" name="birthday" placeholder="Төрсөн огноо"  min="1900-01-01" max="<?php echo date("Y-m-d");?>" value="<?php echo date("Y-m-d");?>">
            <span id="birthdayt" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="prof">Мэргэжил:</label>
            <select class="form-c" name="prof" id="prof">
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
            <label for="personal_id personal1 personal2">Регистрийн дугаар:</label>
            <select name="personal1" class="form-c form-personal" aria-labelledby="personal_id">
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
            <select name="personal2" class="form-c form-personal" aria-labelledby="personal_id">
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
            <input type="number" id="personal_id" class="form-c form-personaler" name="personal_id" placeholder="Регистрийн дугаараа энд бичнэ үү">
            <span id="personalt" class="wtext"></span>
            <span id="personalt2"></span>
          </div>
          <div class="form-group">
            <label for="phone">Утасны дугаар:</label>
            <input type="number" id="phone" id="phonen" class="form-c" name="phone" placeholder="Утасны дугаараа энд бичнэ үү">
            <span id="phonet" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="email">Имэйл:</label>
            <input type="email" id="email" class="form-c" name="email" placeholder="Имэйл хаягаа энд бичнэ үү" >
            <span id="emailt" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="address">Гэрийн хаяг:</label>
            <input type="text" id="address" class="form-c" name="address" placeholder="Гэрийн хаягаа энд бичнэ үү" >
            <span id="addresst" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="driver_license">Жолооны үнэмлэхтэй эсэх:</label>
            <select class="form-c" id="driver_license" name="driver_license[]" multiple>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
            <span id="drivert" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="pass">Нууц үг:</label>
            <input type="password" id="pass" class="form-c" name="password" placeholder="Нууц үгээ бичнэ үү" >
            <span id="passt" class="wtext"></span>
          </div>
          <div class="form-group">
            <label for="pass2">Нууц үг давтах:</label>
            <input type="password" id="pass2" class="form-c" name="password2" placeholder="Нууц үгээ давтаж бичнэ үү" >
            <span id="pass2t" class="wtext"></span>
          </div>

          <button type="submit" class="btn btn-success">Бүртгүүлэх</button>
        </form>
  </section>
</main>