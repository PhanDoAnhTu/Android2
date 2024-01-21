import http_api from '../../http_axios';

function getAllCategory(){
    return http_api.get('category/getAllCategory');
}

function get_CategoryByParentId(parent_id){
    return http_api.get('category/category_list/'+parent_id);

}
function getBySlug(slug){
    return http_api.get('category/getBySlug/'+slug);

}
function GetCategorieByParent(){
    return http_api.get('category/GetCategorieByParent');

}

const category_service = {
    getAllCategory: getAllCategory,
    get_CategoryByParentId:get_CategoryByParentId,
    getBySlug:getBySlug,
    GetCategorieByParent:GetCategorieByParent,
}
export default category_service;