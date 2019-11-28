const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  Cafeteria = require('./API/models/cafeteriaModel');

const uri = "mongodb+srv://admin-user:fincWmLiDp7zusYe@payimt-ogffp.mongodb.net/pay_imt?retryWrites=true&w=majority";
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

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
