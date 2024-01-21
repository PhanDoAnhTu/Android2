import http_api from '../../http_axios';

function getNewProductAll(limit, page = 1) {
    return http_api.get('store_products/getNewProductAll/' + limit + '/' + page);
}
function getBestsallerProductAll(limit, page = 1) {
    return http_api.get('store_products/getBestsallerProductAll/' + limit + '/' + page);
}
function getProductByCategory(limit, page = 1,category_id) {
    return http_api.get('store_products/getProductByCategory/' + limit + '/' + page + '/' + category_id);
}

function product_detail(slug, other_product_limit, comment_limit) {
    return http_api.get('store_products/product_detail/' + slug + '/' + other_product_limit + '/' + comment_limit);
}
function ProductByCategory_filter(limit, page = 1,slug,filter=-1,brandid_price) {
    return http_api.post('store_products/ProductByCategory_filter/' + limit + '/' + page+ '/' + slug + '/' + filter,brandid_price);
}
function BestSallersProductAll_filter(limit,page,data){
    return http_api.post('store_products/BestSallersProductAll_filter/'+limit+'/'+page,data);

}
function NewProductAll_filter(limit,page,data){
    return http_api.post('store_products/NewProductAll_filter/'+limit+'/'+page,data);

}
const store_products_service = {
    getNewProductAll: getNewProductAll,
    getBestsallerProductAll:getBestsallerProductAll,
    getProductByCategory:getProductByCategory,
    product_detail: product_detail,
    ProductByCategory_filter: ProductByCategory_filter,
    BestSallersProductAll_filter:BestSallersProductAll_filter,
    NewProductAll_filter:NewProductAll_filter,

}
export default store_products_service;