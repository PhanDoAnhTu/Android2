import http_api from '../../http_axios'

function getAll(){
    return http_api.get('topic/index');
}
function get_byPage(page,limit){
    return http_api.get('topic/get_byPage/'+page+'/'+limit);
}

function getById(id){
    return http_api.get('topic/show/'+id);

}
function create(topic){
    return http_api.post('topic/store',topic);
}
function update(topic,id){
    return http_api.post('topic/update/'+id,topic);

}
function remove(id){
    return http_api.delete('topic/destroy/'+id);

}
function getBySlug(slug){
    return http_api.get('topic/getBySlug/'+slug);

}

const topic_service = {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
    getBySlug:getBySlug,
    get_byPage:get_byPage
}
export default topic_service;