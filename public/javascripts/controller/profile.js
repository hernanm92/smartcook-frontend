app.controller('ProfileController',
    function ($scope, ingredientFactory, categoriesFactory, userFactory, UserSession,
        ingredientService, restrictionsService, blockUI, imgService, foodCategoriesPerUserFactory,
        badgeFactory, badgePerUserFactory, ingredientPerUserFactory, $routeParams, $modal, mapperService) {

        $scope.categories = [];
        $scope.badges = [];
        $scope.updateRestrictions = updateRestrictions;
        $scope.addedPhoto = addedPhoto;
        $scope.addCategoryToUser = addCategoryToUser;
        $scope.removeCategoryOfUser = removeCategoryOfUser;
        $scope.upload = upload;
        $scope.addIngredientToUser = addIngredientToUser;
        $scope.removeIngredientOfUser = removeIngredientOfUser;
        $scope.disable = disable;
        init();


        function init() {
            blockUI.start();
            var username = $routeParams.username;
            categoriesFactory.query({}, function (categories) {
                $scope.categories = categories;
            });

            UserSession.getEntireProfile($routeParams.username).then(function name(values) {
                $scope.profile = mapperService.mapProfileToModel(values.profile, values.categoriesUser, values.recipes, values.ingredients);
                $scope.birthdate = toDate($scope.profile.birthdate);
                if ($scope.profile.avatar == undefined) $scope.profile.avatar = 'assets/img/newLogo.jpg';
                blockUI.stop();
            });

            badgePerUserFactory.query({ username: UserSession.getUsername() }).$promise.then(function (userBadges) {
                for (var i = 0; i < userBadges.length; i++)
                    badgeFactory.get({ id: userBadges[i].badge_id }).$promise.then(function (badge) {
                        $scope.badges.push(badge);
                    });
            });
        }

        function refresh() {
            UserSession.setProfile($scope.profile);
        }

        function disable() {
            var message = '¡¿Desea cerrar su cuenta de Smartcook?!'
            var title = '';
            openModal(message, title).result.then(function () {
                $scope.profile.id = $scope.profile.username;
                $scope.profile.enabled = false;
                userFactory.update($scope.profile, function (res) {
                    UserSession.logout();
                })
            });

        };

        function openModal(message, title) {
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
                        return title;
                    }
                },
                windowClass: 'menu-bar-space'
            });
        };

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
                return category.name.toLowerCase().indexOf(query.toLowerCase()) != -1 && category.name.toLowerCase() != 'otros';
            });
        };

        $scope.loadExcludedIngredients = function (query) {
            return ingredientService.getIngredientsBy(query);
        };

        //save profile
        function updateRestrictions() {
            $scope.profile.id = $scope.profile.username;
            userFactory.update($scope.profile);
            refresh();
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
                refresh();
            });
        }

        function removeCategoryOfUser(categoryTag) {
            var category = { food_category_id: categoryTag.id, username: $scope.profile.username }
            foodCategoriesPerUserFactory.remove(category, function () {
                refresh();
            })
        }

        function addIngredientToUser(ingredientTag) {
            var ingredient = { ingredient_id: ingredientTag.id, username: $scope.profile.username, excluded: true }
            ingredientPerUserFactory.save(ingredient, function (response) {
                refresh();
            });
        }

        function removeIngredientOfUser(ingredientTag) {
            var ingredient = { ingredient_id: ingredientTag.id, username: $scope.profile.username }
            ingredientPerUserFactory.remove(ingredient, function () {
                refresh();
            })
        }

        function toDate(paramDate) {
            var date = new Date(paramDate);
            var year = date.getFullYear();
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return day + '/' + month + '/' + year;
        }

        function upload() {
            // for(var i = 0; i < badges.length; i++) badgePerUserFactory.save(badges[i]);
        }

        $scope.getDetailsRecipe = function getDetailsRecipe(id) {
            $location.path('/recipe/' + id + '/detail');
        }
    }
);
