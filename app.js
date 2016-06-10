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

http.createServer(app).listen(app.get('port'), function ()
{
    console.log('Express server listening on port ' + app.get('port'));
});
