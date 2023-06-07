const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// Rotas da home
route.get('/', homeController.index);

route.get('/login', loginController.index);
route.get('/register', loginController.register);
route.post('/register', loginController.registerCreate);

module.exports = route;