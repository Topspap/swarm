var express = require('express');

var app = express();
var https = require('https');
//var http = require('http');
const fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var index = require('./routes/index');
const db = require('./helper/db.js')();

const options = {
  cert: fs.readFileSync("/root/www/ssl/certificate.crt"),
  key: fs.readFileSync("/root/www/ssl/private.key")
};
server = require('http').createServer(app),
io1 = require('socket.io').listen(server);
server.listen(80);
//http.createServer(app).listen(80);
server2 = require('https').createServer(options, app).listen(443),
io = require('socket.io').listen(server2);
//https.createServer(options, app).listen(443);

io.on('connection', socket => {
  console.log('User connected')
 
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//const server = http.createServer(app)
app.use (function (req, res, next) {
  if (req.secure) {
          // request was via https, so do no special handling
          req.io = io;
         
          next();
  } else {
          // request was via http, so redirect to https
        
          res.redirect('https://' + req.headers.host + req.url);

          
         
  }
});


app.use('/', index);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Set up express server here
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found BASKAN');
  err.status = 404;
  console.log(err)
  next(err.status+" HATA SAYFA YOK YADA ULAŞILMIYOR");
});