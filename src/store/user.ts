import Taro from '@tarojs/taro';
import fill from 'lodash/fill';
import get from 'lodash/get';
import { computed, observable, runInAction } from 'mobx';
import { Address } from './address';
import { WXRequest } from './native/request';
import { DateFormat } from './Regular';
export enum EnumVipType {
    /** 非会员 */
    nonVip = "nonVip",
    /** 体验 */
    expVip = "expVip",
    /** 优享 */
    enjoyVip = "enjoyVip",
    /** 尊享 */
    excVip = "excVip",
}
class UserMobx {

    constructor() {
    }
    async onInit() {
        if (this.AutoData.token_type && this.Info.id) {
            return
        }
        Taro.showLoading({ title: "加载中...", mask: true })
        await this.onGetAuthSetting()
        await this.onWxLogin();
        Taro.hideLoading()
    }
    /**
     * 微信授权
     * */
    @observable isUserInfoAuto = false;
    /**https://meiji.alienwow.cc/swagger/index.html
     * 用户信息
     */
    @observable Info = {
        id: '',
        avatarUrl: '',
        nickName: '',
        gender: 0,
        vipType: '',//'expVip' | 'enjoyVip' | 'excVip'
        phone: '',
        vipExpireTime: 0,
        vipExpireTimeStr: '',
        upgradepoints: '', //升级点数
        TastingCount: '', //品鉴次数
        RightTasting: '', //决策正确次数
    }
    /**
    * 优惠卷
    */
    @observable Coupon: any[] = [];
    /**
     * 邀请码
     */
    @observable InviteCode: any[] = [];
    @observable OrderStatusCount: any[] = [];
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
    onSetToken(auto) {
        this.AutoData = auto;
        // 设置 token
        WXRequest.setToken(this.AutoData.token_type + ' ' + this.AutoData.access_token);
        this.onGetUserInfo()
    }
    /**
     * 页面跳转
     */
    onNavigate() {
        if (this.AutoData.token_type && this.Info.id) {
            Address.dataSource.getPagingData()
            // return Taro.reLaunch({ url: "/pages/order/create/index?key=ME1550762437785" })
            if (this.Info.vipType === "nonVip") {
                return Taro.reLaunch({ url: "/pages/user/center/index?key=0" })
            } else {
                Taro.switchTab({ url: "/pages/home/index" });
            }
        }
    }
    /**
     * 微信授权
     */
    async onGetAuthSetting() {
        if (this.isUserInfoAuto) {
            return true
        }
        const setting = await Taro.getSetting();
        const isAutl = get(setting, 'authSetting["scope.userInfo"]');
        if (!isAutl) {
            const page = Taro.getCurrentPages()[0];
            if (page) {
                const route = page.route;
                console.warn("没有用户授权", route)
                if (route !== "pages/index/index") {
                    Taro.reLaunch({ url: "/pages/index/index" })
                }
            }
        }
        runInAction(() => {
            this.isUserInfoAuto = isAutl;
        })
        return isAutl
    }
    isWxLogin = false;
    /**
    * 微信登陆
    */
    async onWxLogin() {
        // return 
        if (this.isWxLogin) {
            return
        }
        if (this.AutoData.access_token) {
            if (this.isUserInfoAuto) {
                return this.onGetUserInfo()
            }
            return
        }
        this.isWxLogin = true;
        // 获取微信 code
        const mpAuthCode = await Taro.login().then(x => x.code);
        // 登录
        const data = await WXRequest.request({ url: "/api/v1/Auth/WxLogin", data: { mpAuthCode }, method: "POST" });
        if (data.isSuccess) {
            this.onSetToken(data.data);
            if (this.isUserInfoAuto) {
                // console.log("已经授权")
                this.onGetUserInfo()
            }
        }
        this.isWxLogin = false
    }
    isGetUserInfo = false
    /**
     * 获取用户信息
     */
    async onGetUserInfo(again = false) {
        if (this.isGetUserInfo) {
            return
        }
        this.isGetUserInfo = true;
        try {
            // 已加载用户信息
            if (!this.Info.id || again) {
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
                    info.vipExpireTimeStr = DateFormat(info.vipExpireTime, "yyyy.MM.dd");
                    this.Info = info// WxAuto
                    this.onGetInviteCode()
                    this.onGetCoupon()
                    this.onGetOrderStatusCount()
                })
            }
            this.onNavigate()
        } catch (error) {
            console.error("TCL: UserMobx -> onGetUserInfo -> error", error)
            // Taro.reLaunch({ url: "/pages/index/index" })
        }
        this.isGetUserInfo = false;
        return this.Info;
    }
    /**
     * 设置邀请码
     */
    async onInviteCode(inviteCode) {
        Taro.showLoading({ title: "加载中...", mask: true })
        const res = await WXRequest.request({
            url: "/api/v1/Accounts/InviteCode?inviteCode=" + inviteCode, data: { inviteCode }, method: "PUT"
        });
        Taro.hideLoading();
        if (res.isSuccess) {
            this.onGetUserInfo()
        } else {
            Taro.showToast({ title: res.msg, icon: "none" })
        }
    }
    /**
     * 获取邀请码
     */
    async onGetInviteCode() {
        Taro.showLoading()
        // /api/v1/InviteCodes
        const res = await WXRequest.request({
            url: "/api/v1/InviteCodes"
        });
        Taro.hideLoading();
        if (res.isSuccess) {
            runInAction(() => {
                this.InviteCode = res.data;
                for (let index = 0, length = 3 - this.InviteCode.length; index < length; index++) {
                    this.InviteCode.push({
                        status: "null"
                    })
                }
            })
        } else {
            Taro.showToast({ title: res.msg, icon: "none" })
        }
    }
    /**
     * 获取卡卷
     */
    async onGetCoupon() {
        // Taro.showLoading()
        // /api/v1/InviteCodes
        const res = await WXRequest.request({
            url: "/api/v1/CardCoupons"
        });
        // Taro.hideLoading();
        if (res.isSuccess) {
            runInAction(() => {
                this.Coupon = res.data.map(x => {
                    return {
                        ...x,
                        endTime: DateFormat(x.expireTime, "yyyy.MM.dd")
                    }
                });
            })
        } else {
            Taro.showToast({ title: res.msg, icon: "none" })
        }
    }
    async onGetOrderStatusCount() {
        const res = await WXRequest.request({
            url: `/api/v1/Orders/OrderStatusCount/${this.Info.id}`
        });
        // Taro.hideLoading();
        if (res.isSuccess) {
            runInAction(() => {
                this.OrderStatusCount = res.data.list;
            })
        } else {
            Taro.showToast({ title: res.msg, icon: "none" })
        }
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
            // await this.onAuth()
            this.onSetToken(data.data)
            this.onGetUserInfo()
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
    async onPayVip(vipType: EnumVipType) {
        try {
            // if (this.Info.vipType != "nonVip" && this.Info.vipType != vipType) {
            //     return Taro.showToast({ title: "" })
            // }
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
            this.onGetUserInfo(true)
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
