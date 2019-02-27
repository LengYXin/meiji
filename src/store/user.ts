import { observable } from 'mobx';
import { WXRequest } from './native/request'
import Taro from '@tarojs/taro';
class UserMobx {

    constructor() {
        // this.onAuth()
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
        "id": "",
        "access_token": "",
        "expires_in": 0,
        "token_type": "",
        "refresh_token": "",
        "registered": 0
    }
    onSetAuto(auto) {
        this.AutoData = auto;
        // 设置 token
        WXRequest.setToken(this.AutoData.token_type + ' ' + this.AutoData.access_token);
        // 进入首页
        Taro.switchTab({ url: "/pages/home/index" })
    }
    /**
     * 认证
     */
    async onAuth() {
        Taro.showLoading({ title: "加载中...", mask: true })
        const mpAuthCode = await Taro.login().then(x => x.code);
        const data = await WXRequest.request({ url: "/api/v1/Auth/WxLogin", data: { mpAuthCode }, method: "POST" });
        Taro.hideLoading()
        if (data.isSuccess) {
            this.onSetAuto(data.data)
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
            const data = await WXRequest.request({
                url: "/api/v1/Auth/Login",
                data: {
                    ...param,
                    mpAuthCode,
                },
                method: "POST"
            });
            if (data.isSuccess) {
                this.onSetAuto(data.data)
            }
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
    /**
     * 购买会员
     * @param vipType 
     */
    async onPayVip(vipType: 1 | 2 | 3 = 1) {
        try {
            Taro.showLoading({ title: "", mask: true })
            const res = await WXRequest.request({
                url: "/api/v1/Vip",
                data: {
                    vipType,
                },
                method: "POST"
            })
            const payRes = await Taro.requestPayment({
                ...res.data
            })
            Taro.hideLoading()
            Taro.showToast({ title: "支付成功" })
        } catch (error) {
            Taro.hideLoading()
            if (error.errMsg == 'requestPayment:fail cancel') {
                return Taro.showToast({ title: "支付已取消", icon: "none" })
            }
            Taro.showToast({ title: "支付失败", icon: "none" })
        }


    }
}
export const User = new UserMobx();