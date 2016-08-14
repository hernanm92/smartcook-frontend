var Registration = function () {

    return {
        
        //Registration Form
        initRegistration: function () {
	        // Validation       
	        $("#userForm").validate({
	            // Rules for form validation
	            rules:
	            {
	                username:
	                {
	                    required: true
	                },
	                email:
	                {
	                    required: true,
	                    email: true
	                },
	                password:
	                {
	                    required: true,
	                    minlength: 3,
	                    maxlength: 20
	                },
	                passwordConfirm:
	                {
	                    required: true,
	                    minlength: 3,
	                    maxlength: 20,
	                    equalTo: '#password'
	                },
	                firstname:
	                {
	                    required: true
	                },
	                lastname:
	                {
	                    required: true
	                },
	                terms:
	                {
	                    required: true
	                }
	            },
	            
	            // Messages for form validation
	            messages:
	            {
	                login:
	                {
	                    required: 'Please enter your login'
	                },
	                email:
	                {
	                    required: 'Por favor escriba una direccion de email',
	                    email: 'Por favor escriba una direccion de email valida'
	                },
	                password:
	                {
	                    required: 'Por favor ingrese su contraseña'
	                },
	                passwordConfirm:
	                {
	                    required: 'Por favor ingrese la contraseña una vez mas',
	                    equalTo: 'La contraseñas no coinciden'
	                },
	                firstname:
	                {
	                    required: 'Por favor ingrese su primer nombre'
	                },
	                lastname:
	                {
	                    required: 'Por favor ingrese su apellido'
	                },
	                terms:
	                {
	                    required: 'You must agree with Terms and Conditions'
	                }
	            },                  
	            
	            // Do not change code below
	            errorPlacement: function(error, element)
	            {
	                error.insertAfter(element.parent());
	            }
	        });
        }

    };
}();