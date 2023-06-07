const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  repeatPassword: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body){
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async registerUser(){
    this.validate();
    if(this.errors.length > 0) return;
    try {
      this.user = await LoginModel.create(this.body);
    } catch(e){
      console.log(e);
    }
  }

  // Validando dados
  validate(){
    this.cleanUp();
    console.log(this.body);

    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')

    if(this.body.password.length < 8 || this.body.password.length > 50) {
      this.errors.push('A senha precisa ter entre 8 e 50 caracteres');
    }
    if(this.body.password !== this.body.repeatPassword) {
      this.errors.push('As senhas não são idênticas');
    }
  }

  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      repeatPassword: this.body.repeatPassword
    };
  }
}

module.exports = Login;