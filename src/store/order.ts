import Taro from '@tarojs/taro';
import update from 'lodash/update';
import { WXRequest } from './native/request';
import Paging from './paging';
class OrdersMobx {
    constructor() {

    }
    /**
     * 订单分页
     */
    dataSource = new Paging({ url: "/api/v1/Orders" });
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
        const res = await WXRequest.request({ url: '/api/v1/Orders', method: "POST", data: params });
        if (res.isSuccess) {
            const payRes = await this.requestPayment(res.data)
        } else {
            Taro.showToast({ title: res.msg, icon: "none" })
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
        const res = await WXRequest.request({ url: '/api/v1/Orders/' + orderNO, method: "POST", });
        if (res.isSuccess) {
            const payRes = await this.requestPayment(res.data)
            if (payRes) {
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
        Taro.showToast({ title: res.isSuccess ? '确认成功' : '确认失败', icon: "none" })
        return res.isSuccess
    }
}

export const Orders = new OrdersMobx();
