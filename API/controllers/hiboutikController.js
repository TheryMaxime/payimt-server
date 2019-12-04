const fetch = require('node-fetch');
const FormData = require('form-data')
const { URLSearchParams } = require('url');

const HiboutikConfiguration = require('../configuration/HiboutikConfiguration');
const URL_HIBOUTIK = HiboutikConfiguration.HiboutikConfiguration.URL_HIBOUTIK;
const BASIC_AUTH_AUTHORIZATION = HiboutikConfiguration.HiboutikConfiguration.BASIC_AUTH_AUTHORIZATION;

const json_header = {
  Accept: 'application/json',
  'Content-Type':'application/json',
  'Authorization':'Basic ' + BASIC_AUTH_AUTHORIZATION
}

const urlencoded_header = {
  Accept: 'application/json',
  'Content-Type':'application/x-www-form-urlencoded',
  'Authorization':'Basic ' + BASIC_AUTH_AUTHORIZATION
}

const search_customer = function(phoneNumber) {
  const url = URL_HIBOUTIK + '/customers/search/?phone=%2B33633739225'
  return fetch(url, {
    method: 'GET',
    headers: json_header
  })
  .then((response) => {
    return response.json()
  })
  .catch((error) => console.error(error));
}

const create_empty_sale = function(customer_id) {
  const url = URL_HIBOUTIK + '/sales/'
  let data = new URLSearchParams()
  data.append('store_id', 1);
  data.append('customer_id', customer_id);
  data.append('currency_code', 'EUR');

  return fetch(url, {
    method:'POST',
    headers: urlencoded_header,
    body: data
  })
  .then((response) => { return response.json() })
  .catch((error) => console.error(error))
}

const add_product_to_sale = function(product, sale_id) {
  const url = URL_HIBOUTIK + '/sales/add_product/';
  let data = new URLSearchParams()
  data.append('sale_id', sale_id);
  data.append('product_id', product.product_id);
  return fetch(url, {
    method:'POST',
    headers: urlencoded_header,
    body: data
  })
  .then((response) => { return response.json() })
  .catch((error) => console.error(error))
}

exports.getAllItemsFromHiboutik = function(){
  const url = URL_HIBOUTIK + '/products/';
  return fetch(url, {
    method:'GET',
    headers: json_header
  })
  .then((response) => { return response.json()}) // a récuperer pour mettre comme data de la flatlist. Modifier le shop detail pour afficher product_model, product_price
  .catch((error) => console.error(error));
}

exports.createSale = function(phoneNumber, cart){ // customer ID recupéré par createCustomer ou alors par le getCustomer
  return search_customer(phoneNumber)
  .then((customer) => {
    create_empty_sale(customer[0].customers_id)
      .then((sale) => {
        cart.forEach(item => {
          add_product_to_sale(item, sale.sale_id)
            .catch((error) => console.error(error));
          return sale;
        })
      })
      .catch((error) => { console.log(error) })
  })
  .catch((error) => { console.log(error) })

}
