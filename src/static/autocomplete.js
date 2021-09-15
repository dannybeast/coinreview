// 
let $autocompleteInput = $(".js-search-autocomplete");
let delayTime = 500
let url = 'https://jsonplaceholder.typicode.com/todos'
let autocompleteLength = 2

// Added dropdown
$autocompleteInput.parent().append(`<div class="search-dropdown"></div>`)

// Event keyup
$autocompleteInput.on('keyup', delay(function (e) {
  let that = $(this)
  let val = that.val();
  let dropdown = that.parent().find('.search-dropdown')


  if (val.length >= autocompleteLength) {
    $.ajax({
      type: 'POST',
      url,
      data: {
        term: val
      },
      beforeSend: function (data) {
        dropdown.html('')
        dropdown.append(`<div class="search-item-loader"></div>`)
      },
      success: function (data) {
        
        dropdown.html('')
        
        let testData = [{
          id: 43534,
          currency: 'Bitcoin',
          link: 'coin.html',
          code: 'BTC',
          price: 34.394,
          price_change: 0.23
        },
        {
          id: 43535,
          currency: 'Etherium',
          link: 'coin.html',
          code: 'ETH',
          price: 4.394,
          price_change: -1.23
        },
        {
          id: 43536,
          currency: 'Dai',
          link: 'coin.html',
          code: 'DAI',
          price: 34.394,
          price_change: 0.23
        },
        ];

        testData.forEach(element => {
          // Change status colors
          let priceChangeClass = "color-danger"
          if (element.price_change && element.price_change > 0) {
            priceChangeClass = "color-success"
            element.price_change = '+' + element.price_change
          }
          //

          dropdown.append(`
  
              <a href="${element.link}" class="search-item">
  
                <div class="search-item__col">
                  <p class="search-item__id">#${element.id}</p>
                  <p class="search-item__currency">${element.currency} <span>${element.code}</span></p>
                </div>
  
                <div class="search-item__col">
                  <p class="search-item__price">$${element.price}</p>
                  <p class="search-item__price_change ${priceChangeClass}">${element.price_change}%</p>
                </div>
  
              </a>
              
              `)
        });

      },
      error: function (xhr) {
        window.notifier.alert('Error', {
          labels: {
            alert: xhr.status
          },
          durations: {
            alert: 3000
          }
        })
      },
      complete: function (data) {
        $('.search-item-loader').remove()
      }
    });
  } else {
    dropdown.html('')
  }

}, delayTime));


// Delay keyup
function delay(callback, ms) {
  var timer = 0;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}