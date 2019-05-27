import { Image, Text, View } from "@tarojs/components";
import { observer } from "@tarojs/mobx";
import Taro, { Component, Config } from "@tarojs/taro";
import get from "lodash/get";
import { AtButton, AtImagePicker, AtList, AtListItem, AtTextarea } from "taro-ui";
import Imgs from "../../../img";
import { Products, Orders } from '../../../store';

import "./index.less";

@observer
export default class extends Component {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: "退换货"
    };
    state = {
        files: [],
        value: "",
        loading: false
    };
    componentWillMount() { }

    componentWillReact() { }

    componentDidMount() { }

    componentWillUnmount() {
        console.log('componentWillUnmount')
        Orders.swapType = [];
    }

    componentDidShow() {
        Orders.onDetails(this.onGetKey());
        // console.log(key)
    }
    onGetKey() {
        const key = get(this.$router, 'params.key');
        return key
    }
    componentDidHide() { }

    onChange(files, operationType) {
        console.log("TCL: extends -> onChange -> files", operationType, files)
        this.setState({
            files
        });
    }
    onFail(mes) {
        console.log(mes);
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    async onSubmit() {
        // for (const file of this.state.files) {
        //     console.log(file)
        //     await 
        // }
        if (Orders.swapType.length <= 0) {
            return Taro.showToast({ icon: "none", title: "请选择退款原因" })
        }
        Orders.onOrderBack({
            "orderNO": this.onGetKey(),
            "refundReason": Orders.swapType.join(","),
            "refundRemark": this.state.value,
            files: this.state.files
        })
    }
    render() {
        const { files, value, loading } = this.state;
        const info = { ...Orders.OrderDetails };
        return (
            <View className="swap">
                <View className="product-info">
                    <Image src={info.productImg} mode="aspectFit" />
                    <View className="info-ctx">
                        <View className="member">
                            <Text>{info.productName}</Text>
                        </View>
                        <View className="maturity">产地：{info.productOrigin}</View>
                    </View>
                </View>
                <View className="reason">
                    {/* <View className="reason-left item-title">退款原因</View>
                    <View className="reason-right">></View> */}
                    <AtList hasBorder={false}>
                        <AtListItem title='退款原因' arrow='right' onClick={() => Taro.navigateTo({ url: "/pages/order/swapType/index" })} hasBorder={false} />
                    </AtList>
                </View>
                <View className="description">
                    <View className="item-title">退款说明</View>
                    <AtTextarea
                        className="description-textarea"
                        count={false}
                        value={value}
                        onChange={this.handleChange.bind(this)}
                        placeholder=""
                    />
                </View>
                <View className="upload">
                    <View className="item-title">上传凭证</View>
                    <AtImagePicker
                        className="upload-imgpicker"
                        length={3}
                        // multiple
                        files={files as any}
                        onChange={this.onChange.bind(this)}
                    />
                </View>
                <AtButton
                    className="but-bottom"
                    loading={loading}
                    type="primary"
                    onClick={this.onSubmit.bind(this)}
                >
                    提交
                </AtButton>
            </View>
        );
    }
}
