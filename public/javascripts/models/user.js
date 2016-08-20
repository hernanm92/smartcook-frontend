(function () {
    angular.module('MainApp').
    factory('User',UserFactory);

    function UserFactory() {
        function User(firstName,lastName,gender,dateOfBirth,userName,email,password) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.dateOfBirth = dateOfBirth;
            this.userName = userName;
            this.email = email;
            this.password = password;
        }
        return User;
    }
})();
