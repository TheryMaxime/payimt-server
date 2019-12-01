module.exports = function(app) {
  const cafeteria = require('../controllers/cafeteriaController');

  app.route('/cafeteria')
    .post(cafeteria.request_payment);
};
