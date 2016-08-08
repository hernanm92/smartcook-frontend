app.controller('baseRecipeController', function ($scope) {
    $scope.addToFavorites = addToFavorites;

    function addToFavorites() {

    }

    $scope.steps = [
        { name: "Para hacer la receta emplearemos tomate frito, que puede ser casero o comprado en el supermercado, así que si vas a utilizarlo casero debes tenerlo ya preparado a la hora de hacer esta receta de canelones. Para mayor comodidad o si tienes poco tiempo para cocinar, puedes emplear uno comprado, los de buena marca dan buen resultado y dan sabor al plato. Y empezamos a preparar el resto de ingredientes para nuestra receta, así que vamos a pelar la cebolla y los dientes de ajo, para picarlos posteriormente en trozos no demasiado grandes. " },
        { name: "Esta es una de las formas más tradicionales de preparar unos canelones en casa, ya que los canelones de carne son una de las recetas más conocidas de la gastronomía italiana, y uno de los rellenos más empleados para hacer este plato. Podemos emplear carne picada de cerdo, de ternera, pollo o cualquier otra que nos guste, incluso una mezcla de las mismas para rellenar los canelones. Nosotros vamos a emplear en esta receta carne picada mixta, mitad de ternera y mitad de cerdo, que queda muy sabrosa y jugosa. " }];
    $scope.tips = [
        {
            description: "La receta de canelones, es una de las recetas de pasta más famosas que existen. Es una receta que proviene de Italia, pero que cada vez se ha ido extendiendo más a nuestro país y en el resto del mundo. "
        }, {
            description: "Os animamos a que probeis cuantas más mejor, seguro que algunas os sorprenderán por ser recetas realmente sabrosas y que merece la pena preparar y disfrutar de ellas. Esperamos que os gusten."
        }];
});