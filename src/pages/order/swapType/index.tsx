import { View } from "@tarojs/components";
import { observer } from "@tarojs/mobx";
import Taro, { Component, Config } from "@tarojs/taro";
import { AtCheckbox } from "taro-ui";
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
    componentWillMount() { }

    componentWillReact() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    state = {
        checkedList: ["list1"]
    };
    handleChange(value) {
        this.setState({
            checkedList: value
        });
    }
    render() {
        const checkboxOption = [
            {
                value: "list1",
                label: "iPhone X"
            },
            {
                value: "list2",
                label: "HUAWEI P20"
            },
            {
                value: "list3",
                label: "OPPO Find X"
            },
            {
                value: "list4",
                label: "vivo NEX"
            }
        ];
        const typelist = this.props.typelist || checkboxOption;
        return (
            <View className='swap-type'>
                <AtCheckbox
                    options={typelist}
                    selectedList={this.state.checkedList}
                    onChange={this.handleChange.bind(this)}
                    className='swap-type-checkbox'
                />
            </View>
        );
    }
}
