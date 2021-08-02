// SVG
var __svg__ = {
  path: "./assets/icons/**/*.svg",
  name: "assets/icons/sprite.svg",
};
__svg__ = {
  filename: "/assets/icons/sprite.svg",
};
require("webpack-svgstore-plugin/src/helpers/svgxhr")(__svg__);

// SCSS
import "./assets/scss/main.scss";

// Modules
import hideLoader from "./js/modules/loader";
//-import Accordion from "./js/modules/accordion";
//-import inputmasks from "./js/modules/inputmasks";
import sliders from "./js/modules/sliders";
import "./js/modules/sticky";
import "./js/modules/inputNumber";
import  "./js/modules/awesome-notifications";
import dropdown from "./js/modules/dropdown";
import { Fancybox } from "@fancyapps/ui";
//-import "./js/modules/google-map";
import tabs from "./js/modules/tabs";


$(document).ready(function(){
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



  $('.js-show-more').click(function(){
    $(this).parents('.details-text').addClass('is-more')
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