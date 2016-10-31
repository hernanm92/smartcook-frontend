angular
    .module('MainApp')
    .service('query', query);

function query() {
    var self = this;
    self.exists = exists;

    function exists(array, property, textToSearch) {
        if (textToSearch === undefined || textToSearch === '' || textToSearch === null) {
            return false;
        }
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (read_prop(element, property).toLowerCase() === textToSearch.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    function read_prop(obj, prop) {
        return obj[prop];
    }
}