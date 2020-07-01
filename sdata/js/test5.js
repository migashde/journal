function validateform() {
  var d = 0;
  var x = document.forms["upform"]["family_name"].value;
  if (x == "") {
    var element = document.getElementById("family_name");
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
    var element = document.getElementById("personal_id");
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
  $("#family_name").keypress(function(){
    var element = document.getElementById("family_name");
    element.classList.remove("warning");
    $("#fnamet").text("");
  });
  $("#name").keypress(function(){
    var element = document.getElementById("name");
    element.classList.remove("warning");
    $("#namet").text("");
  });
  $("#personal_id").keyup(function(){
    var element = document.getElementById("personal_id");
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
});