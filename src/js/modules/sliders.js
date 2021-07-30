import Swiper from "swiper/swiper-bundle";
export default function() {

  var news = new Swiper(".js-swiper-news", {
    noSwiping: true,
    freeMode:true,
    spaceBetween: 25,  watchSlidesVisibility: true,
    navigation: {
      nextEl: document.querySelector('.news .swiper-arrow-next'),
      prevEl: document.querySelector('.news .swiper-arrow-prev'),
     },
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
        slidesPerView: 3,
        freeMode:false,
        noSwiping: true
      },

    },
  });
  
  var icons = new Swiper(".js-swiper-icons", {
    noSwiping: true,
    freeMode:true,
    spaceBetween: 25,  
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
        slidesPerView: 3,
        freeMode:false,
        noSwiping: true
      },
    },
  });

  var icons4 = new Swiper(".js-swiper-icons-4", {
    noSwiping: true,
    freeMode:true,
    spaceBetween: 30,  
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

  var percents = new Swiper(".js-swiper-percents", {
    noSwiping: true,
    freeMode:true,
    spaceBetween: 35,  
    watchSlidesVisibility: true, 
    loop: true,
    speed: 4000,
    allowTouchMove: false, // можно ещё отключить свайп
    autoplay: {
      delay: 0,
      disableOnInteraction: false // или сделать так, чтобы восстанавливался autoplay после взаимодействия
    },
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
        slidesPerView: 5,
        freeMode:false,
        noSwiping: true
      },
    },
  });

  var smi = new Swiper(".js-swiper-smi", {
    noSwiping: true,
    freeMode:true,
    spaceBetween: 50,  
    watchSlidesVisibility: true,
    navigation: {
      nextEl: document.querySelector('.smi .swiper-arrow-next'),
      prevEl: document.querySelector('.smi .swiper-arrow-prev'),
     },
     pagination:{
       el: document.querySelector('.smi .slider-dots'),
       type: 'bullets',
     },
    breakpoints: {

      0: {
        slidesPerView: 1,
        noSwiping: false,
      },
      767: {
        slidesPerView: 2,
        noSwiping: false,
        centeredSlides: false,
      },

      1100: {
        slidesPerView: 3,
        freeMode:false,
        noSwiping: false,
      },
      1400: {
        slidesPerView: 4,
        freeMode:false,
        noSwiping: true
      },
    },
  });
 
  var scheme = new Swiper(".js-swiper-scheme", {
    noSwiping: true,
    freeMode:true,
    spaceBetween: 50,  
    watchSlidesVisibility: true,

     pagination:{
       el: document.querySelector('.scheme .slider-dots'),
       type: 'bullets',
     },
    breakpoints: {
      0: {
        slidesPerView: 1,
        noSwiping: false,    
        centeredSlides: true,
      }, 
      330: {
        slidesPerView: 1.5,  
        centeredSlides: false,
        noSwiping: false,
      },
      767: {
        slidesPerView: 2.8,
        noSwiping: false,
        centeredSlides: false,
      },

      1100: {
        slidesPerView: 5,
        spaceBetween: 50,
        freeMode:false,
        noSwiping: true
      },
    },
  });


  var licenses = new Swiper(".js-swiper-licenses", {
    navigation: {
      nextEl: document.querySelector('.licenses-slider .swiper-arrow-next'),
      prevEl: document.querySelector('.licenses-slider .swiper-arrow-prev'),
     },
    spaceBetween: 10,
    slidesPerView: 1,
    watchSlidesVisibility: true,
  });


  var large = new Swiper(".js-swiper-gallery-large", {
    loop: true,
    loopedSlides: 3,
    freeMode:true,
    spaceBetween: 10,
    slidesPerView: 1,
    effect: 'fade',
    watchSlidesVisibility: true,
  });

  var small = new Swiper(".js-swiper-gallery-small", {
    touchRatio: 0.2,
    slideToClickedSlide: true,
    loop: true,
    loopedSlides: 3,
    spaceBetween: 30,  
    slidesPerView: 3,
    watchSlidesVisibility: true,
  });

  if(document.querySelector('.js-swiper-gallery-large')){
    large.controller.control = small;
    small.controller.control = large;
  }

  
  
}




