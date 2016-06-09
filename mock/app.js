var express = require('express'),
fs = require('fs'),
morgan  = require('morgan'),
bodyParser = require('body-parser')
request = require('request');

var app = express();

var accessLogStream = fs.createWriteStream('mock.log', {flags: 'w'});
app.use(morgan('common', {stream: accessLogStream}));

app.use(bodyParser.json())
var ingredients = [
  {name: 'Pollo', category: 'Carne', image_url: 'img/chicken.png'},
	{name: 'Papa', category: 'Tuberculo', image_url: 'img/potatoe.jpg'},
  {name: 'Zapallo', category: 'Verdura', image_url: 'img/pumpkin.png'},
  {name: 'Aceite de oliva', category: 'Aceite', image_url: 'img/olive_oil.png'},
];


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Content-Type');
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS,DELETE');
  next();
});

//ingredients
app.get('/ingredients', function(req, res) {
  res.status(200);
  res.send(ingredients);
});

app.get('/ingredients/:id', function(req, res) {
  res.status(200);
  res.send(ingredients[0]);
});

var server = app.listen(5000, function() {
  console.log("Api started in port: 5000");
});
