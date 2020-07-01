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
function myFunction() {
  var x = document.getElementById("topnav");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}