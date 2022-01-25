import {baseRequest} from '../api/index'
import {truncate} from "../modules/helpers";

let url = "https://app.tryroll.com/"
let tokens
let $searchInput = $('.js-search-token')


$searchInput.keyup(function(){
  let val = $(this).val();

  clearTokens();
  let filteredArr = tokens.filter(({symbol, address}) => {
    
    return symbol.toLowerCase().includes(val.toLowerCase()) || address.includes(val)
  
  });
  drawTokens(filteredArr)

})



async function getTokens(){
  return await baseRequest(`${url}tokens.json`)
}

function clearTokens(){
  $(".tokens-list__wrapper").html('')
}

function drawTokens(arr){
  if(arr.length > 0){
    let els = arr.map(el=>{
      return `
      <div class="token-item"> 
        <div class="token-item__icon"><img src="${el.logoURI}" alt="">
        </div>
        <div class="token-item__content"> 
          <p class="token-item__title">${el.symbol} 
          </p>
          <p class="token-item__description">${el.name} 
          </p>
        </div>
        <div class="token-item__address" title="${el.address}">${truncate(el.address, 12, "...")}</div>
      </div>
      `
    })
    $(".tokens-list__wrapper").append(els)
  }
}

async function setTokens(){
  let res = await getTokens()
  tokens = res.tokens
  drawTokens(res.tokens)
}

setTokens()


window.truncate = truncate