(function () {
    angular.module('MainApp').
        factory('Profile', ProfileFactory);

    function ProfileFactory() {
        function Profile(username, email, avatar, recipes, categories, ingredients, celiac, vegan, vegetarian, diabetic) {
            this.username = username;
            this.email = email;
            this.avatar = avatar;
            this.recipes = recipes;
            this.categories = categories;
            this.ingredients = ingredients;
            this.celiac = celiac;
            this.vegan = vegan;
            this.vegetarian = vegetarian;
            this.diabetic = diabetic;
        }
        return Profile;
    }
})();
