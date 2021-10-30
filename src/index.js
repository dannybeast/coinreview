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
import "./js/libs/jquery.scrollbar";
import "./js/modules/customSelect";
import {truncate} from "./js/modules/helpers";
import copy from "./js/modules/copy";
import websockets from "./js/modules/websockets";
import "jquery-ui/ui/widgets/slider";
import "jquery-ui-touch-punch";
import "./js/modules/swap";
//import "./js/modules/timer";
import "./js/modules/swap-select";


websockets();

$(document).ready(function(){

 $('.scrollbar-inner').scrollbar();


  Fancybox.bind(".js-modal", {
    dragToClose: false,
    groupAttr: false,
  });
  window.Modal = Fancybox


  // mob menu
  function positionMobileMenu(){
  let mobMenu = $('.mobile-menu');
  let topBanner = $('.main-layout__top-banner');
  let header = $('.header');
  let posTop = header.height();
  if(topBanner.length){
    posTop = posTop + topBanner.height();
  }
    mobMenu.css('top', posTop)
  }
  positionMobileMenu();
  $(window).resize(function(){
    positionMobileMenu();
  })
  //-


   // timer
   const second = 1000,
   minute = second * 60,
   hour = minute * 60,
   day = hour * 24;

  $('.timer').each(function (i) {
    let days = $(this).data('days')
    let hours = $(this).data('hours')
    let minutes = $(this).data('minutes')
    let seconds = $(this).data('seconds')

    $(this).append(`
      <div class="timer__col">
        <div class="timer__count timer__count_days"></div>
        <p class="timer__desc">${days}</p>
      </div>
      <div class="timer__col">
        <div class="timer__count timer__count_hours"></div>
        <p class="timer__desc">${hours}</p>
      </div>
      <div class="timer__col">
        <div class="timer__count timer__count_minutes"></div>
        <p class="timer__desc">${minutes}</p>
      </div>
      <div class="timer__col">
        <div class="timer__count timer__count_seconds"></div>
        <p class="timer__desc">${seconds}</p>

      </div>

    `)

    setTimeout(()=>{
      $(this).addClass('is-loaded')
    },1000)
  });

 let timer = setInterval(function (e) {
 
   $('.timer').each(function (i) {
     var timerValue = $(this).attr('data-timer-end');
     let over = $(this).data('over')

     let countDown = new Date(timerValue).getTime();
     let now = new Date().getTime(),
       distance = countDown - now;

    if(distance > 0){
      var days = Array.from(String(Math.floor(distance / (day))), Number);
      var hours = Array.from(String(Math.floor((distance % (day)) / (hour))), Number);
      var minutes = Array.from(String(Math.floor((distance % (hour)) / (minute))), Number);
      var seconds = Array.from(String(Math.floor((distance % (minute)) / second)), Number);

      if(days.length < 2){
        days.splice(0, 0, 0);
      }
      if(minutes.length < 2){
        minutes.splice(0, 0, 0);
      }
      if(hours.length < 2){
        hours.splice(0, 0, 0);
      }
      if(seconds.length < 2){
        seconds.splice(0, 0, 0);
      }

      $(this).find('.timer__count_days').html('')
      $(this).find('.timer__count_hours').html('')
      $(this).find('.timer__count_minutes').html('')
      $(this).find('.timer__count_seconds').html('')


      days.forEach((el)=>{
        $(this).find('.timer__count_days').append(`<span>${el}</span>`);
      })
      hours.forEach((el)=>{
        $(this).find('.timer__count_hours').append(`<span>${el}</span>`);
      })
      minutes.forEach((el)=>{
        $(this).find('.timer__count_minutes').append(`<span>${el}</span>`);
      })
      seconds.forEach((el)=>{
        $(this).find('.timer__count_seconds').append(`<span>${el}</span>`);
      })
    }else{
      $(this).html(`<p class="timer__over">${over}</p>`)
    }


   });
 }, second)


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

    let val = parseInt($(this).val());
    let $block = $('.presale-block');

    if(val === 1){
      $block.slideDown();
      requiredPresaleFields(true)
    }else{
      $block.slideUp();
      requiredPresaleFields(false)
    }
  })

  $('.js-whitelist-select').on('change', function(){

    let val = parseInt($(this).val());
    let $block = $('.whitelist-block');

    if(val === 1){
      $block.slideDown();
      requiredWhitelistFields(true)
    }else{
      $block.slideUp();
      requiredWhitelistFields(false)
    }
  })
  $('.js-audit-select').on('change', function(){

    let val = parseInt($(this).val());
    let $block = $('.audit-block');

    if(val === 1){
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



  $('.currency-dropdown select').change(function(){
    let src = $(this).find(':selected').data('icon')
    let val = $(this).find(':selected').text()
  
    $(this).parent().find('img').attr('src', src)
    $(this).parent().find('.currency-dropdown__value').text(val)
  })



  // convertation
  
  
  $('.convertation').each(function(){
    let priceInput = $(this).find('[data-price]');
    let convertedInput = $(this).find('.field:last-child input')
    let price = priceInput.data('price');

    priceInput.keyup(function(){
      let val = +$(this).val();
      convertedInput.val(val*price)
    })

    convertedInput.keyup(function(){
      let val = +$(this).val();
      priceInput.val(val/price)
    })

    $(this).find('.field:first-child .increase, .field:first-child .decrease').on('click',function(){
     
      let val = +priceInput.val();
  
      convertedInput.val(val*price)
    })

    $(this).find('.field:last-child .increase, .field:last-child .decrease').on('click',function(){
   
      let val = +convertedInput.val();
      priceInput.val(val/price)
    })

  })



  $('.switch-button').click(function(){
    $(this).find('input').prop('checked', !$(this).find('input').prop('checked'))
  })

  $('.bot-element .switch-button').click(function(){
    checkActiveBot($(this))
  })
  $('.bot-element .switch-button').each(function(){
    checkActiveBot($(this))
  })

  function checkActiveBot(el){
    let disabledClass = 'is-disabled'
    let par = '.bot-element'
    let active = el.find('input').prop('checked')

    if(active){
      el.parents(par).removeClass(disabledClass)
    }else{
      el.parents(par).addClass(disabledClass)
    }
  }




  $('.js-slider-field').each(function(){

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
      step:step,
      value: val,
      slide: function(event, ui) {
        that.find('input').val(ui.value);
      }
    });

    that.find('input').keyup(function(){
      val = $(this).val()
      slider.slider( "option",'value',val);
    })

  })


  $('.bot-element input:radio').change( function(){
    checkDisabledCol($(this));
  })  
  $('.bot-element input:radio').each( function(){
    checkDisabledColEach($(this));
  })



  function checkDisabledCol(el){
    let col = el.parents('.bot-element-row').find('.bot-element-row__col');

    let input = col.find('.field input')
    col.addClass('is-disabled');
    input.attr('disabled', true)

    el.parents('.bot-element-row__col').removeClass('is-disabled')
    el.parents('.bot-element-row__col').find('.field input').attr('disabled', false)
  }


  
  function checkDisabledColEach(el){

    if(el.is(':checked')){
      el.parents('.bot-element-row__col').removeClass('is-disabled')
      el.parents('.bot-element-row__col').find('.field input').attr('disabled', false)
    }else{
      el.parents('.bot-element-row__col').addClass('is-disabled')
      el.parents('.bot-element-row__col').find('.field input').attr('disabled', true)
    }
  }


    $('body').delegate('.number-arrow','click', function(){
      $('.value-after').toggleClass('is-active')
      $('.currency-price__value').toggleClass('is-active')
    })

  hideLoader();
})

$.fn.extend({
  toggleText: function(a, b){
      return this.text(this.text() == b ? a : b);
  }
});

