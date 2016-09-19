(function () {
    angular.module('MainApp').
        factory('Profile', ProfileFactory);

    function ProfileFactory() {
        function Profile(username, email, avatar, recipes, categories, ingredients, restrictions) {
            this.username = username;
            this.email = email;
            this.avatar = avatar;
            this.recipes = recipes;
            this.categories = categories;
            this.ingredients = ingredients;
            this.restrictions = restrictions;
        }
        return Profile;
    }
})();
