const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nameProd: { type: String, required: true },
  category: { type: String, required: true },
  provider: {type: String, required: false},
  price: { type: Number, required: true },
  selling: {type: Number, required: false},
  brand: {type: String, required: false},
  quantity: { type: Number, default: 1 },
  description: { type: String, required: false },
  createAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('Product', ProductSchema);

function Product(body) {
  this.body = body;
  this.errors = [];
  this.product = null;
}

Product.prototype.register = async function () {
  this.validate();

  if (this.errors.length > 0) return;

  this.product = await ProductModel.create(this.body);

}

Product.prototype.qtdeProduct = async function (id, subOrAdd) {
  if (!id && typeof id !== 'string') return;

  let sum = 0;

  sum = subOrAdd.btnProductQtd == '1' ? this.body.quantity + 1 : this.body.quantity - 1;

  if (this.body.quantity <= 0 && sum <= 0) {
    this.errors.push('Um produto não pode ter menos que 0 produto(s) no estoque')
  }

  if (this.body.quantity > 99 && sum > 99) {
    this.errors.push('Não é possível ter mais que 100 produto(s) no estoque')
  }

  if (this.errors.length > 0) return;

  this.product = await ProductModel.findOneAndUpdate(
    { _id: id },
    { $set: { quantity: sum } },
    { new: true }
  )
}

Product.prototype.edit = async function (id) {
  if (!id && typeof id !== 'string') return;
  this.validate();
  if (this.errors.length > 0) return;

  // se passar pelas verificações posso pegar o contato pelo id e atualizar ele cm o novo conteúdo do body
  this.product = await ProductModel.findByIdAndUpdate(id, this.body, { new: true }); // o new: true é pra retornar os dados att
}

Product.prototype.validate = async function () {
  this.cleanUp();
  const price = Number(this.body.price);
  
  if (!this.body.nameProd) this.errors.push('O nome do produto não pode ficar vazio!');
  if (!this.body.category) this.errors.push('A categoria do produto não pode ficar vazia!');
  if (this.body.quantity) {
    if (this.body.quantity < 0) {
      this.errors.push('A quantidade não pode ficar menor que 0');
    }
  }

  if(this.body.selling){
    const selling = Number(this.body.selling);
    if(!selling || this.body.price > selling) this.errors.push('O valor de venda tem que ser um número e ser maior que o preço pago!');
  }

  if (!price) this.errors.push('O preço não pode estar vazio ou ser menor que 0')

}

Product.prototype.cleanUp = async function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    /*
      provider: {type: String, required: true},
  price: { type: Number, required: true },
  selling: {type: Number, required: true},
  brand: {type: String, required: true},
     */
    nameProd: this.body.nameProd,
    category: this.body.category,
    provider: this.body.provider,
    price: this.body.price,
    selling: this.body.selling,
    brand: this.body.brand,
    quantity: this.body.quantity,
    description: this.body.description
  }
}

// Static methods

Product.searchId = async function (id) {
  if (typeof id !== 'string') return;
  let product = await ProductModel.findById(id);

  return product;
}

Product.searchProducts = async function () {
  // Dentro de find é possível filtrar oq vms receber, ex: find({price: this.body.price })
  // Buscando todos os contatos e listando contatos na ordem decrescente
  const products = await ProductModel.find().sort({ createAt: -1 });
  return products;
}

Product.delete = async function (id) {
  if (typeof id !== 'string') return;

  const product = await ProductModel.findOneAndDelete({ _id: id });
  return product;
}

Product.searchAll = async function (text) {
  const exp = new RegExp(text, "gi");

  let search;

  if (mongoose.Types.ObjectId.isValid(text)) {
    search = await ProductModel.findOne({ _id: text });
    if (search) {
      return [search];
    }
  }

  search = await ProductModel.find({ nameProd: exp }).sort({ createAt: -1 }).limit(10);
  return search;
}

Product.filter = async function(value) {
  let finalFilter = value;
  finalFilter = await ProductModel.find({ category: value }).sort({ createAt: -1 }).limit(3);
  return finalFilter;
}

module.exports = Product;