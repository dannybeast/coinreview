

function increaseValue(el) {
    var value = +el.value;
    let step = +el.dataset.step;

    value = isNaN(value) ? 0 : value;

    if(isNaN(step)){
      value++;
    }else{
      let sum = value + step;
      value = +sum.toFixed(2);
    }

    el.value = value;

  }
  
  function decreaseValue(el) {
    var value = +el.value;
    let step = +el.dataset.step;
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    
    if(isNaN(step)){
      value--;
    }else{
      let sum = value - step;

      value = +sum.toFixed(2);
    }
    el.value = value;
  }

  document.querySelectorAll('.convertation .amount-module ').forEach((el)=>{
    if(!el.querySelector('.decrease')){ return }
    el.querySelector('.decrease').addEventListener('click',function(){
        decreaseValue(el.querySelector('input'))
    })


    el.querySelector('.increase').addEventListener('click', function(){
        increaseValue(el.querySelector('input'))
    })

  })