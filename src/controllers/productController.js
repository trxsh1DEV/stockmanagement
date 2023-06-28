const Product = require('../models/ProductModel');
// const test = require('../../frontend/modules/actionsButtons');

exports.index = (req, res) => {
    res.render('products/products', { product: {} });
}

exports.home = async (req, res) => {
    // Pegando produtos do método estático "busca contatos"
    const products = await Product.searchProducts();
    // Injetando produtos na página index dos views
    res.render('index', { products });
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

    try {
        if (!req.params.id) return res.render('404');

        // Reenviando os dados do body como se fossemos criar um novo, mas n passamos pelo método register
        const product = new Product(req.body)
        await product.edit(req.params?.id);
        
        if (product.errors.length > 0) {
            req.flash('errors', product.errors);
            req.session.save(() => res.redirect(`/product/${req.params.id}`));
            return;
        }
        req.flash('success', 'Produto atualizado com sucesso!');
        req.session.save(() => res.redirect(`/product/${product.product._id}`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const product = await Product.delete(req.params.id);
    if (!product) return res.render('404');

    req.flash('success', 'O produto foi deletado com sucesso!');
    req.session.save(() => res.redirect('/products'));
    return;
}

exports.search = async (req, res) => {
    let products = {};
    const { searchProduct } = req.body;

    if (!searchProduct) {
        products = await Product.searchProducts();
        return res.render('index', { products });;
    }

    products = await Product.searchAll(searchProduct);
    res.render('index', { products });
}

exports.quantityProduct = async (req, res) => {

    try {
        if (!req.params.id) return res.render('404');
        const subOrAdd = req.body;

        if (subOrAdd.btnProductQtd) {
            let product = await Product.searchId(req.params.id);
            let result = new Product(product);
            await result.qtdeProduct(req.params.id, subOrAdd);

            if (result.errors.length > 0) {
                req.flash('errors', result.errors);
                req.session.save(() => res.redirect(`/products`));
                return;
            }

            req.flash('success', 'Produto atualizado com sucesso!');
            req.session.save(() => res.redirect(`/products`));
        }
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}

/*
Controllers que fiz para rotas que não vou usar, mas achei interesasnte por algum motivo deixar aq
exports.test = (req, res) => {
    console.log(req.body, res);
}
*/