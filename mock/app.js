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
  { id: 1, name: 'Vegetariano' },
  { id: 2, name: 'Vegano' },
  { id: 3, name: 'Celiaco' },
  { id: 4, name: 'Diabetico' }
];

var categories = [
  { id: 1, name: 'Pescados' },
  { id: 2, name: 'Frutas' },
  { id: 3, name: 'Verduras' },
  { id: 3, name: 'Carnes' }
];

var users = [
  { id: 1, name: 'Boba Fett', email: 'starwars@smartcook.com', avatar: 'img/profile-avatar.jpg' },
  { id: 2, name: 'Jabba the Hutt', email: 'badguy@smartcook.com', avatar: 'img/profile-avatar.jpg' }
];

app.get('/categories/:text', function (req, res) {
  var text = req.params.text
  var catToSend = getItemsByNameIn(categories, text, mapCategory)
  res.status(200);
  res.send(catToSend);
});

//-------------------------ingredients-------------------------
app.get('/ingredients', function (req, res) {
  var text = req.query.text;
  if (typeof text === 'undefined') {
    res.status(200);
    res.send(ingredients);
  } else {
    res.status(200);
    res.send(getItemsByNameIn(ingredients, text, mapIngredient));
  }
});

app.get('/ingredients/:id', function (req, res) {
  var id = req.params.id -1;
  res.status(200);
  res.send(ingredients[id]);
});

//-------------------------recipes-------------------------
app.get('/recipes', function (req, res) {
  res.status(200);
  res.send(recipes);
});

app.get('/recipes/:id', function (req, res) {
  res.status(200);
  res.send(recipes[req.params.id-1]);
});

app.post('/recipes', function (req, res) {
  res.status(200);
  res.send('Llego correctamente la receta');
});

//-------------------------restrictions-------------------------
app.get('/restrictions', function (req, res) {
  res.status(200);
  res.send(restrictions);
});

//-------------------------categories-------------------------
app.get('/categories', function (req, res) {
  res.status(200);
  res.send(categories);
});

//-------------------------validation-------------------------
app.post('/validateRecipe', function (req, res) {
  res.status(200);
  res.send('Receta Validada');
});

//-------------------------login-------------------------
app.post('/login', function (req, res) {
  var user = {
    name: "admin",
    role: "admin"
  }
  if (req.body.username.toLowerCase() === 'admin' && req.body.pass === '1234') {
    var token = jwt.sign(user, app.get('superSecret'), {
      expiresIn: 1440
    });
    res.json({
      success: true,
      token: token,
      nameUser: 'Admin',
      idUser: 1
    });
  } else {
    res.json({
      success: false
    });
  }
});

//-------------------------users-------------------------
app.get('/user/:text', function (req, res) {
  var text = req.params.text
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.id == req.params.text) {
      var user = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "avatar": user.avatar
      }
      break;
    }
  }
  res.status(200);
  res.send(user);
});

//-------------------------items-----------------------
app.get('/items/:text', function (req, res) {
  var items = [];
  var text = req.params.text;
  var ings = getItemsByNameIn(ingredients, text, mapIngSearch);
  var recps = getItemsByNameIn(recipes, text, mapRecipeSearch);
  res.status(200);
  res.send(ings.concat(recps));
});

//------------------------Helpers
function mapIngredient(ingredient) {
  //Cuando el ingrediente tenga mas datos(descripcion) se va a necesitar mapear.
  return ingredient;
}

function mapIngSearch(ing) {
  return {
    id: ing.id,
    name: ing.name,
    image: ing.image_url,
    type: 1
  }
}

function mapRecipeSearch(recipe) {
  return {
    id: recipe.id,
    name: recipe.name,
    type: 0
  }
}

function mapRecipe(recipe) {
  return {
    id: recipe.id,
    name: recipe.name,
  }
}

function mapCategory(category) {
  return category;
}

function getItemsByNameIn(array, filter, fmap) {
  var itemsFiltered = [];
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (item.name.toLowerCase().includes(filter.toLowerCase())) {
      var itemDTO = fmap(item);
      itemsFiltered.push(itemDTO);
    }
  }
  return itemsFiltered;
}

var server = app.listen(5000, function () {
  console.log("Api started in port: 5000");
});
