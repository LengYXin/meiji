import { View } from "@tarojs/components";
import { observer } from "@tarojs/mobx";
import Taro, { Component, Config } from "@tarojs/taro";
import { toJS } from "mobx";
import { Products, ProductsNew } from "../..//store";
import Loading from "../../components/loading";
import "./index.less";
import Item from "./item";
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
        navigationBarTitleText: "美季MEIJI",
        // 下拉刷新
        enablePullDownRefresh: true,
        backgroundTextStyle: "dark"
    };
    navigateToDetails = false;
    // 下拉刷新
    async onPullDownRefresh() {
        // await Products.onOldData();
        await ProductsNew.OldData.getPagingData();
        Taro.stopPullDownRefresh();
    }
    // 滚动加载
    onReachBottom() {
        // Products.onNewData();
        ProductsNew.NewData.getPagingData()
    }

    componentWillMount() { }

    componentWillReact() { }

    componentDidMount() {
        Taro.showShareMenu({
            withShareTicket: true
        });
        // Products.onNewData()
        Taro.pageScrollTo({ scrollTop: 100, duration: 0 });

    }

    componentWillUnmount() { }

    componentDidShow() {
        if (this.navigateToDetails) {
            return this.navigateToDetails = false
        }
        ProductsNew.NewData.getPagingData(true)
    }
    componentDidHide() {
        // Products.onRemove();
    }
    onToDetails(item, canBuy) {
        this.navigateToDetails = true;
        Taro.navigateTo({ url: `/pages/details/index?key=${item.productCode}&canBuy=${canBuy}` });
    }
    // 判断时间 是否在时间段
    isSeason(start, end) {
        const nowTime = new Date().getTime();
        if (nowTime > start && nowTime < end) {
            return true;
        } else {
            return false;
        }
    }
    // Taro.pageScrollTo({scrollTop: 100, duration: 0})
    render() {
        const dataSource = toJS(ProductsNew.NewData.PagingData);
        console.log("TCL: extends -> render -> dataSource", dataSource)
        const dataSourceOld = toJS(ProductsNew.OldData.PagingData);
        const loadingVis = ProductsNew.NewData.PagingLoading;
        return (
            <View className="index">
                {dataSourceOld.map(data => {
                    return (<Item data={data} key={data.startTime} onToDetails={this.onToDetails.bind(this)} />);
                })}
                {dataSource.map(data => {
                    return (<Item data={data} key={data.startTime} onToDetails={this.onToDetails.bind(this)} />);
                })}
                <Loading visible={loadingVis} />
            </View>
        );
    }
}
