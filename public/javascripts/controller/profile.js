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
                $scope.profile = UserSession.getUserProfile();
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

        $scope.badges = [
            { 'id': '1', 'name': 'Celiaco1', 'description': 'Badge de Celiaco', 'image': '/img/badges/celiac-copper.jpg' },
            { 'id': '2', 'name': 'Validacion1', 'description': 'Badge de Validador', 'image': '/img/badges/validation-copper.jpg' },
            { 'id': '3', 'name': 'Diabetes1', 'description': 'Badge de Diabetico', 'image': '/img/badges/diabetes-silver.jpg' },
            { 'id': '4', 'name': 'General1', 'description': 'Badge de Contribudor', 'image': '/img/badges/general-gold.jpg' },
            { 'id': '5', 'name': 'Vegano1', 'description': 'Badge de Vegano', 'image': '/img/badges/vegan-copper.jpg' }
        ];

        /*$scope.upload = function () {
            badgeFactory.save($('#a').val());
            //            badgeFactory.save("{name: 'badge1', description: 'soy un badge'}");
        }*/
    }
);
