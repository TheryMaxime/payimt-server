const express = require('express'),
bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./API/routes/cafeteriaRoutes');
routes(app);

app.listen(8080);
