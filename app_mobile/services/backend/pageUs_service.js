import http_api from '../../http_axios'

function getAll(){
    return http_api.get('page_us/index');
}

function getById(id){
    return http_api.get('page_us/show/'+id);

}
function create(page){
    return http_api.post('page_us/store',page);
}
function update(page,id){
    return http_api.post('page_us/update/'+id,page);

}
function remove(id){
    return http_api.delete('page_us/destroy/'+id);

}
function get_BySlug(slug){
    return http_api.get('page_us/get_BySlug/'+slug);

}

const pageUs_service = {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
    get_BySlug:get_BySlug
}
export default pageUs_service;