import http_api from '../../http_axios'

function getInfo(){
    return http_api.get('info/company_info/1');
}
 
function update(info,id=1){
    return http_api.post('info/update/'+id,info);

}


const info_service = {
    getInfo: getInfo,
    update: update

}
export default info_service;