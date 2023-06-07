const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  repeatPassword: { type: String, required: false },
});

const LoginModel = mongoose.model('Login', LoginSchema);
const bcryptjs = require('bcryptjs');

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async registerUser() {
    this.validate();
    if (this.body.password !== this.body.repeatPassword) {
      this.errors.push('As senhas não são idênticas');
    }

    if (this.errors.length > 0) return;
    await this.userExists();
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    const userSavedDb = {
      email: this.body.email,
      password: this.body.password
    };
    // const {email, password} = this.body;

    this.user = await LoginModel.create(userSavedDb);
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Esse usuário de e-mail já existe');
  }

  // Login
  async logar() {
    this.validate();
    if(this.errors.length > 0) return;
    
    this.user = await LoginModel.findOne({ email: this.body.email });
    if(!this.user) {
      this.errors.push('Usuário não existe')
      return;
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)){
      this.errors.push('Usuário e/ou senha inválido(s)');
      this.user = null;
      return;
    }

  }

  // Validando dados
  validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')

    if (this.body.password.length < 8 || this.body.password.length > 50) {
      this.errors.push('A senha precisa ter entre 8 e 50 caracteres');
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
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