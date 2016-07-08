var express = require('express'),
  fs = require('fs'),
  morgan = require('morgan'),
  bodyParser = require('body-parser')
request = require('request');
jwt = require('jsonwebtoken');
var app = express();

var accessLogStream = fs.createWriteStream('mock.log', { flags: 'w' });
app.use(morgan('common', { stream: accessLogStream }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.set('superSecret', 'secrettt');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
  next();
});

var ingredients = [
  { id: 1, name: 'Pollo', category: 'Carne', image_url: 'img/chicken.png' },
  { id: 2, name: 'Papa', category: 'Tuberculo', image_url: 'img/potatoe.jpg' },
  { id: 3, name: 'Zapallo', category: 'Verdura', image_url: 'img/pumpkin.png' },
  { id: 4, name: 'Aceite de oliva', category: 'Aceite', image_url: 'img/olive_oil.png' }
];

var recipes = [
  { id: 1, name: 'Pollo a la griega', image_url: 'img/chicken-potatoe.jpg', stars: 4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.' },
  { id: 2, name: 'Brochette de pollo', image_url: 'img/chicken-brochette.jpg', stars: 4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.' },
  { id: 3, name: 'Wok de pollo', image_url: 'img/chicken-wok.jpg', stars: 4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.' },
  { id: 4, name: 'Suprema napolitana', image_url: 'img/chicken-pizza.jpg', stars: 4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.' }
];

var restrictions = [
  { id: 1, name: 'Vegetariano'},
  { id: 2, name: 'Vegano'},
  { id: 3, name: 'Celiaco'},
  { id: 4, name: 'Diabetico'}
];

//TODO: Add mock user

//ingredients
app.get('/ingredients', function (req, res) {
  res.status(200);
  res.send(ingredients);
});

app.get('/ingredients/id/:id', function (req, res) {
  res.status(200);
  res.send(ingredients[0]);
});

app.get('/ingredients/:text', function (req, res) {
  var text = req.params.text
  var ingToSend = [];
  for (var i = 0; i < ingredients.length; i++) {
    var ingredient = ingredients[i];
    if (ingredient.name.toLowerCase().indexOf(req.params.text.toLowerCase()) > -1) {
      var ing = {
        "name": ingredient.name,
        "id": ingredient.id
      }
      ingToSend.push(ing);
    }
  }
  res.status(200);
  res.send(ingToSend);
});

//recipes
app.get('/recipes', function (req, res) {
  res.status(200);
  res.send(recipes);
});

app.get('/recipes/:id', function (req, res) {
  res.status(200);
  res.send(recipes[0]);
});

app.post('/recipes', function (req, res) {
  res.status(200);
  res.send('Llego correctamente la receta');
  console.log(req.body);
});

//restrictions
app.get('/restrictions', function (req, res) {
  res.status(200);
  res.send(restrictions);
});

//login
app.post('/login', function (req, res) {
  var user = {
    name: "admin",
    role: "admin"
  }
  if (req.body.username === 'admin@gmail.com' && req.body.pass === 1234) {
    var token = jwt.sign(user, app.get('superSecret'), {
      expiresIn: 1440
    });
    res.json({
      success: true,
      message: 'Enjoy your token',
      token: token
    });
  } else {
    res.json({
      success: true,
      message: 'El usuario o contraseña son incorrectos'
    });
  }
});


var server = app.listen(5000, function () {
  console.log("Api started in port: 5000");
});
