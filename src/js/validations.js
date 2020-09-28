function objectifyForm(formArray) {
  var returnArray = {};
  for (var i = 0; i < formArray.length; i++) {
    returnArray[formArray[i]["name"]] = formArray[i]["value"];
  }
  return returnArray;
}
function checkPhoneNumber(phone,name) {
  var exp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(checkWithRegularExpression(phone,exp,name) && !isEmpty(phone,name)){
      return true;
  }else{
      return false;
  }
}
function checkEmail(email,name) {
    var exp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(checkWithRegularExpression(email,exp,name) && !isEmpty(email,name)){
          return true;
      }else{
          return false;
      }
  }
function checkWithRegularExpression(txt,expression,name) {
  if (txt.match(expression)) {
    $("#" + name).removeClass("is-invalid");
    $("#" + name).addClass("is-valid");
    return true;
  } else {
    $("#" + name).removeClass("is-valid");
    $("#" + name).addClass("is-invalid");
    return false;
  }
}
function isEmpty(data, name) {
  if (data == null || data == "null" || data == "") {
    $("#" + name).removeClass("is-valid");
    $("#" + name).addClass("is-invalid");
    return true;
  } else {
    $("#" + name).removeClass("is-invalid");
    $("#" + name).addClass("is-valid");
    return false;
  }
}
function checkConfirmPass(pass, c_pass, name, c_name) {
  if (!isEmpty(c_pass, name) && pass == c_pass) {
    $("#" + c_name).removeClass("is-invalid");
    $("#" + c_name).addClass("is-valid");
    return true;
  } else {
    $("#" + c_name).removeClass("is-valid");
    $("#" + c_name).addClass("is-invalid");
    return false;
  }
}
