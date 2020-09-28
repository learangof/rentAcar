$(document).ready(function () {
  $("#id_adduser").submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    data = objectifyForm(data);
    var fname = isEmpty(data["u_fName"], "u_fName");
    var lname = isEmpty(data["u_lName"], "u_lName");
    var phone = checkPhoneNumber(data["u_phone"], "u_phone");
    var email = checkEmail(data["u_email"], "u_email");
    var pass = isEmpty(data["u_pass"], "u_pass");
    var check_email = checkConfirmPass(
      data["u_pass"],
      data["u_cPass"],
      "u_cPass",
      "add_user"
    );
    if (!fname && !lname && phone && !pass && email && !pass && check_email) {
      request2DB("back/php/user.php", data, "register", function (resultData) {
        if (resultData.result === true) {
          $("#addModal").modal("hide");
          showSuccessAlert("The record has added",
            3000
          );
          setTimeout(viewData, 2000);
          setTimeout(resetForm, 2000);
          function resetForm () {  
            $('#id_adduser').trigger("reset");
            $('#id_adduser').find('.is-valid').removeClass('is-valid');
          }
        } else {
          $("#addModal").modal("hide");
          showWarningAlert(
            "something went wrong while processing this request. Try Again and Check your ingressed data",
            3000
          );  
          setTimeout(viewData, 2000);
          setTimeout(resetForm, 2000);
          function resetForm () {  
            $('#id_adduser').trigger("reset");
            $('#id_adduser').find('.is-valid').removeClass('is-valid');
          }
        }
      });
    }
  });
  viewData();
});
function viewData() {
  $.ajax({
    type: "GET",
    url: "back/php/users.php",
    data: { p: "view" },
  }).done(function (data) {
    $("tbody").html(data);
    tableData();
  });

}
function tableData() {
  $("#id_table").Tabledit({
    url: "back/php/users.php",
    eventType: "dblclick",
    editButton: true,
    deleteButton: true,
    restoreButton: true,
    hideIdentifier: false,
    addButton: true,
    buttons: {
      edit: {
        class: "btn btn-sm btn-default",
        html: '<i class="fas fa-edit btn btn-warning"></i>',
        action: "edit",
      },
      delete: {
        class: "btn btn-sm btn-default",
        html: '<i class="fas fa-trash-alt btn btn-danger"></i>',
        action: "delete",
      },
      save: {
        class: "btn btn-sm btn-success",
        html: "Save",
      },
      restore: {
        class: "btn btn-sm btn-warning",
        html: "Restore",
        action: "restore",
      },
      confirm: {
        class: "btn btn-sm btn-danger",
        html: "Confirm",
      },
    },
    columns: {
      identifier: [0, "Uid"],
      editable: [
        [1, "fname"],
        [2, "lname"],
        [3, "phone"],
        [4, "email"],
        [5, "pass"],
        [6, "type", '{"1":"Admin  ","2":"Customer  "}'],
      ],
    },
    onSuccess: function (data, textStatus, jqXHR) {
      viewData();
    },
    onFail: function (jqXHR, textStatus, errorThrown) {
    },
    onAjax: function (action, serialize) {
    },
  });
}
