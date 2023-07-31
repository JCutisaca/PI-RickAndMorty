const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexNumber = /\d/;
const errors = {};

const validation = (userData) => {
    if(!regexEmail.test(userData.email)) {
    errors.email = 'El email ingresado no es valido';
    }
    if(!userData.email) {
        errors.email = 'El nombre de usuario no puede estar vacio';
    }
    if(userData.email.length > 35) {
        errors.email = 'El email no puede tener mas de 35 caracteres'
    }
    return errors;
}

const validationPass = (userData) => {
    if(userData.password.length < 6 || userData.password.length > 1) {
        errors.password = 'La contraseña tiene que tener entre 6 y 10 caracteres' 
    }
    if(!regexNumber.test(userData.password)) {
        errors.password = 'La contraseña tiene que tener al menos un numero'
    }
    return errors;
}

export {validation, validationPass};