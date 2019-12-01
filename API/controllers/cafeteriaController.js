/*
const mongoose = require('mongoose'),
  Cafeteria = mongoose.model('Cafeteria');

exports.get_all_items = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  Cafeteria.find({}, function(err, items) {
    if (err)
      res.send(err);
    console.log(items);
    res.json(items);
  });
};

exports.create_item = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let new_item = new Cafeteria(req.body);
  new_item.save(function(err, item) {
    if (err)
      res.send(err);
    res.json(item);
  });
};
*/

const lydia = require('./lydiaController');

exports.request_payment = function(req, res) {
  res.setHeader('Content-Type', 'application/json');

  let amount = 0;
  let message = "NE PAS PRENDRE EN COMPTE \n";

  req.body.cart.forEach(item => {
    amount += item.price;
    message += item.title + " - " + item.price + "\u20AC\n";
  });

  message += "Cafeteria de l\'IMT - PAY\'IMT";

  lydia.paymentRequest_do(amount, req.body.phoneNumber, message)
    .then((response) => {
      res.json({ mobile_url : response.mobile_url })
    })
    .catch((error) => { res.send(error) })

};
