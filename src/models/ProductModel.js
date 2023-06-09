const mongoose = require('mongoose');
const validator = require('validator');

const ProductSchema = new mongoose.Schema({
  // id: { type: Number, required: true },
  nameProd: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  createAt: {type: Date, default: Date.now}
});

const ProductModel = mongoose.model('Product', ProductSchema);

function Product(body) {
  this.body = body;
  this.errors = [];
  this.product = null;
}

Product.prototype.register = async function(){
  this.validate();

  if(this.errors.length > 0) return;

  this.product = await ProductModel.create(this.body);
}

Product.prototype.edit = async function(id) {
  if(!id && typeof id !== 'string') return;
  this.validate();
  if(this.errors.length > 0) return;

  // se passar pelas verificações posso pegar o contato pelo id e atualizar ele cm o novo conteúdo do body
  this.product = await ProductModel.findByIdAndUpdate(id, this.body, { new: true }); // o new: true é pra retornar os dados att
}

Product.prototype.validate = async function(){
  this.cleanUp();
  const price = Number(this.body.price);

  if(!this.body.nameProd) this.errors.push('O nome do produto não pode ficar vazio!');
  if(!this.body.category) this.errors.push('A categoria do produto não pode ficar vazia!');
  
  if(!price) this.errors.push('O preço não pode estar vazio ou ser menor que 0')

}

Product.prototype.cleanUp = async function(){
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nameProd: this.body.nameProd,
    category: this.body.category,
    price: this.body.price,
    description: this.body.description
  }
}

// Static methods

Product.searchId = async function(id) {
  if(typeof id !== 'string') return;
  const product = await ProductModel.findById(id);

  return product;
}

Product.searchProducts = async function() {
  // Dentro de find é possível filtrar oq vms receber, ex: find({price: this.body.price })
  // Buscando todos os contatos e listando contatos na ordem decrescente
  const products = await ProductModel.find().sort({ createAt: -1 });
  return products;
}

Product.delete = async function(id) {
  if(typeof id !== 'string') return;

  const product = await ProductModel.findOneAndDelete({ _id: id });
  return product;
}


module.exports = Product;