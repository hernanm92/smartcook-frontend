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
  { id: 1, firstName: 'Boba', userName:'boba', lastName: 'Fett', email: 'starwars@smartcook.com',
    gender:'', dateOfBirth:'', password:'', avatar: 'img/profile-avatar.jpg',facebookId:'0' },
  { id: 2, firstName: 'Jabba', lastName: 'the Hutt', email: 'badguy@smartcook.com',
   gender:'', dateOfBirth:'', password:'', userName: 'jabba', avatar: 'img/profile-avatar.jpg',facebookId:'1' },
  { id: 3, firstName: 'Matias', userName: 'matileon', lastName: 'Leon Peralta', email: 'matias.leon@smartcook.com',
  gender:'', dateOfBirth:'', password:'river', avatar: 'https://imgsmartcook.blob.core.windows.net/profile/MatiasLeonPeralta.jpg',facebookId:'2', restrictions: restrictions, categories: categories },
  { id: 4, firstName: 'Hernan', userName: 'hmaschwitz', lastName: 'Maschwitz', email: 'hernanm992@gmail.com',
    gender:'', dateOfBirth:'', password:'outsider', avatar: 'https://imgsmartcook.blob.core.windows.net/profile/HernanMaschwitz.jpg'},
    { id: 5, firstName: 'Admin', userName:'admin', lastName: 'Admin', email: 'smartcookweb@gmail.com',
        gender:'', dateOfBirth:'', password:'1234', avatar: 'img/profile-avatar.jpg',facebookId:'0' },
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
  var id = req.params.id - 1;
  res.status(200);
  res.send(ingredients[id]);
});

//-------------------------recipes-------------------------
app.get('/recipes', function (req, res) {
  var object = req.query;
  res.status(200);
  res.send(recipes);
});

app.get('/recipes/:id', function (req, res) {
  res.status(200);
  res.send(recipes[req.params.id - 1]);
});

app.post('/recipes', function (req, res) {
  var object = req.body;
  var recipe = {
    id : recipes.length +1,
    name:object.name,
    image_url:object.image_url,
    stars : 0,
    description:object.description
  }
  recipes.push(recipe);
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
    var i = 0;
    for(i; i < users.length; i++){
    console.log(i);
        var iUser = users[i];
        console.log(req.body);
        if(req.body.userName.toLowerCase() == iUser.userName.toLowerCase()
        && req.body.pass == iUser.password){
            var token = jwt.sign(iUser, app.get('superSecret'), {
              expiresIn: 1440
            });
            res.json({
              success: true, token: token, name: iUser.userName, id: iUser.id
            });
          }
    }
    console.log("sali del for");
    res.json({
      success: false
    });
});

app.post('/login/facebook', function (req, res) {
  var user = req.body;
  var userdb = {
    id: Math.floor((Math.random() * 100) + 1),
    facebookId: user.userID,
    name: user.name
  };
  users.push(userdb);
  res.json({ id: userdb.id });
});

app.get('/login/facebook/:id', function (req, res) {
  var reqid = req.params.id;
  console.log(reqid);
  var userToSend = -1;
  for (var index = 0; index < users.length; index++) {
    var user = users[index];
    if (Number(user.facebookId) === Number(reqid)) {
      userToSend = user;
      //existe usuario, pasar datos
      break;
    }
  }
  if (userToSend === -1) {
    var registered = 1;
  }
  res.json({ registered: registered, name: userToSend.name, id: userToSend.id });
  //si id = -1 entonces registered = a 1
});

//-------------------------users-------------------------
app.get('/user/:id', function (req, res) {
  var id = req.params.id
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.id == req.params.id) {
  res.status(200);
  res.send(user);
    }
  }
});

app.get('/user/:userName', function (req, res) {
  var userName = req.params.userName
  var result = [];
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.userName.indexOf(userName) > -1) {
        result.push(user.userName);
    }
  res.status(200);
  res.send(result);
  }
});

app.get('/user', function (req, res) {
  res.status(200);
  res.send(users);
});

app.get('/users/newId', function (req, res) {
  var usersIds = [];
  for(i = 0; i < users.length; i++) usersIds.push(users[i].id);
  var newId = {"newId": Math.max.apply(null,usersIds)+1};
  res.status(200);
  res.send(newId);
});

app.post('/user',function(req,res){
    var object = req.body;
    object["id"] = users.length+1;
    users.push(object);
    res.status(200);
    res.send('Llego correctamente el usuario');
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
