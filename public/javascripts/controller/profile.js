app.controller('ProfileController',
    function ($scope, ingredientFactory, categoriesFactory, userFactory, recipeFactory, UserSession,
        ingredientService, restrictionsService, recipeService, Profile, blockUI, $q, imgService,
        foodCategoriesPerUserFactory, MergeProfile) {

        $scope.categories = [];
        $scope.restrictions = loadRestrictions();
        $scope.updateRestrictions = updateRestrictions;
        $scope.addedPhoto = addedPhoto;
        $scope.addCategoryToUser = addCategoryToUser;
        $scope.removeCategoryOfUser = removeCategoryOfUser
        //$scope.profile.restrictions = ['Vegetariano']; // TODO: Load selected mock
        init();

        function init() {
            blockUI.start();
            categoriesFactory.query({}, function (categories) {
                $scope.categories = categories;
            });
            var username = { username: 'amodugno' };//esta info se obtiene luego de q el usuario este logueado
            var promises = {
                profile: userFactory.get(username).$promise,
                categories: categoriesFactory.query(username).$promise,
                recipes: recipeFactory.query(username).$promise
            };
            $q.all(promises).then(function (values) {
                setValues(values);
                blockUI.stop();
            });
        }

        function setValues(values) {
            $scope.profile = new Profile(values.profile.username, values.profile.email, values.profile.avatar, [], [], [], []);
            setRestrictions(values.profile);
            $scope.profile.categories = values.categories;
            $scope.profile.recipes = values.recipes;
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

        function loadRestrictions() {
            return restrictionsService.getRestrictions();
        }

        //save profile
        function updateRestrictions() {
            MergeProfile.mergeRestrictions($scope.profile);
            $scope.profile.id = $scope.profile.username;
            userFactory.update($scope.profile);
        }

        function setRestrictions(profile) {
            $scope.profile.restrictions.push({ name: 'Celiaco', hasRestriction: profile.celiac });
            $scope.profile.restrictions.push({ name: 'Vegano', hasRestriction: profile.vegan });
            $scope.profile.restrictions.push({ name: 'Vegetariano', hasRestriction: profile.vegetarian });
            $scope.profile.restrictions.push({ name: 'Diabetico', hasRestriction: profile.diabetic });
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
                console.log('relacion agregada');
            });
        }

        function removeCategoryOfUser(categoryTag) {
            var category = { food_category_id: categoryTag.id, username: $scope.profile.username }
            foodCategoriesPerUserFactory.remove(category, function () {
                console.log('relacion eliminada');
            })
        }
    }
);
