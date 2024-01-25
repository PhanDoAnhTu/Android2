import http_api from '../../http_axios'

function getAllBrand(){
    return http_api.get('brand/getAllBrand');
}
function getAllBrand_InTrash(){
    return http_api.get('brand/getAllBrand_InTrash');
}
function getBrandById(id){
    return http_api.get('brand/getBrandById/'+id);

}
function add_brand(brand){
    return http_api.post('brand/add_brand',brand);
}
function update_brand(id,brand){
    return http_api.post('brand/update_brand/'+id,brand);

}
function destroy_brand(id){
    return http_api.get('brand/destroy_brand/'+id);

}
function getBrandBySlug(slug){
    return http_api.get('brand/getBrandBySlug/'+slug);

}



const brand_service = {
    getAllBrand_InTrash:getAllBrand_InTrash,
    getAllBrand: getAllBrand,
    getBrandById: getBrandById,
    add_brand: add_brand,
    update_brand: update_brand,
    destroy_brand: destroy_brand,
    getBrandBySlug:getBrandBySlug
}
export default brand_service;