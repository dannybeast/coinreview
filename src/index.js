// SVG
import WalletConnectProvider from "@walletconnect/web3-provider";

var __svg__ = {
  path: "./assets/icons/**/*.svg",
  name: "assets/icons/sprite.svg",
};
__svg__ = {
  filename: "/assets/icons/sprite.svg",
};
require("webpack-svgstore-plugin/src/helpers/svgxhr")(__svg__);
import 'sticky-sidebar-v2';
import ResizeSensor from 'resize-sensor/ResizeSensor';
// SCSS
import "./assets/scss/main.scss";

// Modules
import hideLoader from "./js/modules/loader";
//-import Accordion from "./js/modules/accordion";
//-import inputmasks from "./js/modules/inputmasks";
import sliders from "./js/modules/sliders";

import "./js/modules/inputNumber";
import "./js/modules/awesome-notifications";
import dropdown from "./js/modules/dropdown";
import {
  Fancybox
} from "@fancyapps/ui";
//-import "./js/modules/google-map";
import tabs from "./js/modules/tabs";
import "./js/libs/datepicker";
import "./js/libs/jquery.scrollbar";
import "./js/modules/customSelect";
import {
  truncate
} from "./js/modules/helpers";
import copy from "./js/modules/copy";
import websockets from "./js/modules/websockets";
import "jquery-ui/ui/widgets/slider";
import "jquery-ui-touch-punch";
import "./js/swap/init";
import "./js/modules/timer";
//import "./js/modules/timer";
//import "./js/modules/swap-select";
import Web3Modal from "web3modal";

websockets();

