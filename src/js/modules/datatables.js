import "datatables";
export default function() {
 // Datatables
 $(".js-datatables").each(function() {
  let pageLength = +$(this).data("page-length");
  let ordering = $(this).attr("ordering") ? true : false;

  let table = $(this).DataTable({
   searching: false,
   ordering: ordering,
   pageLength: pageLength,
   responsive: true,
  });
  //Обернуть в span, чтобы кнопки сортировки были расположены красиво
  $(this)
   .find("th")
   .each(function() {
    $(this).wrapInner("<span></span>");
   });
  //Обернуть чтобы был скролл в мобильном
  $(this).wrap('<div class="table-wrapper"></div>');

  $(this).on("draw.dt", function() {
   if (document.querySelector(".js-sticky-sidebar")) {
    window.sidebar[0].updateSticky();
   }
  });

  function orderDetailsInfo(d) {
   return `<div class="table-row-description typography">${d}</div>`;
  }

  $(".js-datatables tbody").on("click", "td.details-control", function() {
   //-console.log(table);
   var tr = $(this).closest("tr");
   var row = table.row(tr);

   let data = $(this).find('.table-row-description-content').html();
    //-console.log(data);
   if (row.child.isShown()) {
    row.child.hide();
    tr.removeClass("shown");
   } else {
    row.child(orderDetailsInfo(data)).show();
    tr.addClass("shown");
   }
  });
 });
}
