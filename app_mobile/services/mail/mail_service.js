import http_api from '../../http_axios'

function send_mail(data){
    return http_api.post('send_mail',data);
}
function mail_alert_register(data){
    return http_api.post('mail_alert_register',data);
}

const mail_service = {
    send_mail:send_mail,
    mail_alert_register:mail_alert_register,
}
export default mail_service;