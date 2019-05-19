import { Image, View, Text } from "@tarojs/components";
import { observer } from "@tarojs/mobx";
import Taro, { Component, Config } from "@tarojs/taro";
import get from "lodash/get";
import { toJS } from "mobx";
import { Products } from "../..//store";
import "./index.less";
import Loading from "../../components/loading";
import Imgs from "../../img";
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
        await Products.onOldData();
        Taro.stopPullDownRefresh();
    }
    // 滚动加载
    onReachBottom() {
        Products.onNewData();
    }

    componentWillMount() {}

    componentWillReact() {}

    componentDidMount() {
        Taro.showShareMenu({
            withShareTicket: true
        });
        // Products.onNewData()
        Taro.pageScrollTo({ scrollTop: 100, duration: 0 });
    }

    componentWillUnmount() {}

    componentDidShow() {
        Products.onNewData(true);
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
        const dataSource = toJS(Products.dataSource);
        const loadingVis = Products.PagingLoading;
        console.log("预售："+ JSON.stringify(dataSource));
        return (
            <View className="index">
                {dataSource.map(data => {
                    return (
                        <View key={data.key}>
                            <View className="time-title">
                                <Image src={Imgs.Time} mode="aspectFit" />
                                <View className="title-box">
                                    <Text>{data.title}</Text>
                                    <Image
                                        src={
                                            this.isSeason(data.start, data.end)
                                                ? Imgs.Gj
                                                : Imgs.ProSale
                                        }
                                        mode="aspectFit"
                                    />
                                </View>
                            </View>
                            <View className="products-box">
                                {data.list.map(item => {
                                    return (
                                        <View
                                            className="products-items"
                                            key={item.id}
                                            onClick={this.onToDetails.bind(
                                                this,
                                                item.productCode
                                            )}
                                        >
                                            <Image
                                                // src={get(item.pictures, 0, "")}
                                                src={item.pictures}
                                                mode="widthFix"
                                            />
                                            <View className="title">
                                                {item.productName}
                                            </View>
                                            <View className="info stock">
                                                库存
                                            </View>
                                            {/* <Image src={Imgs.Lable} mode="aspectFit" />
                                              <View className="title">{item.productName}</View>
                                              <View className="cd">产地：{item.productOrigin}</View>
                                              <View className="info">{item.summary}</View>
                                              <View className="img">
                                                <Image src={get(item.pictures, 0, '')} mode="widthFix" />
                                              </View> */}
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    );
                })}
                <Loading visible={loadingVis} />
            </View>
        );
    }
}
