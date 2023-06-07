const Product = require('../models/ProductModel');

exports.index = (req,res) => {
    res.render('products/products');
}

exports.registerProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.register();
        
        console.log(product.errors);
        if(product.errors.length > 0) {
            req.flash('errors', product.errors);
            req.session.save(() => res.redirect('/product'));
            return;
        }
    
        req.flash('success', 'Produto registrado com sucesso!');
        req.session.save(() => res.redirect('/'));
        return;
    } catch(e){
        console.log(e);
        return res.render('404');
    }
}