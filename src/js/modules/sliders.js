import Swiper from "swiper/swiper-bundle";
export default function() {

  var news = new Swiper(".js-swiper-news", {
    noSwiping: true,
    freeMode:true,
    spaceBetween: 20,  
    watchSlidesVisibility: true,
    slidesPerView: "auto",
    breakpoints: {
      0: {
        //slidesPerView: 1.3,
        noSwiping: false,
      },
      321: {
        //slidesPerView: 1.5,
        noSwiping: false,
      },
      767: {
       // slidesPerView: 3.2,
        noSwiping: false,
      },
      992: {
      //  slidesPerView: 4,
        freeMode:false,
        noSwiping: true
      },

      1281: {
       // slidesPerView: 3,
        freeMode:false,
        noSwiping: true
      },

      1440: {
       // slidesPerView: 4,
        freeMode:false,
        noSwiping: true
      },
    },
  });
  
  var counters = new Swiper(".js-swiper-counters", {
    noSwiping: true,
    freeMode:true,
    spaceBetween: 35,  
    watchSlidesVisibility: true,
 
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        noSwiping: false,
        spaceBetween: 10,  
      },
      767: {
        slidesPerView: 2.5,
        spaceBetween: 35,
        noSwiping: false,
      },
      1100: {
        slidesPerView: 4,
        freeMode:false,   
        spaceBetween: 35,
        noSwiping: true
      },

    },
  });
  
  
}




