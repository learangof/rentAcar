$("#addRecord").click(function (e) {});
$(document).ready(function () {
  viewData();
});
function viewData() {
    var back_url = "back/php/bookings.php";
  $.ajax({
    type: "GET",
    url: back_url,
    data: { p: "view" },
  }).done(function (data) {
    $("tbody").html(data);
    tableData(back_url);
    $("#id_special").children("td").addClass("d-none");
    $(".tabledit-toolbar-column").attr("rowspan", "2");
  });
}
function tableData(back_url) {
  $("#id_table").Tabledit({
    url: back_url,
    eventType: "dblclick",
    editButton: true,
    deleteButton: false,
    acceptButton: true,
    rejectButton: true,
    hideIdentifier: false,
    columns: {
      identifier: [0, "Bid"],
      editable: [
        [1, "fname"],
        [2, "lname"],
        [3, "email"],
        [4, "Cid"],
        [5, "model"],
        [6, "type"],
        [7, "price"],
        [8, "total"],
        [9, "cDate"],
        [10, "dDate"],
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
