import Taro from '@tarojs/taro';
import { observable, runInAction } from 'mobx';
import { WXRequest } from './native/request';
import { Products } from './products'
class UserMobx {

    constructor() {
        // this.onAuth()
    }
    /**https://meiji.alienwow.cc/swagger/index.html
     * 用户信息
     */
    @observable Info = {
        avatarUrl: '',
        nickName: '',
        gender: 0,
        vipType: '',
        vipExpireTime: 0
    }
    // 微信授权
    WxAuto = false;
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
    /**
     * 设置认证信息
     * @param auto 
     */
    onSetAuto(auto) {
        this.AutoData = auto;
        // 设置 token
        WXRequest.setToken(this.AutoData.token_type + ' ' + this.AutoData.access_token);
        // Products.onTest()
        // 进入首页
        Taro.switchTab({ url: "/pages/sale/index" });
        // Taro.navigateTo({ url: "/pages/register/Invitation/index" })
    }
    /**
     * 认证
     */
    async onAuth() {
        Taro.showLoading({ title: "加载中...", mask: true });
        try {
            const getUserInfo = Taro.getUserInfo();
            const login = Taro.login();
            // 获取微信用户信息
            const WxAuto = await getUserInfo.then(x => JSON.parse(x.rawData));
            // 获取微信 code
            const mpAuthCode = await login.then(x => x.code);
            // 登录
            const data = await WXRequest.request({ url: "/api/v1/Auth/WxLogin", data: { mpAuthCode }, method: "POST" });
            let UserInfo = {}
            if (data.isSuccess) {
                this.onSetAuto(data.data);
                //  设置用户信息
                UserInfo = await WXRequest.request({
                    url: "/api/v1/Accounts/userInfo", data: {
                        header: WxAuto.avatarUrl,
                        nickName: WxAuto.nickName,
                        gender: WxAuto.gender
                    }, method: "PUT"
                }).then(x => x.code == 200 && x.data);

            }
            runInAction(() => {
                this.Info = { ...WxAuto, ...UserInfo }// WxAuto
            })
        } catch (error) {
            console.log(error)
        } finally {
            Taro.hideLoading()
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
        // if (this.AutoData.registered == 0) {
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
        // }
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
