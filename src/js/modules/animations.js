import {
    gsap
} from 'gsap'
import {
    ScrollTrigger
} from "gsap/dist/ScrollTrigger";
import ScrollMagic from "../libs/ScrollMagic";

function animate(controller, scrollmagic, triggerClass, tl) {

    const trigger = document.querySelector(triggerClass)

    if (!trigger) {return}
    new scrollmagic.Scene({
            triggerElement: triggerClass,
            offset: -300
        })
        .setTween(tl)
        .addTo(controller)
}


export default function () {

    let animationSpeed = 0.6

    gsap.registerPlugin(ScrollTrigger);
    gsap.config({
        nullTargetWarn: false
    })
    const controller = new ScrollMagic.Controller()


    $('section').each(function () {

    const trigger = $(this)

    if (!trigger) {return}
        new ScrollMagic.Scene({
            triggerElement: trigger[0],
            offset: -300
        })
        .setTween(
            gsap.timeline().fromTo(
                trigger,
                        animationSpeed, {
                            autoAlpha: 0,
                            y: 15
                        }, {
                            autoAlpha: 1,
                            y: 0
                        },
                        //'-=0.1'
                    )
        )
        .addTo(controller) 
    })

    $('.faq-row').each(function () {

      const trigger = $(this)
      
      if (!trigger) {return}
          new ScrollMagic.Scene({
              triggerElement: trigger[0],
              offset: -200
          })
          .setTween(
              gsap.timeline().fromTo(
                  trigger.find('.faq-row__content')[0],
                          animationSpeed, {
                              autoAlpha: 0,
                              y: 50
                          }, {
                              autoAlpha: 1,
                              y: 0
                          }
                      ).fromTo(
                        trigger.find('.faq-row__media')[0],
                                animationSpeed, {
                                    autoAlpha: 0,
                                    x: 50
                                }, {
                                    autoAlpha: 1,
                                   x: 0
                                },
                            )
          )
          .addTo(controller) 
      })


    if($('.intro-composition').length){
        let object = {
          el: '.intro-composition img',
          duration: 3
        }
        
        gsap.fromTo(object.el, object.duration, {
        opacity: 0,
          y:  Math.PI * 2,
          x: '-=15',
          scale: 0.8,
        }, {
          opacity: 1,
          y: '+=10',
          x: 0,
          scale: 1,
          transformOrigin: 'center',
           modifiers: {
            x: function(x) {
              return Math.sin(parseFloat(x)) * 10 + "px";
            },
            y: function(y) {
              return Math.sin(parseFloat(y)) * 15 + "px";
            }
          },
          
          stagger: {
            each: object.duration / document.querySelectorAll(object.el).length*0.5, 
            repeat: -1, 
            yoyo: true
          }
        },
        
        ); }




     

}