$(document).ready(function () {

  $('.scrollbar-inner').scrollbar();


  Fancybox.bind(".js-modal", {
    dragToClose: false,
    groupAttr: false,
  });
  window.Modal = Fancybox


  // mob menu
  function positionMobileMenu() {
    let mobMenu = $('.mobile-menu');
    let topBanner = $('.main-layout__top-banner');
    let header = $('.header');
    let posTop = header.height();
    if (topBanner.length) {
      posTop = posTop + topBanner.height();
    }
    mobMenu.css('top', posTop)
  }
  positionMobileMenu();
  $(window).resize(function () {
    positionMobileMenu();
  })
  //-


  // timer
  window.setTimer();


  copy()

  function initSticky() {
    if (document.querySelector('.js-sticky-sidebar')) {
      window.sidebar = new StickySidebar('.js-sticky-sidebar', {
        resizeSensor: true,
        topSpacing: 0,
        bottomSpacing: 0,
        innerWrapperSelector: '.sidebar__inner',
        minWidth: 1100
      });
    }
  }

  initSticky();


  new ResizeSensor($('body'), function () {
    if (document.querySelector(".js-sticky-sidebar")) {
      window.sidebar.updateSticky();
    }
  });



  $('.js-datepicker').datepicker();

  sliders();
  dropdown();
  tabs();


  //-inputmasks();

  Fancybox.bind("[data-fancybox]", {
    // Your options go here
  });

  $('.mobile-nav-button').click(function () {
    $('.mobile-menu').toggleClass('open')
    $('body').toggleClass('overflow')
    $(this).find('.hamburger').toggleClass('is-active')
  })



  $('.search-block__button').click(function () {
    $(this).parents('.search-block').toggleClass('is-open')
    $(this).parents('.search-block').find('input').focus();
  })

  $('.search-block__close').click(function () {
    $(this).parents('.search-block').toggleClass('is-open')
  })


  $('.js-show-more').click(function () {
    $(this).parents('.details-text').addClass('is-more')
  })


  $('.main-layout__menu-button').click(function () {
    if ($(".main-layout").hasClass("is-hide-bar")) {
      initSticky();
      $('.main-layout').removeClass('is-hide-bar')

    } else {
      $('.main-layout').addClass('is-hide-bar')
      window.sidebar.destroy();

    }
  })


  $('.file-button input[type=file]').change(function () {
    var filename = $('input[type=file]').val().split('\\').pop();
    var ext = filename.split('.').reverse()[0];
    $(this).parents('label').find('.file-button__button').text(filename)
  })



  function readFile(el) {

    if (el.files && el.files[0]) {

      var FR = new FileReader();

      FR.addEventListener("load", function (e) {
        document.querySelector(".your-logo__logo img").src = e.target.result;
      });

      FR.readAsDataURL(el.files[0]);
    }

  }

  function fieldFile(el) {
    var filename = el.parents('.field-file').find('input').val().split('\\').pop();
    var ext = filename.split('.').reverse()[0];
    el.parents('.field-file').find('span').text(filename)
  }

  $('.field-file input[type=file]').change(function () {


    fieldFile($(this))
    if ($(this).parents('.upload-photo').length) {
      readFile($(this)[0])
      $('.your-logo__logo-text').hide()
    }
  })


  // $('.heart').click(function(){
  //   $(this).toggleClass('heart_is-active')
  // })

  // $('.favorites__button').click(function(){
  //   let disableText =  $(this).data('text-inactive');
  //   let enabledText = $(this).data('text-active');
  //   $(this).toggleClass('is-active');
  //   $(this).toggleText(enabledText, disableText);
  // })

  // $(".table-hover td:not(.not-clickable)").click(function(e) {
  //     window.location = $(this).parents('tr').data("href");
  // });



  // Presale form
  function requiredPresaleFields(val) {
    let link = $('.js-link-presale')
    let time = $('.js-start-presale')

    link.prop('required', val)
    time.prop('required', val)
  }

  function requiredWhitelistFields(val) {
    let link = $('.js-link-whitelist')
    let time = $('.js-finish-whitelist')

    link.prop('required', val)
    time.prop('required', val)
  }

  function requiredAuditFields(val) {
    let link = $('.js-link-audit')

    link.prop('required', val)
  }

  function requiredWhitepapperFields(val) {
    let link = $('.js-link-whitepapper')

    link.prop('required', val)
  }

  $('.js-presale-select').on('change', function () {

    let val = parseInt($(this).val());
    let $block = $('.presale-block');

    if (val === 1) {
      $block.slideDown();
      requiredPresaleFields(true)
    } else {
      $block.slideUp();
      requiredPresaleFields(false)
    }
  })

  $('.js-whitelist-select').on('change', function () {

    let val = parseInt($(this).val());
    let $block = $('.whitelist-block');

    if (val === 1) {
      $block.slideDown();
      requiredWhitelistFields(true)
    } else {
      $block.slideUp();
      requiredWhitelistFields(false)
    }
  })
  $('.js-audit-select').on('change', function () {

    let val = parseInt($(this).val());
    let $block = $('.audit-block');

    if (val === 1) {
      $block.slideDown();
      requiredAuditFields(true)
    } else {
      $block.slideUp();
      requiredAuditFields(false)
    }
  })

  $('.js-whitepapper-select').on('change', function () {

    let val = parseInt($(this).val());
    let $block = $('.whitepapper-block');

    if (val === 1) {
      $block.slideDown();
      requiredWhitepapperFields(true)
    } else {
      $block.slideUp();
      requiredWhitepapperFields(false)
    }
  })



  // Truncate
  $('.contract-token').each(function () {
    let val = $(this).text();
    let valTruncate = truncate(val, 10, "...")
    $(this).text(valTruncate);
  })

  // Tables length < 2 = hide paginate
  // $('.dataTables_paginate').each(function () {
  //   let lengthPages = $(this).find('span > .paginate_button').length
  //   if (lengthPages <= 1) {
  //     $(this).parents('.table-wrapper__footer').hide()
  //   }
  // })



  $('.currency-dropdown select').change(function () {
    let src = $(this).find(':selected').data('icon')
    let val = $(this).find(':selected').text()


    $(this).parents('.currency-dropdown').find('img').attr('src', src)
    $(this).parents('.currency-dropdown').find('.currency-dropdown__value').text(val)
  })



  // convertation


  $('.convertation').each(function () {
    let priceInput = $(this).find('[data-price]');
    let convertedInput = $(this).find('.field:last-child input')
    let price = priceInput.data('price');

    priceInput.keyup(function () {
      let val = +$(this).val();
      convertedInput.val(val * price)
    })

    convertedInput.keyup(function () {
      let val = +$(this).val();
      priceInput.val(val / price)
    })

    $(this).find('.field:first-child .increase, .field:first-child .decrease').on('click', function () {

      let val = +priceInput.val();

      convertedInput.val(val * price)
    })

    $(this).find('.field:last-child .increase, .field:last-child .decrease').on('click', function () {

      let val = +convertedInput.val();
      priceInput.val(val / price)
    })

  })



  $('.switch-button').click(function () {
    $(this).find('input').prop('checked', !$(this).find('input').prop('checked'))
  })

  $('.bot-element .switch-button').click(function () {
    checkActiveBot($(this))
  })
  $('.bot-element .switch-button').each(function () {
    checkActiveBot($(this))
  })

  function checkActiveBot(el) {
    let disabledClass = 'is-disabled'
    let par = '.bot-element'
    let active = el.find('input').prop('checked')

    if (active) {
      el.parents(par).removeClass(disabledClass)
    } else {
      el.parents(par).addClass(disabledClass)
    }
  }




  $('.js-slider-field').each(function () {

    $(this).append('<div class="js-slider"></div>')

    let slider = $(this).find('.js-slider')
    let min = +$(this).attr('min')
    let max = +$(this).attr('max')
    let step = +$(this).attr('step')
    let val = +$(this).find('input').val()
    let that = $(this)

    slider.slider({
      range: false,
      min: min,
      max: max,
      step: step,
      value: val,
      slide: function (event, ui) {
        that.find('input').val(ui.value);
      }
    });

    that.find('input').keyup(function () {
      val = $(this).val()
      slider.slider("option", 'value', val);
    })

  })


  $('.bot-element input:radio').change(function () {
    checkDisabledCol($(this));
  })
  $('.bot-element input:radio').each(function () {
    checkDisabledColEach($(this));
  })



  function checkDisabledCol(el) {
    let col = el.parents('.bot-element-row').find('.bot-element-row__col');

    let input = col.find('.field input')
    col.addClass('is-disabled');
    input.attr('disabled', true)

    el.parents('.bot-element-row__col').removeClass('is-disabled')
    el.parents('.bot-element-row__col').find('.field input').attr('disabled', false)
  }



  function checkDisabledColEach(el) {

    if (el.is(':checked')) {
      el.parents('.bot-element-row__col').removeClass('is-disabled')
      el.parents('.bot-element-row__col').find('.field input').attr('disabled', false)
    } else {
      el.parents('.bot-element-row__col').addClass('is-disabled')
      el.parents('.bot-element-row__col').find('.field input').attr('disabled', true)
    }
  }


  $('body').delegate('.number-arrow', 'click', function () {
    $('.value-after').toggleClass('is-active')
    $('.currency-price__value').toggleClass('is-active')
  })

  hideLoader();

  // const wcOptions = {
  //   rpc: {
  //     56: 'https://bsc-dataseed.binance.org/'
  //   },
  //   network: 'binance',
  // };
  //
  // //
  // //
  // // const init = async () => {
  //
  // const providerOptions = {
  //   walletconnect: {
  //     package: window.WalletConnectProvider,
  //     options: wcOptions
  //   }
  // };
  //
  // const web3Modal = new window.Web3Modal({
  //   cacheProvider: true, // optional
  //   providerOptions // required
  // });
  //
  // console.log("Opening a dialog", web3Modal);
  // try {
  //   const  w3provider =  web3Modal.connect();
  // } catch(e) {
  //   console.log("Could not get a wallet connection", e);
  //   return;
  // }

  //
  //   const setData = async () => {
  //     let tolerance = 5 * 100;
  //     let time = 30;
  //     let first = {"logo" : "https://coinreview.s3.eu-central-1.amazonaws.com/logos/6ca0f7d9452626c05aaa5581f29766c8.png", "contract" : "0x631b92596bc7f5c4537f1a7cd4caef2db0d3000d", "symbol" : "MSN", "decimals" : 18, "amount" : 0.1};
  //     let second = {"logo":"/coins/bnb.png","symbol":"BNB","contract":"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c","decimals":18, "amount" : 0}
  //
  //     const swapData = await window.getSwapData(w3provider,first, second, tolerance, time);
  //     return swapData;
  //   }
  //
  //   let swapData = await setData();
  //
  //   await window.startSwap(swapData.tradeData.trade, swapData.tolerance, swapData.time, swapData.accountData).then(async (tx) => {
  //     // window.notifier.success(' ', {
  //     //   labels: {success: 'Transaction approved :' + tx.transactionHash},
  //     //   durations: {success: 10000}
  //     // });
  //     // window.Modal.close();
  //     swapData = await setData();
  //   }).catch(err => {
  //         console.error(err)
  //         // window.notifier.alert(' ', {labels: {alert: err.message}, durations: {alert: 10000}});
  //         // window.Modal.close();
  //       }
  //   );
  //
  // }
  // init();




// banners positions
  
$('[name="place_id"]').each(function(){
  let id = $(this).val();

  switch(id){
    case '1':
    $(this).parents('.selected-banner').addClass('js-top-banner-position')
    break;
    case '2':
    $(this).parents('.selected-banner').addClass('js-main-top-banner-position')
    break;
    case '3':
    $(this).parents('.selected-banner').addClass('js-main-bottom-banner-position')
    break;
  }
})



  // top-banner
  let $topBanner = $('.js-top-banner-position');
  let $topBannerClone = $topBanner.clone(true)
  $topBanner.remove();
  $('.main-layout').prepend($topBannerClone)

  // main-top-banner
  let $mainTopBanner = $('.js-main-top-banner-position');
  let $mainTopBannerClone = $mainTopBanner.clone(true)
  $mainTopBanner.remove();
  $('.select-banner-list').after($mainTopBannerClone)


  // main-bottom-banner
  let $mainBottomBanner = $('.js-main-bottom-banner-position');
  let $mainBottomBannerClone = $mainBottomBanner.clone(true)
  $mainBottomBanner.remove();
  $('.add-banner-section').after('<section class="banner-section"><div class="container"></div></section>')
  $('.add-banner-section+section.banner-section .container').append($mainBottomBannerClone)




  $('.main-layout').wrap("<form class='add-banner-form'></form>")

    var destination =  $('.add-banner-form').eq(0);
    var source =$('#create_banner')[0];


  console.log(destination, source);

    for (let i = 0; i < source.attributes.length; i++)
    {
        var a = source.attributes[i];
       if(a.name != 'id'){
        destination.attr(a.name, a.value);
       }
    }

  $('#create_banner').each(function() {
    $(this).replaceWith("<div>"+$(this).html()+"</div>")
  });

  
 


  //-

})

$.fn.extend({
  toggleText: function (a, b) {
    return this.text(this.text() == b ? a : b);
  }
});

