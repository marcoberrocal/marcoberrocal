var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var dataRouter = require('./routes/data');

// NOTE referring to the following lines - in JavaScrit ES6 use: import xxx from yyy
var swaggerUi = require('swagger-ui-express');	  // requires: npm install swagger-ui-express
const YAML = require('yamljs'),	              // requires: npm install yamljs
      swaggerDocument = YAML.load('./openapi/api.yaml')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/data', dataRouter);
const swaggerOptions = { }	// specify if needed
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))

module.exports = app;
