$(document).ready(function () {
  $("#id_adduser").submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    data = objectifyForm(data);
    var model = isEmpty(data["u_model"], "u_model");
    var price = isEmpty(data["u_price"], "u_price");
    var type = isEmpty(data["u_type"], "u_type");
    if (!model && !price && !type) {
      request2DB("back/php/cars.php", data, "add", function (resultData) {
        if (resultData.result === true) {
          $("#addModal").modal("hide");
          showSuccessAlert("The record has added", 3000);
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
  var back_url = "back/php/cars.php";
  $.ajax({
    type: "GET",
    url: back_url,
    data: { p: "view" },
  }).done(function (data) {
    $("tbody").html(data);
    tableData(back_url);
  });
}
function tableData(back_url) {
  $("#id_table").Tabledit({
    url: back_url,
    eventType: "dblclick",
    editButton: true,
    deleteButton: true,
    addButton: true,
    hideIdentifier: false,
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
      identifier: [0, "Cid"],
      editable: [
        [1, "model"],
        [2, "price"],
        [
          3,
          "type",
          '{"Sedan":"Sedan", "Truck":"Truck", "SUV":"SUV", "VAN":"VAN"}',
        ],
      ],
    },
    onSuccess: function (data, textStatus, jqXHR) {
      viewData();
      console.log("succes");
    },
    onFail: function (jqXHR, textStatus, errorThrown) {
      console.log("onFail(jqXHR, textStatus, errorThrown)");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
    onAjax: function (action, serialize) {
      console.log("ajax");
      console.log("onAjax(action, serialize)");
      console.log(action);
      console.log(serialize);
    },
  });
}
