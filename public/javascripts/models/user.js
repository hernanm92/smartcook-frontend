(function () {
    angular.module('MainApp').
        factory('User', UserFactory);

    function UserFactory() {
        function User(name, lastName, gender, birthdate, username, email, password) {
            this.name = name;
            this.lastName = lastName;
            this.gender = gender;
            this.birthdate = birthdate;
            this.username = username;
            this.email = email;
            this.password = password;
        }
        return User;
    }
})();
