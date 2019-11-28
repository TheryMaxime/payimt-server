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
