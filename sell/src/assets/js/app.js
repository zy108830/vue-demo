import swal from 'sweetalert';
export default class App{
    static userLogin(link, modalType){
        try{
            xinchao_app.userLogin(link, modalType);
        }catch (e){
            swal({
                text:'此版本不支持跳转登录，请将客户端升级到最新版本',
                button:'我知道啦'
            })
        }
    }

    static pay(pay_para){
        try {
            xinchao_app.pay(pay_para);
        } catch (e) {
            swal({
                text:'此版本不支持客户端支付，请将客户端升级到最新版本',
                button:'我知道啦'
            })
        }
    }
}