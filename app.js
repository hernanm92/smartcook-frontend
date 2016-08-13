/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var flow = require('./flow-node.js')('images');

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/general/home', function (req, res) {
    res.render('general/home');
});
app.get('/general/profile', function (req, res) {
    res.render('general/profile');
});
app.get('/general/login', function (req, res) {
    res.render('general/login');
});
app.get('/general/register', function (req, res) {
    res.render('general/register');
});
app.get('/general/listing', function (req, res) {
    res.render('general/listing');
});
app.get('/general/top-listing', function (req, res) {
    res.render('general/top-listing');
});
app.get('/general/validate', function (req, res) {
    res.render('general/validate');
});
app.get('/general/createRecipe', function (req, res) {
    res.render('general/createRecipe');
});
app.get('/general/confirmForm', function (req, res) {
    res.render('general/confirmForm');
});
app.get('/general/ingredients/empty-ing-template', function (req, res) {
    res.render('general/ingredients/empty-ing-template');
});
app.get('/general/ingredients/ing-template', function (req, res) {
    res.render('general/ingredients/ing-template');
});
app.get('/general/channel', function (req, res) {
    res.render('general/channel');
});
app.get('/general/modals/ingredient', function (req, res) {
    res.render('general/modals/ingredient');
});
app.get('/general/modals/recipe', function (req, res) {
    res.render('general/modals/recipe');
});
app.get('/general/detail-recipe', function (req, res) { 
    res.render('general/detail-recipe');
})
app.get('/general/recipe-detail-template', function (req, res) { 
    res.render('general/recipe-detail-template');
})

// Handle uploads through Flow.js
app.post('/upload', multipartMiddleware, function(req, res) {
  flow.post(req, function(status, filename, original_filename, identifier) {
    console.log('POST', status, original_filename, identifier);
    res.status(status).send();
  });
});


app.options('/upload', function(req, res){
  console.log('OPTIONS');
  res.status(200).send();
});

// Handle status checks on chunks through Flow.js
app.get('/upload', function(req, res) {
  flow.get(req, function(status, filename, original_filename, identifier) {
    console.log('GET', status);
    if (status == 'found') {
      status = 200;
    } else {
      status = 204;
    }
    res.status(status).send();
  });
});

app.get('/download/:identifier', function(req, res) {
  flow.write(req.params.identifier, res);
});

app.listen(3000)
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
