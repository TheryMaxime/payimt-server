const LydiaConfiguration = require('../configuration/LydiaConfiguration');
const fetch = require('node-fetch');
const FormData = require('form-data');

exports.paymentRequest_do = function(amount, phoneNumber, message) {
  const url = LydiaConfiguration.LydiaConfiguration.URL_LYDIA_PROD + '/api/request/do.json';

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
