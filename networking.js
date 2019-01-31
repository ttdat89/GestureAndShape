const TIMEOUT = 30000

function timeout(request, duration, api) {
  return new Promise((resolve) => {
    let timeout = setTimeout(() => {
      resolve(null)
      alert('Request timeout: ' + api)
    }, duration)

    request.then(res => {
      clearTimeout(timeout)
      timeout = null
      resolve(res)
    }, err => {
      clearTimeout(timeout)
      timeout = null
      resolve(null)
    })
  })
}

export function getWithTimeout(api, headers) {
  return timeout(get(api, headers), TIMEOUT, api)
}

export function get(api, headers) {

  return fetch(api, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  }).then(response => {
    // console.log(response)
    return response.json().then(data => {
      // console.log(data)
      return {body: data, header: response}
    })
  }).catch(err => {
    console.log('There is an error occurred while requesting api', err, api)
    return null
  })
}