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
    self.userVoteOfRecipe = userVoteOfRecipe;
    self.getVotedFromRecipes = getVotedFromRecipes;
    self.saveUserVote = saveUserVote;

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

    function userNotLoggedIn(message,title) {
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

    function userVoteOfRecipe(recipe,recipeList){
        if (recipeList == undefined) return null;
        var r = getRecipeFromId(recipe.id, recipeList);
        if(r.length > 0) return r[0].stars; else return null;
    }

    function getVotedFromRecipes(userRecipes){
        return userRecipes.filter(function (r, i) {
            return r.stars != null;
        });
    }

    function saveUserVote(recipe,userRecipes,vote){
        var recipeUser = getRecipeFromId(recipe.id, userRecipes)[0];
        if (recipeUser != undefined) { // Existe el link usuario-receta
            recipeUser.stars = vote;
            recipePerUserFactory.update(recipeUser);
        } else { // Creo el link usuario-receta
            recipeUser = {
                recipe_id: recipe.id,
                username: UserSession.getUsername(),
                favorite: false,
                owner: false,
                like: false,
                vote: null,
                stars: vote
            }
            recipePerUserFactory.save(recipeUser, function (res) {
            });
        }
        userRecipes.push(recipeUser);
    }
};
