const Product = require('../models/ProductModel');

exports.index = (req, res) => {
    res.render('products/products', { product: {} });
}

exports.registerProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.register();

        if (product.errors.length > 0) {
            req.flash('errors', product.errors);
            req.session.save(() => res.redirect('/product'));
            return;
        }

        req.flash('success', 'Produto registrado com sucesso!');
        req.session.save(() => res.redirect(`/product/${product.product._id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.editProduct = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const product = await Product.searchId(req.params.id);

    if (!product) return res.render('404');

    res.render('products/products', { product });
}

exports.edit = async (req, res) => {
    try{
        if(!req.params.id) return res.render('404');
        // Reenviando os dados do body como se fossemos criar um novo, mas n passamos pelo método register
        const product = new Product(req.body)
        await product.edit(req.params?.id);
        
        if(product.errors.length > 0){
            req.flash('errors', product.errors);
            req.session.save(() => res.redirect(`/product/${req.params.id}`));
            return;
        }
        req.flash('success', 'Produto atualizado com sucesso!');
        req.session.save(() => res.redirect(`/product/${product.product._id}`));
        return;
    } catch(e){
        console.log(e);
        res.render('404');
    }
}

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404');
    const product = await Product.delete(req.params.id);
    if(!product) return res.render('404');

    req.flash('success', 'O produto foi deletado com sucesso!');
    req.session.save(() => res.redirect('/'));
    return;
}