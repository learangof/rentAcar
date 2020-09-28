$(document).ready(function () {
  $("#id_edit_profile").submit(function (e) { 
    e.preventDefault();
    var data = $(this).serializeArray();
    data = objectifyForm(data);
    console.log(data);
    var fname = isEmpty(data['u_fName'],'u_fName');
    var lname = isEmpty(data['u_lName'],'u_lName');
    var phone = checkPhoneNumber(data['u_phone'],'u_phone');
    var email = checkEmail(data['u_email'],'u_email');
    var pass = isEmpty(data['u_pass'],'u_pass');
    var check_email = checkConfirmPass(data['u_pass'],data['u_cPass'],'u_cPass','sign_up');
    if(!fname && !lname && phone && !pass && email && !pass && check_email){
      request2DB("back/php/user.php",data,"update",function(resultData){
        if(resultData.result === true){
          showSuccessAlert(" You will redirect in 3 second",1000);
          setTimeout(redirec1, 1000);
          setTimeout(redirec2, 2000);
          setTimeout(redirec3, 3000);
          function redirec1(){
            showSuccessAlert(" You will redirect in 2 second",1000);
          }
          function redirec2(){
            showSuccessAlert(" You will redirect in 1 second",2000);
          }
          function redirec3(){
            location.href = 'index.php';
          }
        }else{
          showWarningAlert("something went wrong while processing this request. Try Again and Check your ingressed data",3000); 
        }
      });
    }
  });
  $("#id_signup").submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    data = objectifyForm(data);
    var fname = isEmpty(data['u_fName'],'u_fName');
    var lname = isEmpty(data['u_lName'],'u_lName');
    var phone = checkPhoneNumber(data['u_phone'],'u_phone');
    var email = checkEmail(data['u_email'],'u_email');
    var pass = isEmpty(data['u_pass'],'u_pass');
    var check_email = checkConfirmPass(data['u_pass'],data['u_cPass'],'u_cPass','sign_up');
    if(!fname && !lname && phone && !pass && email && !pass && check_email){
      request2DB("back/php/user.php",data,"register",function(resultData){
        if(resultData.result === true){
          showSuccessAlert(resultData.message+" You will redirect in 3 second",1000);
          setTimeout(redirec1, 1000);
          setTimeout(redirec2, 2000);
          setTimeout(redirec3, 3000);
          function redirec1(){
            showSuccessAlert(resultData.message+" You will redirect in 2 second",1000);
          }
          function redirec2(){
            showSuccessAlert(resultData.message+" You will redirect in 1 second",2000);
          }
          function redirec3(){
            location.href = 'login.php?action=login';
          }
        }else{
          showWarningAlert("something went wrong while processing this request. Try Again and Check your ingressed data",3000); 
        }
      });
    }
  });
  $("#id_login").submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    data = objectifyForm(data);
    var pass = isEmpty(data['u_pass'],'u_pass');
    var email = isEmpty(data['u_email'],'u_email');
    var captcha = !isEmpty(data['g-recaptcha-response'],'u-cat');
    if(!pass &&  !email && !captcha){
      /*var key = '6Ldc1M4ZAAAAAJWY-vEmFoYJXL0m9Wze4CYIdiwa';
      var res = /*grecaptcha.getResponse()+"22";
      var url = "https://www.google.com/recaptcha/api/siteverify?secret="+key+"&response="+res;
      //window.open(url, '_blank', 'width=500,height=500');

    $.ajax({
        type: "GET",
        url: "https://www.google.com/recaptcha/api/siteverify",
        data: {secret: key, response: res},
        success: function (response) {
          console.log(response);
        
      });*/
      request2DB("back/php/user.php",data,"login",function(resultData){
        if(resultData.result === true){
          location.href = 'index.php';
        }else{
          $("#u-credentials").addClass('is-invalid');
        }
      });
    }
  });
});

function getUserData(email){
  request2DB("back/php/user.php",email,"select",function(resultData){
    if(resultData.result === true){
      var data = resultData.data[0];
      $("#id_fullname").html(data.fname+" "+data.lname);
      $("#u_fName").attr("value", data.fname);
      $("#u_lName").attr("value", data.lname);
      $("#u_phone").attr("value", "0"+data.phone);
      $("#u_email").attr("value", data.email);
      $("#u_pass").attr("value", data.pass);
      $("#u_cPass").attr("value", data.pass);
    }
  });
}
