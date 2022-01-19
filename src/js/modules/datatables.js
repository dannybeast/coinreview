import "datatables";
export default function() {
 // Datatables
 var table = $('.js-datatables-front').DataTable({
  "searching": false
});

// Styles table
$('.js-datatables-front').each( function(){
  var $wrapper = $(this).parents('.table-wrapper');
  // filter
  var $filter = $wrapper.find('.table-wrapper__filter');
  $filter.append($wrapper.find('.dataTables_length'))
  $filter.append($wrapper.find('.dataTables_filter'))

  // pagination
  $wrapper.append('<div class="table-wrapper__footer"></div>')
  var $footer = $wrapper.find('.table-wrapper__footer');
  $footer.append($wrapper.find('.dataTables_info'))
  $footer.append($wrapper.find('.dataTables_paginate'))
})




}
