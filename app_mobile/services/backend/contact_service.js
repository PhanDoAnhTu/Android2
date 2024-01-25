import http_api from '../../http_axios'

function getAll(){
    return http_api.get('contact/index');
}

function getById(id){
    return http_api.get('contact/show/'+id);

}
function create(contact){
    return http_api.post('contact/store',contact);
}
function update(contact,id){
    return http_api.post('contact/update/'+id,contact);

}
function remove(id){
    return http_api.delete('contact/destroy/'+id);

}

const contact_service = {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove
}
export default contact_service;