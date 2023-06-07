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

Product.prototype.validate = async function(){
  this.cleanUp();
  // parseFloat(this.body.price);

  // if(!this.body.nameProd && typeof this.body.nameProd != 'string') this.errors.push('O nome do produto não pode ficar vazio!');
  // if(!this.body.category && typeof this.body.category != 'string') this.errors.push('O nome do produto não pode ficar vazio!');
  if(!this.body.nameProd) this.errors.push('O nome do produto não pode ficar vazio!');
  if(!this.body.category) this.errors.push('A categoria do produto não pode ficar vazia!');
  console.log(this.body.price, typeof this.body.price);
  if(!this.body.price && this.body.price <= 0) this.errors.push('O preço não pode estar vazio ou ser menor que 0')

}

Product.prototype.cleanUp = async function(){
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nameProd: this.body.nameProduct,
    category: this.body.category,
    price: Number(this.body.price),
    description: this.body.description
  }
}

module.exports = Product;