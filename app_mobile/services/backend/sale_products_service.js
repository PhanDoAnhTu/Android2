import http_api from '../../http_axios'

function getAllSaleProduct() {
    return http_api.get('sale_products_admin/getAllSaleProduct');
}
function remove_sale_product($id) {
    return http_api.get('sale_products_admin/remove_sale_product/' + $id);
}
function getAll_SaleId(){
    return http_api.get('sale_products_admin/getAll_SaleId');
}
function add_SaleProduct($data){
    return http_api.post('sale_products_admin/add_SaleProduct',$data);
}
function restore_sale_product($id) {
    return http_api.get('sale_products_admin/restore_sale_product/' + $id);
}
const sale_products_service = {
    getAllSaleProduct:getAllSaleProduct,
    getAll_SaleId:getAll_SaleId,
    remove_sale_product:remove_sale_product,
    add_SaleProduct:add_SaleProduct,
    restore_sale_product:restore_sale_product
}
export default sale_products_service;