import { observable } from 'mobx';
import { WXRequest } from './native/request'
import Taro from '@tarojs/taro';
class UserMobx {

    constructor() {
        this.onAuth()
    }
    /**https://meiji.alienwow.cc/swagger/index.html
     * 用户信息
     */
    @observable Info = {

    }
    /**
     * 认证数据
     */
    AutoData = {
        "id": "string",
        "access_token": "string",
        "expires_in": 0,
        "token_type": "string",
        "refresh_token": "string",
        "registered": 0
    }
    /**
     * 认证
     */
    async onAuth() {
        Taro.showLoading({ title: "加载中..." })
        const mpAuthCode = await Taro.login().then(x => x.code);
        const data = await WXRequest.request({ url: "/api/v1/Auth/WxLogin", data: { mpAuthCode }, method: "POST" });
        Taro.hideLoading()
        if (data.isSuccess) {
            this.AutoData = data.data;
            // 设置 token
            WXRequest.setToken(this.AutoData.token_type + ' ' + this.AutoData.access_token);
            Taro.switchTab({ url: "/pages/home/index" })
            // this.AutoData = {
            //     "id": "a7cb4ad9-9f1b-4e63-8511-d61081a1a2b7",
            //     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3Y2I0YWQ5LTlmMWItNGU2My04NTExLWQ2MTA4MWExYTJiNyIsImV4cCI6MTU1MTIwMjg4MiwiaXNzIjoiaHR0cDovLzExOC4xNzguMTMyLjI0OTo3Nzc5IiwiYXVkIjoiaHR0cDovLzExOC4xNzguMTMyLjI0OTo3Nzc5In0.7QJXYJTZ14gQdZ9AN2d3g6qGFV-N35gc6M3GsPZawd8",
            //     "expires_in": 3600,
            //     "token_type": "Bearer",
            //     "refresh_token": "575097cd422e476aa59cec284fd8ba50",
            //     "registered": 0
            // }//data.data;
        }
    }
    /**
     * 登陆
     * @param param 
     */
    async  onLogin(param: { phone: string, loginValidateCode: string }) {
        Taro.showLoading({ title: "", mask: true })
        const mpAuthCode = await Taro.login().then(x => x.code);
        //  注册
        if (this.AutoData.registered == 0) {
            WXRequest.request({
                url: "/api/v1/Auth/Login",
                data: {
                    ...param,
                    mpAuthCode,
                },
                method: "POST"
            })
        }

        Taro.hideLoading();
    }
    /**
     * 发送验证码
     * @param phone 
     */
    async onSendCode(phone: string) {
        const res = await WXRequest.request({
            url: "/api/v1/ValidateCode",
            data: {
                "phone": phone,
                "validateCodeType": "login"
            },
            method: "POST"
        })
        return res.isSuccess
    }
    async onTest() {
        try {
            Taro.showLoading({ title: "", mask: true })
            const res = await WXRequest.request({
                url: "/api/v1/Vip",
                data: {
                    vipType: 1,
                },
                method: "POST"
            })
            const payRes = await Taro.requestPayment({
                ...res.data
            })
            Taro.hideLoading()
            Taro.showToast({ title: "支付成功" })
            console.log(payRes)
        } catch (error) {
            Taro.hideLoading()
            Taro.showToast({ title: "支付失败" })
            console.log(error)
        }


    }
}
export const User = new UserMobx();