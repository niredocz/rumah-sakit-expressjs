var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var poliRouter = require('./routes/poli');
var dokterRouter = require('./routes/dokter');
var pasienRouter = require('./routes/pasien');
var diagnosaRouter = require('./routes/diagnosa');
var tindakanRouter = require('./routes/tindakan');
var transPeriksaRouter = require('./routes/transaksi_periksa');
var transPeriksaDetailRouter = require('./routes/transaksi_periksa_detail');
var transRawatInapRouter = require('./routes/transaksi_rawat_inap');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/poli', poliRouter);
app.use('/dokter', dokterRouter);
app.use('/pasien', pasienRouter);
app.use('/diagnosa', diagnosaRouter);
app.use('/tindakan-medis', tindakanRouter);
app.use('/transaksi-periksa', transPeriksaRouter);
app.use('/transaksi-periksa-detail', transPeriksaDetailRouter);
app.use('/transaksi-rawat-inap', transRawatInapRouter);

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
