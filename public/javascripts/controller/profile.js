app.controller('ProfileController',
    function ($scope, ingredientFactory, categoriesFactory, userFactory, recipeFactory, UserSession,
        ingredientService, restrictionsService, recipeService, Profile, blockUI, $q, imgService,
        foodCategoriesPerUserFactory) {

        $scope.categories = [];
        $scope.restrictions = loadRestrictions();
        $scope.save = save;
        $scope.addedPhoto = addedPhoto;
        //$scope.profile.restrictions = ['Vegetariano']; // TODO: Load selected mock
        init();
        var myrecipes = [
            {
                photo: 'img/chicken-potatoe.jpg',
                name: 'Chicken Potatoe',
                id: 1
            },
            {
                photo: 'img/chicken-potatoe.jpg',
                name: 'Chicken Potatoe',
                id: 1
            },
            {
                photo: 'img/chicken-potatoe.jpg',
                name: 'Chicken Potatoe',
                id: 1
            },
            {
                photo: 'img/chicken-potatoe.jpg',
                name: 'Chicken Potatoe',
                id: 1
            }
        ];

        function init() {
            blockUI.start();

            categoriesFactory.query({}, function (categories) {
                $scope.categories = categories;
            });
            //traer datos de usuario
            //traer categorias del usuario
            //traer recetas del usuario
            var username = { username: 'matileon' };
            var promises = {
                profile: userFactory.get(username).$promise,
                categories: categoriesFactory.query(username).$promise,
                recipes: recipeFactory.query(username).$promise
            }

            $q.all(promises).then(function (values) {
                console.log(values);
                setValues(values);
                blockUI.stop();
            });

        }

        function setValues(values) {
            $scope.profile = new Profile(values.profile.username, values.profile.email, values.profile.avatar, [], [], [], []);
            setRestrictions(values.profile);
            $scope.profile.categories = values.categories;
            $scope.profile.recipes = myrecipes;//aca va values.recipe
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

        //username, mail, image_url, recipes, categories, ingredients
        function loadUser() {
            //aca traer datos del usuario logueado, el UserSession busca a matileon siempre.
            //cuando funcione el login, cambiarlo 

        }

        //save profile
        function save() {
            //guardar ediciones de la vista
            //guardar categorias
            //guardar ings q no l gusta
            //url de la imagen
            blockUI.start();
            var imgUrl = imgService.getUrlImgProfile($scope.profile.username);
            var promises = {
                imageProfileAzure: imgService.uploadImgProfile($scope.profile.username,$scope.userImage),
                updateProfile: userFactory.update($scope.profile),
                foodCategories: foodCategoriesPerUserFactory.save().$promise
            };

            $q.all(promises).then(function (values) {
                blockUI.stop();
                console.log('Perifl guardado');
            }); 
        }

        function setRestrictions(profile) {
            $scope.profile.restrictions.push({name:'Celiaco', hasRestriction: profile.celiac});
            $scope.profile.restrictions.push({name:'Vegano', hasRestriction: profile.vegan});
            $scope.profile.restrictions.push({name:'Vegetariano', hasRestriction: profile.vegetarian});
            $scope.profile.restrictions.push({name:'Diabetico', hasRestriction: profile.diabetic});
        }

        function addedPhoto(flowObject, event, flow) {
            flow.files = []; //borro todo lo anterior. Luego se agrega el file
            $scope.userImage = flowObject.file;
        }
    }
);
