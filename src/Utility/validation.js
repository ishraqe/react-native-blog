const validate = (val, rules) => {

    let isValid = true;

    for (let rule in rules ) {
        console.log(rule);
        switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(val);
                break;
            case 'minLength' : 
                isValid = isValid && passwordValidator(val, rules[rule]);
                break;
            case 'lastName' : 

                isValid = isValid && fullnameValidator(val);
                console.log(fullnameValidator(val));
                
                break;
            default:
                isValid= true;
        }
    } 

    return isValid;
};

const emailValidator = (val) => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
}

const passwordValidator = (val, minLength) => {
    return val.length >= minLength;
}

const fullnameValidator = (val) => {
    console.log(val);

    return val.substring(val.split(' ')[0].length).trim().length > 0;   
}

export default validate;