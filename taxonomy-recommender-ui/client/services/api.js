import _ from 'lodash';
export function callPost(endpoint, body = {}) {
  const requestOptions = {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return fetch(endpoint, requestOptions)
  .then(
      response => _.get(response, 'ok') ? response.json() : console.log('response',response)
    )
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened' })
    );
}

export function callGet(endpoint, body = {}) {
  const requestOptions = {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return fetch(endpoint, requestOptions)
  .then(
      response => _.get(response, 'ok') ? response.json() : console.log('response',response)
    )
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened' })
    );
}
