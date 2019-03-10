import Taro from '@tarojs/taro';
import fill from 'lodash/fill';
import { computed, observable, runInAction } from 'mobx';
import { Address } from './address';
import { WXRequest } from './native/request';
import { DateFormat } from './Regular'
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
        phone: '',
        vipExpireTime: 0,
        vipExpireTimeStr: '',
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
     * 隐藏手机号
     */
    @computed
    public get HidePhone() {
        return fill(this.Info.phone.split(''), "*", 3, 7).join('')
    }
    /**
     * 设置认证信息
     * @param auto 
     */
    onSetAuto(auto) {
        this.AutoData = auto;
        // 设置 token
        WXRequest.setToken(this.AutoData.token_type + ' ' + this.AutoData.access_token);
    }
    onNavigate() {
        if (this.AutoData.token_type) {
            if (this.Info.vipType === "nonVip") {
                return Taro.navigateTo({ url: "/pages/register/Invitation/index" })
            } else {
                Address.dataSource.getPagingData()
                Taro.switchTab({ url: "/pages/home/index" });
            }
        }
    }
    /**
     * 认证
     */
    async onAuth() {
        if (this.AutoData.token_type) {
            return this.onNavigate()
        }
        Taro.showLoading({ title: "加载中...", mask: true });
        try {
            // 获取微信 code
            const mpAuthCode = await Taro.login().then(x => x.code);
            // 登录
            const data = await WXRequest.request({ url: "/api/v1/Auth/WxLogin", data: { mpAuthCode }, method: "POST" });
            if (data.isSuccess) {
                this.onSetAuto(data.data);
                await this.onGetUserInfo();
            } else {
                // Taro.showToast({ title: data.msg, icon: "none" })
            }
        } catch (error) {
            console.log(error)
        } finally {
            Taro.hideLoading()
        }
    }
    /**
     * 获取用户信息
     */
    async onGetUserInfo() {
        // 获取微信用户信息
        const WxAuto = await Taro.getUserInfo().then(x => JSON.parse(x.rawData));
        //  设置用户信息
        const UserInfo = await WXRequest.request({
            url: "/api/v1/Accounts/userInfo", data: {
                header: WxAuto.avatarUrl,
                nickName: WxAuto.nickName,
                gender: WxAuto.gender
            }, method: "PUT"
        }).then(x => x.code == 200 && x.data);
        runInAction(() => {
            const info = { ...WxAuto, ...UserInfo };
            info.vipExpireTimeStr = DateFormat(info.vipExpireTime, "yyyy.MM.dd")
            this.Info = info// WxAuto
        })
        this.onNavigate()
        return this.Info;
    }
    /**
     * 登陆
     * @param param 
     */
    async  onLogin(param: { phone: string, loginValidateCode: string }) {
        Taro.showLoading({ title: "加载中...", mask: true })
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
        Taro.hideLoading();
        if (data.isSuccess) {
            await this.onAuth()
            // this.onSetAuto(data.data)
        } else {
            Taro.showToast({ title: data.msg, icon: "none" })
        }
        // }
    }
    /**
     * 发送验证码
     * @param phone 
     */
    async onSendCode(phone: string, validateCodeType: "login" | "register" | "verification" | "changePhone" = "login") {
        Taro.showLoading({ title: "加载中...", mask: true })
        const res = await WXRequest.request({
            url: "/api/v1/ValidateCode",
            data: {
                "phone": phone,
                "validateCodeType": validateCodeType
            },
            method: "POST"
        }, true)
        Taro.hideLoading()
        if (res.isSuccess) {
            Taro.showToast({ title: "发送成功，请注意查收", icon: "none" })
        } else {
            Taro.showToast({ title: res.msg, icon: "none" })
        }
        return res.isSuccess
    }
    /**
     * 修改手机号
     * @param params 
     */
    async onUpdatePhone(params) {
        Taro.showLoading({ title: "提交中~" })
        const res = await WXRequest.request({
            url: `/api/v1/Accounts/${this.Info.phone}/Phone`,
            data: {
                oldPhone: this.Info.phone,
                ...params
            },
            method: "PUT"
        })
        if (res.isSuccess) {
            runInAction(() => {
                this.Info.phone = params.newPhone;
            })
        }
        Taro.hideLoading()
        return res
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
            Taro.showToast({ title: "支付成功" });
            this.onGetUserInfo()
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
