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
import './js/libs/resizeSensor';
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

$(document).ready(function(){

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

  $('.js-datepicker').datepicker();

  sliders();
  dropdown();
  tabs();

  if (document.querySelector(".js-sticky-sidebar")) {
    window.sidebar.updateSticky();
  }

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
    readFile($(this)[0])
    $('.your-logo__logo-text').hide()
  })


  $('.heart').click(function(){
    $(this).toggleClass('heart_is-active')
  })


  // document
  //   .querySelectorAll('.faq-row')
  //   .forEach((el, ind) => {
    
  //     el.querySelectorAll('[data-accordion="trigger"]').forEach((element,index)=>{
      
  //       const newAccordion = new Accordion(element);
    
  //       if (index === 0) {
  //       newAccordion._toggleContent(element);
  //       }
  //     })
    
    
  //   });


  hideLoader();
})