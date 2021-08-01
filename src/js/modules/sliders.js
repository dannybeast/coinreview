import Swiper from "swiper/swiper-bundle";
export default function() {

  var news = new Swiper(".js-swiper-news", {
    noSwiping: true,
    freeMode:true,
    spaceBetween: 20,  
    watchSlidesVisibility: true,
    // navigation: {
    //   nextEl: document.querySelector('.news .swiper-arrow-next'),
    //   prevEl: document.querySelector('.news .swiper-arrow-prev'),
    //  },
    breakpoints: {

      0: {
        slidesPerView: 1.15,
        noSwiping: false,
      },
      767: {
        slidesPerView: 2.5,
        noSwiping: false,
      },
      1100: {
        slidesPerView: 4,
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
        slidesPerView: 1.15,
        noSwiping: false,
      },
      767: {
        slidesPerView: 2.5,
        noSwiping: false,
      },
      1100: {
        slidesPerView: 4,
        freeMode:false,
        noSwiping: true
      },

    },
  });
  
  
}




