function increaseValue(el) {
    var value = parseInt(el.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    el.value = value;
  }
  
  function decreaseValue(el) {
    var value = parseInt(el.value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    el.value = value;
  }

  document.querySelectorAll('.amount-module ').forEach((el)=>{

    el.querySelector('.decrease').addEventListener('click',function(){
        decreaseValue(el.querySelector('input'))
    })


    el.querySelector('.increase').addEventListener('click', function(){
        increaseValue(el.querySelector('input'))
    })

  })