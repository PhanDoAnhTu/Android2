import http_api from '../../http_axios';

function login_customer(user){
    return http_api.post('user/login_customer',user);
}
function check_email(email){
    return http_api.post('user/check_email',email);
}
function get_CustomerById(user_id){
    return http_api.get('user/get_CustomerById/'+user_id);
}

function reset_password(data){
    return http_api.put('user/reset_password',data);

}
function register_customer(user){
    return http_api.post('user/register_customer',user);
}

const user_service = {
    register_customer: register_customer,
    login_customer: login_customer,
    check_email: check_email,
    reset_password: reset_password,
    get_CustomerById:get_CustomerById
}
export default user_service;