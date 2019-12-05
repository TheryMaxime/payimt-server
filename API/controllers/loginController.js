const hiboutik = require('./hiboutikController');

exports.login = function(req, res) {
  res.setHeader('Content-Type', 'application/json');

  let phoneNumber = req.body.phoneNumber,
      firstname = req.body.firstname,
      lastname = req.body.lastname;

  let isModified = false;

  hiboutik.customerExists(phoneNumber)
    .then((customer_exists) => {
      if (customer_exists.customerExists) {
        if (firstname !== customer_exists.customer.first_name) {
          hiboutik.updateCustomer(customer_exists.customer.customers_id, "first_name", firstname)
          isModified = true
        }
        if (lastname !== customer_exists.customer.last_name) {
          hiboutik.updateCustomer(customer_exists.customer.customers_id, "last_name", lastname)
          isModified = true
        }
        res.json({
          customer_existed : true,
          customer_registered: false,
          customer_modified: isModified
        })
      }
      else {
        hiboutik.register(phoneNumber, firstname, lastname)
          .then((customer_register) => {
            res.json({
              customer_existed : false,
              customer_registered: true,
              customer_modified: false
            })
          })
          .catch((error) => {
            console.error(error)
            res.json({
              customer_existed : false,
              customer_registered: false,
              customer_modified: false
            })
          })
      }
    })
    .catch((error) => {
      console.error(error)
      res.json({
        customer_existed : false,
        customer_registered: false,
        customer_modified: false
      })
    })


}
