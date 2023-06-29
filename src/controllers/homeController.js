// const Products = require('../models/ProductModel');

exports.index = async (req, res) => {
  // Pegando produtos do método estático "busca contatos"
  // const products = await Products.searchProducts();
  // Injetando produtos na página index dos views
  // res.render('index', { products });
  res.render('newindex');
};