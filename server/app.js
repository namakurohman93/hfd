if (process.env.NODE_ENV === 'development') require('dotenv').config();

const cors = require('cors');
const express = require('express');

const app = express();
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');

require('./config/mongodb');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', routes);
app.use(errorHandler);

module.exports = app;
