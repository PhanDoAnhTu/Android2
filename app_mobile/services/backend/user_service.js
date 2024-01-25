import http_api from '../../http_axios'


function login_admin(user){
    return http_api.post('user/login_admin',user);

}
function check_email(email){
    return http_api.post('user/check_email_admin',email);
}
function reset_password(data){
    return http_api.put('user/reset_password_admin',data);

}

function getAll(){
    return http_api.get('user/index');
}
function get_customer(){
    return http_api.get('user/get_customer');
}

function getById(id){
    return http_api.get('user/show/'+id);

}

function create(user){
    return http_api.post('user/store',user);
}
function update(user,id){
    return http_api.post('user/update/'+id,user);

}
function remove(id){
    return http_api.delete('user/destroy/'+id);

}

const user_service = {
    login_admin: login_admin,
    check_email:check_email,
    reset_password:reset_password,
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
    get_customer:get_customer
    
}
export default user_service;