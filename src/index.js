// SVG
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
import  "./js/modules/awesome-notifications";
import dropdown from "./js/modules/dropdown";
import { Fancybox } from "@fancyapps/ui";
//-import "./js/modules/google-map";
import tabs from "./js/modules/tabs";
import "./js/libs/datepicker";
import "./js/modules/customSelect";
import copy from "./js/modules/copy";


$(document).ready(function(){


  copy()

  function initSticky(){
    if (document.querySelector('.js-sticky-sidebar')) {
      window.sidebar = new StickySidebar('.js-sticky-sidebar', {
          resizeSensor: true,
          topSpacing:0,
          bottomSpacing: 0,
          innerWrapperSelector: '.sidebar__inner',
          minWidth: 1100
      });
  }
  }
  
  initSticky();

  
  new ResizeSensor($('body'), function(){ 
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
  
  $('.mobile-nav-button').click(function(){
    $('.mobile-menu').toggleClass('open')
    $('body').toggleClass('overflow')
    $(this).find('.hamburger').toggleClass('is-active')
  })



  $('.search-block__button').click(function(){
    $(this).parents('.search-block').toggleClass('is-open')
    $(this).parents('.search-block').find('input').focus();
  })

  $('.search-block__close').click(function(){
    $(this).parents('.search-block').toggleClass('is-open')
  })


  $('.js-show-more').click(function(){
    $(this).parents('.details-text').addClass('is-more')
  })


  $('.main-layout__menu-button').click(function(){
    if($( ".main-layout" ).hasClass( "is-hide-bar" )){
      initSticky();
      $('.main-layout').removeClass('is-hide-bar')

    }else{
      $('.main-layout').addClass('is-hide-bar')
      window.sidebar.destroy();
    
    }
  })


  $('.file-button input[type=file]').change(function(){
    var filename = $('input[type=file]').val().split('\\').pop();
    var ext = filename.split('.').reverse()[0];
    $(this).parents('label').find('.file-button__button').text(filename)
  })



  function readFile(el) {
  
    if (el.files && el.files[0]) {
      
      var FR= new FileReader();
      
      FR.addEventListener("load", function(e) {
        document.querySelector(".your-logo__logo img").src = e.target.result;
      }); 
      
      FR.readAsDataURL( el.files[0] );
    }
    
  }

  function fieldFile(el){
    var filename = el.parents('.field-file').find('input').val().split('\\').pop();
    var ext = filename.split('.').reverse()[0];
    el.parents('.field-file').find('span').text(filename)
  }

  $('.field-file input[type=file]').change(function(){
    
  
    fieldFile($(this))
    if($(this).parents('.upload-photo').length){
      readFile($(this)[0])
      $('.your-logo__logo-text').hide()
    }
  })


  $('.heart').click(function(){
    $(this).toggleClass('heart_is-active')
  })

  $('.favorites__button').click(function(){
    let disableText =  $(this).data('text-inactive');
    let enabledText = $(this).data('text-active');
    $(this).toggleClass('is-active');
    $(this).toggleText(enabledText, disableText);
  })

  $(".table-hover td:not(.not-clickable)").click(function(e) {
      window.location = $(this).parents('tr').data("href");
  });



  // Presale form
  function requiredPresaleFields(val){
    let link = $('.js-link-presale')
    let time = $('.js-start-presale')

    link.prop('required', val)
    time.prop('required', val)
  }
  function requiredWhitelistFields(val){
    let link = $('.js-link-whitelist')
    let time = $('.js-finish-whitelist')

    link.prop('required', val)
    time.prop('required', val)
  }
  function requiredAuditFields(val){
    let link = $('.js-link-audit')

    link.prop('required', val)
  }

  $('.js-presale-select').on('change', function(){

    let val = $(this).val();
    let $block = $('.presale-block');

    if(val === 'yes'){
      $block.slideDown();
      requiredPresaleFields(true)
    }else{
      $block.slideUp();
      requiredPresaleFields(false)
    }
  })

  $('.js-whitelist-select').on('change', function(){

    let val = $(this).val();
    let $block = $('.whitelist-block');

    if(val === 'yes'){
      $block.slideDown();
      requiredWhitelistFields(true)
    }else{
      $block.slideUp();
      requiredWhitelistFields(false)
    }
  })
  $('.js-audit-select').on('change', function(){

    let val = $(this).val();
    let $block = $('.audit-block');

    if(val === 'yes'){
      $block.slideDown();
      requiredAuditFields(true)
    }else{
      $block.slideUp();
      requiredAuditFields(false)
    }
  })

  // Truncate
  $('.contract-token').each(function(){
    let val = $(this).text();
    let valTruncate = truncate(val, 12, "...")
    $(this).text(valTruncate);
  })

  // Tables length < 2 = hide paginate
  $('.dataTables_paginate').each(function() {
    let lengthPages = $(this).find('span > .paginate_button').length
    if(lengthPages <= 1){
      $(this).parents('.table-wrapper__footer').hide()
    }
  })


  hideLoader();
})

$.fn.extend({
  toggleText: function(a, b){
      return this.text(this.text() == b ? a : b);
  }
});

function truncate( str, max, sep ) {

  // Default to 10 characters
  max = max || 10;

  var len = str.length;
  if(len > max){

      // Default to elipsis
      sep = sep || "...";

      var seplen = sep.length;

      // If seperator is larger than character limit,
      // well then we don't want to just show the seperator,
      // so just show right hand side of the string.
      if(seplen > max) {
          return str.substr(len - max);
      }

      // Half the difference between max and string length.
      // Multiply negative because small minus big.
      // Must account for length of separator too.
      var n = -0.5 * (max - len - seplen);

      // This gives us the centerline.
      var center = len/2;

      var front = str.substr(0, center - n);
      var back = str.substr(len - center + n); // without second arg, will automatically go to end of line.

      return front + sep + back;

  }

  return str;
}
