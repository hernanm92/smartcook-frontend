angular
    .module('MainApp')
    .service('ingredientService', ingredientService);

function ingredientService(ingredientFactory, $interval, $modal, blockUI) {
    var self = this;
    self.ingredients = [];
    self.getIngredientsBy = getIngredientsBy;
    self.refresh = refresh;
    self.getIngredients = getIngredients;
    self.getDetail = getDetail;

    init();
    refresh();

    function init() {
        blockUI.start();
        ingredientFactory.query({}, function (ings) {
            blockUI.stop();
            self.ingredients = ings;
        })
    }

    function getDetail(id) {
        blockUI.start();
        template = '/general/modals/ingredient';
        controller = 'IngredientModalController';
        return ingredientFactory.get({ id: id }, function (ing) {
            blockUI.stop();
            openModal(ing, template, controller)
        })
    }

    function getIngredientsBy(query) {
        return self.ingredients.filter(function (ing) {
            return ing.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
        });
    }

    function refresh() {
        $interval(ingredientFactory.query({}, function (ings) {
            self.ingredients = ings;
        }), 20000);
    }

    function getIngredients() {
        return self.ingredients;
    }

    function openModal(item, template, controller) {
        return $modal.open({
            animation: true,
            templateUrl: template,
            controller: controller,
            size: 'md',
            resolve: {
                item: function () {
                    return item;
                }
            },
            windowClass: 'menu-bar-space'
        });
    };
}