app.controller('ProfileController',
    function ($scope, ingredientFactory, categoriesFactory, userFactory, recipeFactory, UserSession,
              ingredientService, restrictionsService, recipeService, Profile, blockUI, $q, imgService,
              foodCategoriesPerUserFactory, badgeFactory, badgePerUserFactory, ingredientPerUserFactory) {

        $scope.categories = [];
        $scope.badges = [];
        $scope.updateRestrictions = updateRestrictions;
        $scope.addedPhoto = addedPhoto;
        $scope.addCategoryToUser = addCategoryToUser;
        $scope.removeCategoryOfUser = removeCategoryOfUser;
        $scope.upload = upload;
        $scope.addIngredientToUser = addIngredientToUser;
        $scope.removeIngredientOfUser = removeIngredientOfUser;
        init();

        function init() {
            blockUI.start();
            categoriesFactory.query({}, function (categories) {
                $scope.categories = categories;
                $scope.profile = UserSession.getUserProfile();
                if($scope.profile.avatar == undefined) $scope.profile.avatar = 'assets/img/newLogo.jpg';
                blockUI.stop();
            });
            badgePerUserFactory.query({username: UserSession.getUsername()}).$promise.then(function (userBadges) {
                for (var i = 0; i < userBadges.length; i++)
                    badgeFactory.get({id: userBadges[i].badge_id}).$promise.then(function (badge) {
                        $scope.badges.push(badge);
                    });
            });
        }

        $scope.toggleSelection = function toggleSelection(restriction) { // toggle selection for a given fruit by name
            var index = $scope.profile.restrictions.indexOf(restriction);
            if (index > -1) { // is currently selected
                $scope.profile.restrictions.splice(index, 1)
            }
            else {
                $scope.profile.restrictions.push(restriction);// is newly selected
            }
        }

        $scope.loadExcludedCategories = function (query) {
            return $scope.categories.filter(function (category) {
                return category.name.toLowerCase().indexOf(query.toLowerCase()) != -1 && category.name.toLowerCase() != 'otros' ;
            });
        };

        $scope.loadExcludedIngredients = function (query) {
            return ingredientService.getIngredientsBy(query);
        };

        //save profile
        function updateRestrictions() {
            $scope.profile.id = $scope.profile.username;
            userFactory.update($scope.profile);
        }

        function addedPhoto(flowObject, event, flow) {
            flow.files = []; //borro todo lo anterior. Luego se agrega el file
            $scope.profile.avatar = imgService.getUrlImgProfile($scope.profile.username);
            imgService.uploadImgProfile($scope.profile.username, flowObject.file);
            $scope.profile.id = $scope.profile.username;
            userFactory.update($scope.profile);
        }

        function addCategoryToUser(categoryTag) {
            var category = {food_category_id: categoryTag.id, username: $scope.profile.username}
            foodCategoriesPerUserFactory.save(category, function (response) {
            });
        }

        function removeCategoryOfUser(categoryTag) {
            var category = {food_category_id: categoryTag.id, username: $scope.profile.username}
            foodCategoriesPerUserFactory.remove(category, function () {
            })
        }

          function addIngredientToUser(ingredientTag) {
            var ingredient = {ingredient_id: ingredientTag.id, username: $scope.profile.username, excluded:true}
            ingredientPerUserFactory.save(ingredient, function (response) {
            });
        }

        function removeIngredientOfUser(ingredientTag) {
            var ingredient = {ingredient_id: ingredientTag.id, username: $scope.profile.username}
            ingredientPerUserFactory.remove(ingredient, function () {
            })
        }

        function upload() {
            // for(var i = 0; i < badges.length; i++) badgePerUserFactory.save(badges[i]);
        }
    }
);
