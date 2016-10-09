angular
    .module('MainApp')
    .service('RecipeUser', RecipeUser);

function RecipeUser(UserSession, notifyHelper, recipePerUserFactory, $modal) {

    var self = this;
    self.getRecipesOfUser = getRecipesOfUser;
    self.getFavoritesFromRecipes = getFavoritesFromRecipes;
    self.getRecipeFromId = getRecipeFromId;
    self.isFavorite = isFavorite;
    self.removeFromFavorites = removeFromFavorites;
    self.addToFavorites = addToFavorites;
    self.userNotLoggedIn = userNotLoggedIn;

    function getRecipesOfUser() {
        if (UserSession.isLogged())
            return recipePerUserFactory.query({username: UserSession.getUsername()}).$promise;
        else
            return undefined;
    }

    function getFavoritesFromRecipes(userRecipes) {
        return userRecipes.filter(function (r, i) {
            return r.favorite;
        });
    }

    function getRecipeFromId(id, list) {
        return list.filter(function (r, i) {
            return id == r.recipe_id
        });
    }

    function isFavorite(recipe, userFavoriteRecipes) {
        if (userFavoriteRecipes == undefined) return false;
        return getRecipeFromId(recipe.id, userFavoriteRecipes).length > 0;
    }

    function removeFromFavorites(recipe, userRecipes, userFavoriteRecipes) {
        var recipeUser = getRecipeFromId(recipe.id, userRecipes)[0];
        if (recipeUser != undefined) { // Existe el link usuario-receta
            for (var i = 0; i < userFavoriteRecipes.length; i++)
                if (userFavoriteRecipes[i].recipe_id == recipe.id) {
                    recipeUser.favorite = false;
                    recipePerUserFactory.update(recipeUser);
                    userFavoriteRecipes.splice(i, 1);
                    notifyHelper.success('Receta Removida de Favoritos');
                    break;
                }
        }
    }

    function addToFavorites(recipe, userRecipes, userFavoriteRecipes) {
        if (!UserSession.isLogged()) window.location.href = "#/register";
        var recipeUser = getRecipeFromId(recipe.id, userRecipes)[0];
        if (recipeUser != undefined) { // Existe el link usuario-receta
            recipeUser.favorite = true;
            recipePerUserFactory.update(recipeUser);
        } else { // Creo el link usuario-receta
            recipeUser = {
                recipe_id: recipe.id,
                username: UserSession.getUsername(),
                favorite: true,
                owner: false,
                like: false,
                vote: null
            }
            recipePerUserFactory.save(recipeUser, function (res) {
            });
        }
        userFavoriteRecipes.push(recipeUser);
        notifyHelper.success('Receta Agregada a Favoritos');
    }

    function userNotLoggedIn() {
        var message = 'Para poder agregar recetas como favoritas debe tener un usuario. Desea ingresar con uno?';
        var title = 'Crear Usuario';
        return $modal.open({
            animation: true,
            templateUrl: '/general/confirmForm',
            controller: 'ModalController',
            size: 'sm',
            resolve: {
                message: function () {
                    return message;
                },
                title: function () {
                    return title
                }
            },
            windowClass: 'menu-bar-space'
        });
    }

};