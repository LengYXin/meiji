import Taro from "@tarojs/taro";
import delay from "lodash/delay";
import find from "lodash/find";
import get from "lodash/get";
import head from "lodash/head";
import last from "lodash/last";
import orderBy from "lodash/orderBy";
import some from "lodash/some";
import { action, computed, observable, runInAction, toJS } from "mobx";
import { WXRequest } from "./native/request";
import { DateFormat } from "./Regular";

class ProductsMobx {
    constructor() {
        this.onGetRecommendPruduct();
    }
    oldData = [];

    // 刷新
    // @observable PagingRefreshing = false;
    @observable dataSource: {
        title: string;
        start: number;
        end: number;
        key: string;
        list: any[];
    }[] = [];
    @action.bound
    onPush(
        list: { id: string; salesDateEnd: number; salesDateStart: number }[],
        type: "new" | "old" = "new"
    ) {
        const dataSource = toJS(this.dataSource);
        list.map(data => {
            const key = `${data.salesDateStart}-${data.salesDateEnd}`;
            // if (type == "new") {
            // 已经存在 直接添加
            const sale = find(dataSource, ["key", key]);
            if (sale) {
                // 数据已经存在
                if (some(sale.list, ["id", data.id])) {
                } else {
                    sale.list = orderBy(
                        [...sale.list, data],
                        ["sort"],
                        ["asc"]
                    ); //.push(data);
                }
            } else {
                // 不存在 创建 插入
                dataSource.unshift({
                    title: ` ${DateFormat(
                        data.salesDateStart,
                        "yyyy年"
                    )} ${DateFormat(
                        data.salesDateStart,
                        "MM月dd日"
                    )}-${DateFormat(data.salesDateEnd, "MM月dd日")}`,
                    start: data.salesDateStart,
                    end: data.salesDateEnd,
                    key: key,
                    list: [data]
                });
            }
            // }
        });
        this.dataSource = orderBy(dataSource, ["start", "end"], ["asc", "asc"]);
    }
    /**
     * 推荐商品
     */
    @observable RecommendPruduct: any = {
        pictures: []
    };
    @observable _SurplusTime = 0;
    @computed get SurplusTime() {
        return DateFormat(this._SurplusTime, "");
    }
    /**
     * 获取推荐商品
     */
    async onGetRecommendPruduct(delay = false) {
        // Taro.showLoading({ title: "加载中~", mask: true })
        try {
            const res = await WXRequest.request(
                { url: "/api/v1/Products/RecommendPruduct" },
                delay
            );
            if (res.isSuccess) {
                runInAction(() => {
                    this.RecommendPruduct = res.data;
                });
            }
            return res.isSuccess;
        } catch (error) {}
        // Taro.hideLoading()
    }
    /**
     * 商品详情
     */
    @observable details: any = {};
    /** 转换金额 */
    toPrice(price) {
        return `￥${parseFloat(price).toFixed(2)}`;
    }
    /** 返回百分比 */
    toProportion(stockCount, salesCount) {
        // if (stockCount == salesCount) {
        //     return 100;
        // }
        if (salesCount == 0) {
            return 0;
        }
        return Math.round((salesCount / stockCount) * 100);
    }
    @action.bound
    onUnmountProducts() {
        this.details = {};
    }
    /**
     * 商品详情
     */
    async onGetProducts(productCode) {
        // if (productCode == this.details.productCode) {
        //     return
        // }
        // runInAction(() => {
        //     this.details = {};
        // })
        // timeStamp
        Taro.showLoading({ title: "加载中~", mask: true });
        try {
            const res = await WXRequest.request(
                { url: `/api/v1/Products/${productCode}` },
                true
            );
            if (res.isSuccess) {
                runInAction(() => {
                    this.details = res.data;
                });
            }
            return res.isSuccess;
        } catch (error) {
        } finally {
            Taro.hideLoading();
        }
    }
    oldDataPage = 0;
    oldPageCount = 0;
    oldfirstLoading = true;
    // oldPagingLoading = false;
    /**
     * 下来 历史
     */
    async onOldData() {
        try {
            let data = {};
            if (this.oldfirstLoading) {
            } else {
                const page = this.oldDataPage + 1;
                data = { page: page };
                if (this.oldDataPage == this.oldPageCount) {
                    return true;
                }
            }
            Taro.showLoading({ title: "加载中~", mask: true });
            const res = await WXRequest.request(
                { url: "/api/v1/Products/OldData", data },
                true
            );
            this.oldfirstLoading = false;
            if (res.isSuccess && res.data.list.length > 0) {
                this.onPush(res.data.list);
                // 当前页码
                this.oldDataPage = res.data.page;
                this.oldPageCount = res.data.pageCount;
            } else {
                // delay(() => { Taro.showToast({ title: "没有更多商品了", icon: "none" }) }, 600 - (Date.now() - time))
            }
        } catch (error) {
            console.log(error);
        }
        Taro.hideLoading();
    }

