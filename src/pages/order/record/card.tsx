import { View, Text, Image, Button } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import delay from 'lodash/delay'
import './index.less';
import { Products, Orders } from '../../../store';

@observer
export default class extends Component<{ data: any }, any> {

    /**
     * 指定config的类型声明为: Taro.Config
     *  
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '我的订单'
    }

    componentWillMount() { }

    componentWillReact() {
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    onActOrder(status) {
        const data = this.props.data;
        switch (status) {
            case 'pendingPayment':
                Orders.onPayment(data.orderNO)
                break;
            case 'cancel':
                Orders.onCancelt(data.orderNO)
                break;
            case 'text':
                Taro.showLoading({ title: "加载中~", mask: true })
                delay(() => {
                    Taro.showToast({ title: "操作成功~" })
                }, 600)
                break;
            case 'wuliu':
                Taro.showModal({
                    title: "物流信息",
                    content: `顺丰快递：2634234123525656`,
                    showCancel: false
                })
                break;
            case 'Confirm':
                Orders.onConfirm(data.orderNO)
                break;
        }
    }
    render() {
        //         待付款状态:取消 去付款
        // 待发货状态: 催一下
        // 待收货状态: 查看物流 确认收货
        const data = this.props.data;
        if (!(data && data.orderNO)) {
            return <View></View>
        }
        const price = Products.toPrice(data.amount);
        const orderStatus = data.orderStatus;
        let stateText = '已完成';
        //  待付款            待收货            代发货   已完成       关闭   取消      用户取消
        // pendingPayment, toBeDelivered, shipped, completed, close, cancel, cancelByUser
        switch (orderStatus) {
            case 'pendingPayment':
                stateText = '待付款'
                break;
            case 'toBeDelivered':
                stateText = '待收货'
                break;
            case 'shipped':
                stateText = '待发货'
                break;
            case 'completed':
                stateText = '已完成'
                break;
            case 'close':
                stateText = '已关闭'
                break;
            case 'cancel':
            case 'cancelByUser':
                stateText = '已取消'
                break;
        }
        return (
            <View className="card">
                <View className="card-orderCode"><Text>订单编号：</Text>{data.orderNO}</View>
                <View className="card-content">
                    <View className="content-left">
                        <Image src={data.productImg} mode="aspectFit" />
                    </View>
                    <View className="content-right">
                        <View className="right-name">{data.productName}</View>
                        <View className="right-address"><Text>产地：</Text>{data.productOrigin}</View>
                        <View className="right-money">
                            <View className="money-left">
                                <View className="left-qian">{price}</View>
                                <View className="left-type">全款预付</View>
                            </View>
                            <View className="money-rignt">
                                <View className="rignt-num">×{data.productCount}</View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="card-btn">
                    <View className="btn-left">{stateText}</View>
                    <View className="btn-rigtn">
                        {orderStatus == "pendingPayment" && <Button onClick={this.onActOrder.bind(this, "cancel")}>取消</Button>}
                        {orderStatus == "pendingPayment" && <Button onClick={this.onActOrder.bind(this, "pendingPayment")} >去付款</Button>}
                        {orderStatus == "shipped" && <Button onClick={this.onActOrder.bind(this, 'text')}>催一下</Button>}
                        {orderStatus == "toBeDelivered" && <Button onClick={this.onActOrder.bind(this, 'wuliu')}>查看物流</Button>}
                        {orderStatus == "toBeDelivered" && <Button onClick={this.onActOrder.bind(this, 'Confirm')}>确认收货</Button>}
                    </View>
                </View>
            </View>
        )
    }
}