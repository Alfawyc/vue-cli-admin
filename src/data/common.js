export function checkRegex(value , type){
    switch(type){
        case 'mobile':
            let regex = /^1[3456789]\d{9}$/;
            if(value && !regex.test(value)){
                return false;
            }
            break;
        case 'email':
            let email_regex = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
            if(value && !email_regex.test(value)){
                return false;
            }
            break;
        case 'number':
            let number_regex = /^[0-9]*[1-9][0-9]*$/;
            if(value && !number_regex.test(value)){
                return false;
            }
            break;
        default:
            return true;
    }
    return true;
}