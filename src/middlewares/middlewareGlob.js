exports.middlewareGlobal = (req, res, next) => {
    // Isso é para ter acesso global as flash messages de errors que ocorrerem no back-end
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
  };
  
  exports.outroMiddleware = (req, res, next) => {
    next();
  };
  
  exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
      return res.render('404');
    }

    next();
  };
  
  exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  };