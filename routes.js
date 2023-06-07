const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const productController = require('./src/controllers/productController');

const { loginRequired } = require('./src/middlewares/middlewareGlob');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login', loginController.index);
route.post('/login', loginController.login);
route.get('/register', loginController.register);
route.post('/register', loginController.registerCreate);
route.get('/login/logout', loginController.logout);

// Rotas de contato
route.get('/product', loginRequired, productController.index);
route.post('/product/register', loginRequired, productController.registerProduct);
// route.get('/product/register', productController.newProduct);
module.exports = route;