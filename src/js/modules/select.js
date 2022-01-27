import select2 from "select2/dist/js/select2";


function initSelects() {
  let $select = $('.js-select');

  $select.each(function () {
    $(this).select2({
      placeholder: $(this).attr('placeholder'),
      minimumResultsForSearch: -1,
      dropdownParent: $(this).parent(),
      maximumSelectionLength: +$(this).attr('max-selection'),
    })
  })

}


initSelects()