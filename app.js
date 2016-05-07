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


var env = 'development';

// development only
if ('development' == app.get('env'))
{
    app.use(express.errorHandler());
    app.get('/tests', function (req, res) {
        res.render('tests/test-application');
    });
}

app.get('/test', function (req, res) {
    res.render('test-application');
});
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/applications/list', function (req, res) {
    res.render('applications/list');
});

http.createServer(app).listen(app.get('port'), function ()
{
    console.log('Express server listening on port ' + app.get('port'));
});
