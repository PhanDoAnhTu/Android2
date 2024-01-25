import http_api from '../../http_axios'

function getAll(){
    return http_api.get('post/index');
}

function getById(id){
    return http_api.get('post/show/'+id);

}
function create(post){
    return http_api.post('post/store',post);
}
function update(post,id){
    return http_api.post('post/update/'+id,post);

}
function remove(id){
    return http_api.delete('post/destroy/'+id);

}
function getpost_byTopic(limit,topicId){
    return http_api.get('post/post_byTopic/'+limit+'/'+topicId);

}
function get_postBySlug_postOther(slug){
    return http_api.get('post/post_detail/'+slug);

}


const post_service = {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
    getpost_byTopic:getpost_byTopic,
    get_postBySlug_postOther:get_postBySlug_postOther
}
export default post_service;