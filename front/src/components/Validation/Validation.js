const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexNumber = /\d/;
const errors = {};

const validation = (userData) => {
    if (!regexEmail.test(userData.email)) {
        errors.email = 'The entered email is not valid';
    }
    if (!userData.email) {
        errors.email = 'Username cannot be empty';
    }
    if (userData.email.length > 35) {
        errors.email = 'Email cannot exceed 35 characters'
    }
    return errors;
}

const validationPass = (userData) => {
    if (userData.password.length < 6 || userData.password.length > 1) {
        errors.password = 'Password must be between 6 and 10 characters'
    }
    if (!regexNumber.test(userData.password)) {
        errors.password = 'Password must contain at least one number'
    }
    return errors;
}

export { validation, validationPass };