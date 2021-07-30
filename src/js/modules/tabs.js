export default function() {
    // Tabs
      let $tabs = $(".js-tabs");
    
      $tabs.each(function() {
        let tabs_item = $(this);
    
        function showTab(index) {
          tabs_item
            .find(".js-tab-link")
            .eq(index)
            .addClass("is-active");
          tabs_item
            .find(".js-tab-content")
            .eq(index)
            .show();
     
        }
        function hideTabs() {
          tabs_item.find(".js-tab-link.is-active").removeClass("is-active");
          tabs_item.find(".js-tab-content").hide();
        }
        hideTabs();
        showTab(0);
        tabs_item.find(".js-tab-link").click(function() {
          hideTabs();
          showTab($(this).index());
        });
      });
    
    }