    /**
     * 首次加载
     */
    @observable firstLoading = true;
    // 加载
    @observable PagingLoading = false;
    newDataPage = 0;
    newPageCount = 0;
    /**
     * 上拉 最新
     */
    async onNewData(componentDidShow = false) {
        // console.log(componentDidShow, this.dataSource.length)
        if (componentDidShow && this.dataSource.length > 0) {
            return;
        }
        try {
            let data = {};
            if (this.firstLoading) {
                Taro.showLoading({ title: "加载中~", mask: true });
            } else {
                const page = this.newDataPage + 1;
                data = { page: page };
                if (this.newDataPage == this.newPageCount) {
                    return true;
                } else {
                    this.PagingLoading = true;
                }
            }
            let res = await WXRequest.request({ url: '/api/v1/Products/NewData', data }, true);
            // var fnres = () => {
            //     const id1 = Math.round(Math.random() * 1000) + "";
            //     const id2 = Math.round(Math.random() * 1000) + "";
            //     const id3 = Math.round(Math.random() * 1000) + "";
            //     const id4 = Math.round(Math.random() * 10000) + "";
            //     return {
            //         isSuccess: true,
            //         data: {
            //             title: new Date().getSeconds(),
            //             list: [
            //                 {
            //                     id: id1,
            //                     pictures:
            //                         "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557731149423&di=65e0979bfa29f1501393f2bee5ca43dd&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F120827%2F214833-120RGK01490.jpg",
            //                     productName: "商品名称",
            //                     salesDateEnd: 1557718875873,
            //                     salesDateStart: new Date().getTime()
            //                 },
            //                 {
            //                     id: id2,
            //                     pictures:
            //                         "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557731149423&di=65e0979bfa29f1501393f2bee5ca43dd&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F120827%2F214833-120RGK01490.jpg",
            //                     productName: "商品名称",
            //                     salesDateEnd: 1557718875873,
            //                     salesDateStart: new Date().getTime()
            //                 },
            //                 {
            //                     id: id3,
            //                     pictures:
            //                         "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557731149423&di=65e0979bfa29f1501393f2bee5ca43dd&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F120827%2F214833-120RGK01490.jpg",
            //                     productName: "商品名称",
            //                     salesDateEnd: new Date().getTime() + 100000,
            //                     salesDateStart: new Date().getTime() - 100000
            //                 },
            //                 {
            //                     id: id4,
            //                     pictures:
            //                         "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557731149423&di=65e0979bfa29f1501393f2bee5ca43dd&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F120827%2F214833-120RGK01490.jpg",
            //                     productName: "阳澄湖大闸蟹",
            //                     salesDateEnd: 1557718875873,
            //                     salesDateStart: new Date().getTime()
            //                 }
            //             ],
            //             page: 1,
            //             pageCount: 10
            //         }
            //     };
            // };
            // var res = fnres();
            this.firstLoading && Taro.hideLoading();
            this.PagingLoading = false;
            if (res.isSuccess && res.data.list.length > 0) {
                this.firstLoading = false;
                this.onPush(res.data.list);
                // res = fnres();
                // this.onPush(res.data.list);
                // 当前页码
                this.newDataPage = res.data.page;
                this.newPageCount = res.data.pageCount;
            } else {
                // delay(() => { Taro.showToast({ title: "没有更多商品了", icon: "none" }) }, 600 - (Date.now() - time))
            }
        } catch (error) {
            console.log(error);
        }
        //
    }
    @action.bound
    onRemove() {
        this.dataSource = [];
        this.oldDataPage = 0;
        this.oldPageCount = 0;
        this.oldfirstLoading = true;
        this.firstLoading = true;
        // 加载
        this.PagingLoading = false;
        this.newDataPage = 0;
        this.newPageCount = 0;
    }
    onTest() {
        this.onGetRecommendPruduct();
        // this.onGetProducts()
        this.onOldData();
        this.onNewData();
    }
}

export const Products = new ProductsMobx();
