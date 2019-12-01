const express = require('express'),
  bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./API/routes/cafeteriaRoutes');
routes(app);

/*
let new_item = new Cafeteria({
  "id" : 123456789,
  "title" : "Thé",
  "price" : 0.3
});
new_item.save();
*/

app.listen(8080);
