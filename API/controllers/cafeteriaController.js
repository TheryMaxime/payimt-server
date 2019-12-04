const lydia = require('./lydiaController');
const hiboutik = require('./hiboutikController');

exports.get_all_items = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  hiboutik.getAllItemsFromHiboutik()
    .then((_response) => {
      let response = _response.map(({
        product_id,
        product_model,
        product_price
      }) => ({
        product_id,
        product_model,
        product_price
      }));
      res.json({data : response});
    })
    .catch((error) => {
      res.send(error);
    })
}

const checkPaymentStatus = function(request_uuid){
  return lydia.paymentCheckState(request_uuid)
    .then((response) => { return response })
    .catch((error) => console.error(error))
}

exports.request_payment = function(req, res) {
  res.setHeader('Content-Type', 'application/json');

  let amount = 0;
  let message = "NE PAS PRENDRE EN COMPTE \n";
  let phoneNumber = req.body.phoneNumber;
  let cart = req.body.cart;

  cart.forEach(item => {
    amount += parseFloat(item.product_price);
    message += item.product_model + " - " + item.product_price + "\u20AC\n";
  });

  message += "Cafeteria de l\'IMT - PAY\'IMT";

  /*

  */
  lydia.paymentRequest_do(amount, phoneNumber, message)
    .then((request_response) => {
      res.json({ mobile_url : request_response.mobile_url })
      let index = 0;
      let checkPaymentStatusInterval = setInterval(() => {
        if (index < 5) {
          checkPaymentStatus(request_response.request_uuid)
            .then((check_response) => {
              switch(check_response.state) {
                case '1':
                  //request accepted
                  hiboutik.createSale(phoneNumber, cart)
                    .catch((error) => { console.error(error) })
                  clearInterval(checkPaymentStatusInterval);
                  break;
                case '0':
                  //waiting
                  index++;
                  break;
                case '5':
                  //refused by payer
                  clearInterval(checkPaymentStatusInterval);
                  break;
                case '6':
                  //refused by owner
                  clearInterval(checkPaymentStatusInterval);
                  break;
                default:
                  //invalid request
                  index++;
                  break;
              }
            })
            .catch((error) => { console.error(error) });
        }
        else {
          //maximum timeout reached
          lydia.paymentRequest_cancel(request_response.request_id)
            .catch((error) => { console.error(error) });
          clearInterval(checkPaymentStatusInterval);
        }
      }, 5000)
    })
    .catch((error) => { res.send(error) })

};
