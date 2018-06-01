const fire_functions = require('firebase-functions'),
      express = require('express'),
      path = require('path'),
      admin = require('firebase-admin'),
      functions = require('firebase-functions'),
      bodyParser = require('body-parser'),
      routes = require('./routes/index'),
      kara = require('./routes/kara'),
      ps4 = require('./routes/ps4'),
      dvd = require('./routes/dvd'),
      rent = require('./routes/rent'),
      stu_status = require('./routes/status');

var app = express();
var router = express.Router()

//admin.initializeApp(fire_functions.config().firebase);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/main',routes);
app.use('/kara',kara);
app.use('/ps4',ps4);
app.use('/dvd',dvd);
app.use('/rent',rent);
app.use('/stu_status',stu_status);


// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
*/
//var db = admin.firestore();
app.get('/timestamp', (request,response) => {
    response.send(`${Date.now()}`);
})

app.get('/timestamp-cached', (request,response) => {
    response.set('Cached-Control','public,max-age=300,s-max-age=600')
    response.send(`${Date.now()}`);
})

 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

 //app.listen(3000, () => console.log('Example app listening on port 3000!'))
 exports.app = functions.https.onRequest(app);
