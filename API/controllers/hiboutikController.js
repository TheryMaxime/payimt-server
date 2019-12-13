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
  //Sign '+' as to be replace by '%2B' in a HTML request
  phoneNumber.replace('+', "%2B");
  const url = URL_HIBOUTIK + '/customers/search/?phone=' + phoneNumber;
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
  .then((response) => { return response.json()})
  .catch((error) => console.error(error));
}

exports.createSale = function(phoneNumber, cart){
  //We have to search customer_id from customer's phoneNumber
  return search_customer(phoneNumber)
  .then((customer) => {
    //Then we create an empty sale
    //NB: As we create customer acount from phoneNumber, there is only one
    //    acount for one phone number
    create_empty_sale(customer[0].customers_id)
    .then((sale) => {
      //Then we add every cart's item to the sale
      cart.forEach(item => {
        add_product_to_sale(item, sale.sale_id)
        .catch((error) => console.error(error));
        //We return the sale object in order to do action on it afterwise
        return sale;
      })
    })
    .catch((error) => { console.error(error) })
  })
  .catch((error) => { console.error(error) })

}

exports.customerExists = function(phoneNumber) {
  //We have to search customer_id from customer's phoneNumber
  return search_customer(phoneNumber)
  .then((customer) => {
    if (customer.length === 1)
    return {
      customerExists: true,
      customer: customer[0]
    }
    else {
      return { customerExists: false }
    }
  })
  .catch((error) => { console.error(error) })
}

exports.register = function(phoneNumber, firstname, lastname) {
  const url = URL_HIBOUTIK + '/customers/'

  let data = new URLSearchParams()
  data.append('customers_phone_number', phoneNumber);
  data.append('customers_first_name', firstname);
  data.append('customers_last_name', lastname);

  return fetch(url, {
    method:'POST',
    headers: urlencoded_header,
    body: data
  })
  .then((response) => { return response.json() })
  .catch((error) => console.error(error))
}

exports.updateCustomer = function(customers_id, customers_attribute, new_value) {
  const url = URL_HIBOUTIK + '/customer/' + customers_id + '/'

  let data = new URLSearchParams()
  data.append('customers_attribute', customers_attribute);
  data.append('new_value', new_value);

  return fetch(url, {
    method:'PUT',
    headers: urlencoded_header,
    body: data
  })
  .then((response) => { return response.json() })
  .catch((error) => console.error(error))
}
