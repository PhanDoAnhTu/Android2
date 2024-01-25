import http_api from '../../http_axios'

function getAll(){
    return http_api.get('product/index');
}

function getById(id){
    return http_api.get('product/show/'+id);

}
function create(product){
    return http_api.post('product/store',product);
}
function update(product,id){
    return http_api.post('product/update/'+id,product);

}
function remove(id){
    return http_api.delete('product/destroy/'+id);

}

function get_ProductAll(limit,page=1){
    return http_api.get('product/product_all/'+limit+'/'+page);
}
function get_ProductHome(limit,category_id){
    return http_api.get('product/product_home/'+limit+'/'+category_id);
}

function getProduct_byCategory(limit,category_id){
    return http_api.get('product/product_category/'+limit+'/'+category_id);
}
function getProduct_byBrand(limit,category_id){
    return http_api.get('product/product_brand/'+limit+'/'+category_id);
}

function get_ProductBySlug(slug){
    return http_api.get('product/product_detail/'+slug);
}



const product_service = {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    remove: remove,
    get_ProductAll:get_ProductAll,
    get_ProductBySlug:get_ProductBySlug,
    get_ProductHome:get_ProductHome,
    getProduct_byCategory:getProduct_byCategory,
    getProduct_byBrand:getProduct_byBrand
}
export default product_service;