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
route.get('/register', loginRequired, loginController.register);
route.post('/register', loginRequired, loginController.registerCreate);
route.get('/login/logout', loginRequired, loginController.logout);

// Rotas de produto
route.get('/products', loginRequired, productController.home);
route.get('/product/register', loginRequired, productController.index);
route.post('/product/register', loginRequired, productController.registerProduct);
route.get(`/product/:id`, loginRequired, productController.editProduct);
route.post('/product/edit/:id', loginRequired, productController.edit)
route.get('/product/delete/:id', loginRequired, productController.delete);
route.post('/products/search', loginRequired, productController.search);

// route.get('/product/register', productController.newProduct);
module.exports = route;