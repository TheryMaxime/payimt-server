module.exports = function(app) {
  const cafeteria = require('../controllers/cafeteriaController');

  app.route('/cafeteria')
    .get(cafeteria.get_all_items)
    .post(cafeteria.create_item);
};
