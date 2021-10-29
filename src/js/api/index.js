export function baseRequest(url, type = 'GET', data, query, contentType) {
  if(query){
    url = url + '?' + data
    data = null
  }
  if(contentType === 'application/json'){
    data = JSON2.stringify(data)
  }
  return $.ajax({type, url, data, contentType, processData: false})
}