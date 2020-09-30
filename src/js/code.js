$(document).ready(function () {
  $(".alert").hide();
});
function resetForm () {  
  $('#id_adduser').trigger("reset");
  $('#id_adduser').find('.is-valid').removeClass('is-valid');
  $('#id_adduser').find('.is-invalid').removeClass('is-invalid');
}
function request2DB(url, data, action, callback) {
  var resultData;
  $.ajax({
    type: "POST",
    url: url,
    data: { action: action, data: data },
    success: function (response) {
      try {
        resultData = JSON.parse(response);
        callback(resultData);
      } catch (error) {
        console.log(error);
        showWarningAlert(
          "Oops, something went wrong while processing this request. Try later",
          2000
        );
      }
    },
    error: function (response) {
      showWarningAlert(
        "Oops, something went wrong while processing this request. Try later",
        2000
      );
    },
  });
}
function showWarningAlert(msg, time) {
  $("#id_warning_message").html(msg);
  $(".alert-danger")
    .fadeTo(time, 500)
    .slideDown(500, function () {
      $(".alert-danger").slideUp(500);
    });
}
function showSuccessAlert(msg, time) {
  $("#id_success_message").html(msg);
  $(".alert-success")
    .fadeTo(time, 500)
    .slideDown(500, function () {
      $(".alert-success").slideUp(500);
    });
}
function setHeader(type, name) {
  window.user = type;
  $("#id_login_btn").addClass("d-none");
  $("#id_dropdow_profile").removeClass("d-none");
  $("#id_profile_name").html(name);
  if (type === "U") {
    $("#id_contact_us").removeClass("d-none");
  }
   
  if (type === "A") {
    $("#id_profile_home").removeClass("d-none");
    $("#id_nav_profile").addClass("justify-content-between");
    $("#id_nav_profile").addClass("sticky-top");
  }
}
