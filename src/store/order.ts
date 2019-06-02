import Taro from '@tarojs/taro';
import { observable, runInAction } from 'mobx';
import { WXRequest } from './native/request';
import Paging from './paging';
import isBoolean from 'lodash/isBoolean';
import get from 'lodash/get'
class OrdersMobx {
    constructor() {

    }
    /**
     * 订单分页
     */
    dataSource = new Paging({ url: "/api/v1/Orders" });
    /**
     * 订单信息
     */
    @observable
    OrderInfo: any = {};
    // 退款 订单详情
    @observable
    OrderDetails: any = {};
    // 退款类型
    swapType = [];
    async requestPayment(data) {
        try {
            const payRes = await Taro.requestPayment(data)
            Taro.showToast({ title: "支付成功" })
            return true
        } catch (error) {
            console.log(error)
            if (error.errMsg == 'requestPayment:fail cancel') {
                return Taro.showToast({ title: "支付已取消", icon: "none" })
            }
            Taro.showToast({ title: "支付失败", icon: "none" })
            return false
        }
    }
    /**
     * 创建订单 支付
     * @param params 
     */
    async onCreateOrder(params: {
        productCount: number,//数量
        cardCoupomCount: number,//卷
        productCode: string,//商品编号
        shippingAddresseId: string//地址id
    }) {
        Taro.showLoading({ title: "加载中~", mask: true })
        const res = await WXRequest.request({ url: '/api/v1/Orders', method: "POST", data: params }, true);
        if (res.isSuccess) {
            runInAction(() => { this.OrderInfo = res.data; });
            const payRes = await this.requestPayment(res.data.wxPayInfo);
            if (isBoolean(payRes)) {
                Taro.redirectTo({ url: "/pages/other/payment/index" })
            }
        } else {
            Taro.showToast({ title: res.msg, icon: "none" })
            // Taro.redirectTo({ url: "/pages/other/payment/index" })
        }
    }
    onUpdate(orderNO, orderStatus) {
        this.dataSource.onUpdate(['orderNO', orderNO], value => {
            value['orderStatus'] = orderStatus
            return value
        })
    }
    /**
     * 支付订单
     */
    async onPayment(orderNO) {
        Taro.showLoading({ title: "加载中~", mask: true })
        const res = await WXRequest.request({ url: '/api/v1/Orders/' + orderNO, method: "POST", }, true);
        if (res.isSuccess) {
            runInAction(() => { this.OrderInfo = res.data; })
            const payRes = await this.requestPayment(res.data.wxPayInfo);
            if (isBoolean(payRes)) {
                this.onUpdate(orderNO, 'toBeDelivered')
            }
        } else {
            Taro.showToast({ title: res.msg, icon: "none" })
        }
    }
    /**
     * 取消
     * @param orderNo 
     */
    async onCancelt(orderNo) {
        Taro.showLoading({ title: "加载中~", mask: true })
        const res = await WXRequest.request({ url: `/api/v1/Orders/Cancel/${orderNo}`, method: "PUT", });
        if (res.isSuccess) {
            this.onUpdate(orderNo, 'cancelByUser')
        }
        Taro.showToast({ title: res.isSuccess ? '取消成功' : '取消失败', icon: "none" })
        return res.isSuccess
    }
    /**
    * 确认
    * @param orderNo 
    */
    async onConfirm(orderNo) {
        Taro.showLoading({ title: "加载中~", mask: true })
        const res = await WXRequest.request({ url: `/api/v1/Orders/Confirm/${orderNo}`, method: "PUT", });
        if (res.isSuccess) {
            this.onUpdate(orderNo, 'completed')
        }
        Taro.hideLoading();
        // Taro.showToast({ title: res.isSuccess ? '确认成功' : '确认失败', icon: "none" })
        return res.isSuccess
    }
    /**
     * 反馈喜欢小样
     * @param orderNo 
     */
    async onSaveEnjoyGifts(orderNo, EnjoyGifts) {
        // Taro.showLoading({ title: "加载中~", mask: true })
        const res = await WXRequest.request({ url: `/api/v1/Orders/SaveEnjoyGifts/${orderNo}/${EnjoyGifts}` });
        // if (res.isSuccess) {
        // }
        // Taro.showToast({ title: res.isSuccess ? '确认成功' : '确认失败', icon: "none" })
        return res.isSuccess
    }
    /**
     * 退款
     * @param  
     */
    async onOrderBack(orderBackDto) {
        console.log("TCL: OrdersMobx -> onOrderBack -> orderBackDto", orderBackDto)
        Taro.showLoading({ title: "加载中~", mask: true });
        const files: any[] = [];
        for (const file of orderBackDto.files) {
            const resFile = await WXRequest.uploadFile({
                url: "/api/v1/Files",
                name: "files",
                filePath: file.url
            }, false);
            if (resFile.code === 200) {
                files.push(resFile.data)
            }
        }
        const res = await WXRequest.request({
            url: `/api/v1/OrderBack`, method: "POST", data: {
                "orderNO": orderBackDto.orderNO,
                "refundReason": orderBackDto.refundReason,
                "refundRemark": orderBackDto.refundRemark,
                "pic1": get(files, '[0]'),
                "pic2": get(files, '[1]'),
                "pic3": get(files, '[2]'),
            }
        });
        if (res.isSuccess) {
            // this.onUpdate(orderNo, 'completed')
            await Taro.navigateBack()
        }
        Taro.showToast({ title: res.isSuccess ? '申请成功' : '申请失败', icon: "none" })
        return res.isSuccess
    }
    /**
    * 取消退款
    * @param  
    */
    async onOrderBackCancel(orderNo) {
        Taro.showLoading({ title: "加载中~", mask: true });
        const res = await WXRequest.request({
            url: `/api/v1/OrderBack/Cancel/${orderNo}`, method: "PUT"
        });
        if (res.isSuccess) {
            this.onUpdate(orderNo, 'completed')
        }
        Taro.showToast({ title: res.isSuccess ? '取消成功' : '取消失败', icon: "none" })
        return res.isSuccess
    }
    // /api/v1/Orders/{orderNO}
    /**
     * 详情
     * @param orderNo 
     */
    async onDetails(orderNo) {
        if (this.OrderDetails.orderNO === orderNo) {
            return
        }
        Taro.showLoading({ title: "加载中~", mask: true })
        const res = await WXRequest.request({ url: `/api/v1/Orders/${orderNo}` });
        if (res.isSuccess) {
            runInAction(() => {
                this.OrderDetails = res.data;
            })
        }
        Taro.hideLoading();
        return res.isSuccess
    }
}

export const Orders = new OrdersMobx();
