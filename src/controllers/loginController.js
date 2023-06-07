const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  res.render('login');
  return;
}

exports.register = (req, res) => {
  res.render('register');
  return;
};

exports.registerCreate = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.registerUser();
    if (login.errors.length > 0) {
      // Mensagens rápidas/temporárias
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/register')
      });
      return;
    }
    req.flash('success', 'Seu usuário foi criado com sucesso!');
      req.session.save(() => {
        return res.redirect('/register')
      });

    // res.send(login.errors);
  } catch (e) {
    console.log(e);
    return res.render('404');
  }

}