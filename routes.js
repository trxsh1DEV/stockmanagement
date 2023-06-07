const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contactController');

// Rotas da home
route.get('/', homeController.index);


module.exports = route;