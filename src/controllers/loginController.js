const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if(req.session.user) return res.render('login-logged');
  // Verificando sessão do usuário logado
  return res.render('login');
}

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.logar();
    
    if (login.errors.length > 0) {
      // Mensagens rápidas/temporárias
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/login')
      });
      return;
    }

    req.flash('success', 'Parabéns, desfrute desse maravilindo sistema');
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect('/login')
    });

  } catch (e) {
    console.log(e);
    return res.render('404');
  }

}

exports.register = (req, res) => {
  res.render('register');
  return;
};

exports.registerCreate = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.registerUser();
    // console.log(login);
    if (login.errors.length > 0) {
      // Mensagens rápidas/temporárias
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/register')
      });
      return;
    }
    req.flash('success', 'Seu usuário foi criado com sucesso!');
    setTimeout(() => {
      req.session.save(() => {
        return res.redirect('/login')
      });
    }, 3000);

    // res.send(login.errors);
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
}

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}