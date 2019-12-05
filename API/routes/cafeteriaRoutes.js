module.exports = function(app) {
  const cafeteria = require('../controllers/cafeteriaController');
  const login = require('../controllers/loginController');

  app.route('/cafeteria')
    .get(cafeteria.get_all_items)
    .post(cafeteria.request_payment);

  app.route('/login')
    .post(login.login);
};
