import http_api from '../../http_axios'

function getAll(){
    return http_api.get('orderdetail/index');
}

function getById(id){
    return http_api.get('orderdetail/show/'+id);

}
function create(orderdetail){
    return http_api.post('orderdetail/store',orderdetail);
}
function update(orderdetail,id){
    return http_api.post('orderdetail/update/'+id,orderdetail);

}
function remove(id){
    return http_api.delete('orderdetail/destroy/'+id);
    
}

const orderdetail_service = {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
    
}
export default orderdetail_service;