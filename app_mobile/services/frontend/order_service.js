import http_api from '../../http_axios'

function getOrder_ByCustomer(user_id){
    return http_api.get('order/getOrder_ByCustomer/'+user_id);
}
function checkout(order){
    return http_api.post('order/checkout',order);
}
function updateStatusOrder(order_id){
    return http_api.get('order/updateStatusOrder/'+order_id);
}
function add_order_export(order_export){
    return http_api.post('export/add_order_export',order_export);
}
const order_service = {
    add_order_export:add_order_export,
    getOrder_ByCustomer:getOrder_ByCustomer,
    checkout:checkout,
    updateStatusOrder:updateStatusOrder,
}
export default order_service;