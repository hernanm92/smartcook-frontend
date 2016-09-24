app.controller('ProfileController',
    function ($scope, ingredientFactory, categoriesFactory, userFactory, recipeFactory, UserSession,
        ingredientService, restrictionsService, recipeService, Profile, blockUI, $q, imgService,
        foodCategoriesPerUserFactory) {

        $scope.categories = [];
        $scope.updateRestrictions = updateRestrictions;
        $scope.addedPhoto = addedPhoto;
        $scope.addCategoryToUser = addCategoryToUser;
        $scope.removeCategoryOfUser = removeCategoryOfUser;
        init();

        function init() {
            blockUI.start();
            categoriesFactory.query({}, function (categories) {
                $scope.categories = categories;
                $scope.profile = UserSession.getUserProfile(); //no hace niguna operacion asincronica
                blockUI.stop();
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
                return category.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
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
            var category = { food_category_id: categoryTag.id, username: $scope.profile.username }
            foodCategoriesPerUserFactory.save(category, function (response) {
            });
        }

        function removeCategoryOfUser(categoryTag) {
            var category = { food_category_id: categoryTag.id, username: $scope.profile.username }
            foodCategoriesPerUserFactory.remove(category, function () {
            })
        }
    }
);
