var express = require('express'),
fs = require('fs'),
morgan  = require('morgan'),
bodyParser = require('body-parser')
request = require('request');

var app = express();

var accessLogStream = fs.createWriteStream('mock.log', {flags: 'w'});
app.use(morgan('common', {stream: accessLogStream}));

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Content-Type');
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS,DELETE');
  next();
});

var ingredients = [
  {id: 1, name: 'Pollo', category: 'Carne', image_url: 'img/chicken.png'},
	{id: 2, name: 'Papa', category: 'Tuberculo', image_url: 'img/potatoe.jpg'},
  {id: 3, name: 'Zapallo', category: 'Verdura', image_url: 'img/pumpkin.png'},
  {id: 4, name: 'Aceite de oliva', category: 'Aceite', image_url: 'img/olive_oil.png'}
];

var recipes = [
  {id: 1, name: 'Pollo a la griega', image_url: 'img/chicken-food.jpg', stars: 4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.'},
  {id: 2, name: 'Pollo a la griega', image_url: 'img/chicken-food.jpg', stars: 4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.'},
  {id: 3, name: 'Pollo a la griega', image_url: 'img/chicken-food.jpg', stars: 4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.'},
  {id: 4, name: 'Pollo a la griega', image_url: 'img/chicken-food.jpg', stars: 4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.'}
];

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
