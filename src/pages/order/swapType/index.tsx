import { Image, Text, View } from "@tarojs/components";
import { observer } from "@tarojs/mobx";
import Taro, { Component, Config } from "@tarojs/taro";
import get from "lodash/get";
import { AtButton, AtImagePicker, AtList, AtListItem, AtTextarea, AtCheckbox } from "taro-ui";
import Imgs from "../../../img";
import { Products, Orders } from '../../../store';
import "./index.less";

@observer
export default class extends Component<any, any> {
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
        checkbox: Orders.swapType
    }
    componentWillMount() { }

    componentWillReact() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    handleChange(checkbox) {
        this.setState({
            checkbox
        });
        Orders.swapType = checkbox;
    }
    render() {
        const checkboxOption = [
            {
                value: "有异物",
                label: "有异物"
            },

            {
                value: "克重不足",
                label: "克重不足"
            },
            {
                value: "商品变质",
                label: "商品变质"
            },
            {
                value: "口感不佳",
                label: "口感不佳"
            },
            {
                value: "成熟度过低",
                label: "成熟度过低"
            },

            {
                value: "收到商品与描述不否",
                label: "收到商品与描述不否"
            },
            {
                value: "商品破损",
                label: "商品破损"
            },

            {
                value: "商品错发/漏发",
                label: "商品错发/漏发"
            },
            {
                value: "错拍/多拍/不想要",
                label: "错拍/多拍/不想要"
            },
            {
                value: "包裹丢失",
                label: "包裹丢失"
            },
        ];
        const typelist = this.props.typelist || checkboxOption;
        return (
            <View className='swap-type'>
                <AtCheckbox
                    options={typelist}
                    selectedList={this.state.checkbox}
                    onChange={this.handleChange.bind(this)}
                    className='swap-type-checkbox'
                />
            </View>
        );
    }
}
