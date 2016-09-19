(function () {
    angular.module('MainApp').
        factory('Profile', ProfileFactory);

    function ProfileFactory() {
        function Profile(username, mail, avatar, recipes, categories, ingredients, restrictions) {
            this.username = username;
            this.mail = mail;
            this.avatar = avatar;
            this.recipes = recipes;
            this.categories = categories;
            this.ingredients = ingredients;
            this.restrictions = restrictions;
        }
        return Profile;
    }
})();
