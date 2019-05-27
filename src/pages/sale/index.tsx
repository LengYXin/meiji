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
        // Products.onNewData(true);
        ProductsNew.NewData.getPagingData(true)
    }
    componentDidHide() {
        Products.onRemove();
    }
    onToDetails(productCode) {
        Taro.navigateTo({ url: "/pages/details/index?key=" + productCode });
    }
    // 判断时间 是否在时间段
    isSeason(start, end) {
        const nowTime = new Date().getTime();
        console.log("start, end", start, end);
        if (nowTime > start && nowTime < end) {
            return true;
        } else {
            return false;
        }
    }
    // Taro.pageScrollTo({scrollTop: 100, duration: 0})
    render() {
        const dataSource = toJS(ProductsNew.NewData.PagingData);
        const dataSourceOld = toJS(ProductsNew.OldData.PagingData);
        const loadingVis = ProductsNew.NewData.PagingLoading;
        console.log("TCL: extends -> render -> dataSource", dataSourceOld)
        return (
            <View className="index">
                {dataSourceOld.map(data => {
                    return (<Item data={data} key={data.timeLineName}/>);
                })}
                {dataSource.map(data => {
                    return (<Item data={data} key={data.timeLineName}/>);
                })}
                <Loading visible={loadingVis} />
            </View>
        );
    }
}
