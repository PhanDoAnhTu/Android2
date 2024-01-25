import http_api from '../../http_axios'

function getAll(){
    return http_api.get('slider/index');
}

function getById(id){
    return http_api.get('slider/show/'+id);

}
function create(slider){
    return http_api.post('slider/store',slider);
}
function update(slider,id){
    return http_api.post('slider/update/'+id,slider);

}
function remove(id){
    return http_api.delete('slider/destroy/'+id);

}

function getSliderByPosition(position){
    return http_api.get('slider/slider_list/'+position);

}

const slider_service = {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
    getSliderByPosition:getSliderByPosition
}
export default slider_service;