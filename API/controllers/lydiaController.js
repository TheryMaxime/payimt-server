const LydiaConfiguration = require('../configuration/LydiaConfiguration');
const fetch = require('node-fetch');
const FormData = require('form-data');

const URL_LYDIA_PROD = LydiaConfiguration.LydiaConfiguration.URL_LYDIA_PROD;

exports.paymentRequest_do = function(amount, phoneNumber, message) {
  const url = URL_LYDIA_PROD + '/api/request/do.json';

  let formData = new FormData()
  formData.append('amount', amount)
  formData.append('payment_method', 'lydia')
  formData.append('vendor_token', LydiaConfiguration.LydiaConfiguration.API_PUBLIC_TOKEN_PROD)
  formData.append('message', message)
  //formData.append('user_token', NUM_LYDIA_TEST)
  formData.append('recipient', phoneNumber)
  formData.append('currency', 'EUR')
  formData.append('type', 'phone')

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: formData
  }).then((response) => { return response.json() })
    .catch((error) => console.error(error))

}

exports.paymentRequest_cancel = function(request_id) {
  const url = URL_LYDIA_PROD + '/api/request/cancel.json';

  let formData = new FormData()
  formData.append('request_id', request_id);

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: formData
  }).then((response) => { return response.json() })
    .catch((error) => console.error(error))
}

exports.paymentCheckState = function(request_uuid) {
  const url = URL_LYDIA_PROD + '/api/request/state.json';

  let formData = new FormData()
  formData.append('request_uuid', request_uuid);

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: formData
  }).then((response) => { return response.json() })
    .catch((error) => console.error(error))
}
