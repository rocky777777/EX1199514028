var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

app.post('/hola', (req, res) => {
  res.send(req.body.empresa);
});
app.get('/ingreso', (req, res, next) => {
  var datos = {
    "empresa": "",
    "RTN": "",
    "fecha": "",
    "correo":"",
    "rubro":"",
  
  }
  res.render("url", datos);
});
app.post('/ingreso', (req, res, next) => {
  var date = new Date();
  var correos = ["noe_paz7@gmail.com", "Fabriciochapas@gmail.com", "henrypaz@gmail.com", "menchita@gmail.com", "elmasin@gamil.com", "", ];
 
  res.send("Empresa: " + req.body.empresa + "URL: " + req.body.url + "video: " + req.body.video + "a?o: " + req.body.ano + "Ingreso: " + date.getDay().toString() + " de " + meses[date.getMonth()] + ", " + date.getFullYear().toString());
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
