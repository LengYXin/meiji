import Taro from '@tarojs/taro';
import delay from 'lodash/delay';
import find from 'lodash/find';
import get from 'lodash/get';
import head from 'lodash/head';
import last from 'lodash/last';
import orderBy from 'lodash/orderBy';
import some from 'lodash/some';
import { action, computed, observable, runInAction, toJS } from 'mobx';
import { WXRequest } from './native/request';
import { DateFormat } from './Regular';


class ProductsMobx {
    constructor() {
    }
    oldData = [];
    /**
      * 首次加载
      */
    @observable firstLoading = true;
    // 加载
    @observable PagingLoading = false;
    // 刷新
    @observable PagingRefreshing = false;
    @observable dataSource: {
        title: string,
        start: number,
        end: number,
        key: string,
        list: any[]
    }[] = [];
    @action.bound
    onPush(list: { id: string, salesDateEnd: number, salesDateStart: number }[], type: "new" | 'old' = "new") {
        const dataSource = toJS(this.dataSource);
        list.map(data => {
            const key = `${data.salesDateStart}-${data.salesDateEnd}`
            // if (type == "new") {
            // 已经存在 直接添加
            const sale = find(dataSource, ['key', key]);
            if (sale) {
                // 数据已经存在
                if (some(sale.list, ['id', data.id])) {
                } else {
                    sale.list.push(data);
                }
            } else {
                // 不存在 创建 插入
                dataSource.unshift({
                    title: `${DateFormat(data.salesDateStart, 'MM月dd日')}-${DateFormat(data.salesDateEnd, 'MM月dd日')}`,
                    start: data.salesDateStart,
                    end: data.salesDateEnd,
                    key: key,
                    list: [data]
                })
            }
            // }
        })
        this.dataSource = orderBy(dataSource, ['start', 'end'], ['asc', 'asc'])
    }
    /**
     * 推荐商品
     */
    @observable RecommendPruduct: any = {};
    @observable _SurplusTime = 0;
    @computed get SurplusTime() {
        return DateFormat(this._SurplusTime, "")
    }
    /**
     * 获取推荐商品
     */
    async onGetRecommendPruduct(delay = false) {
        Taro.showLoading({ title: "加载中~", mask: true })
        try {
            const res = await WXRequest.request({ url: '/api/v1/Products/RecommendPruduct' }, delay);
            if (res.isSuccess) {
                runInAction(() => {
                    this.RecommendPruduct = res.data
                })
            }
        } catch (error) {

        }
        Taro.hideLoading()


    }
    /**
     * 商品详情
     */
    @observable details: any = {}
    /** 转换金额 */
    toPrice(price) {
        return `￥${parseFloat(price).toFixed(2)}`
    }
    /** 返回百分比 */
    toProportion(stockCount, salesCount) {
        return Math.round((stockCount - salesCount) / stockCount * 100);
    }
    /**
     * 商品列表
     */
    async onGetProducts(productCode) {
        // if (productCode == this.details.productCode) {
        //     return
        // }
        runInAction(() => {
            this.details = {};
        })
        // timeStamp
        Taro.showLoading({ title: "加载中~" })
        const time = Date.now();
        try {
            const res = await WXRequest.request({ url: `/api/v1/Products/${productCode}` }, true);
            if (res.isSuccess) {
                runInAction(() => {
                    this.details = res.data;
                })
            }
        } catch (error) {
        } finally {
            delay(Taro.hideLoading, 600 - (Date.now() - time))
        }
    }
    /**
     * 下来 历史
     */
    async onOldData(timeStamp?: number) {
        Taro.showLoading({ title: "加载中~", mask: true })
        try {
            const data = head(this.dataSource) || { start: Date.now() };
            // if (data) {
            const res = await WXRequest.request({ url: '/api/v1/Products/OldData', data: { timeStamp: data.start } }, true);
            if (res.isSuccess && res.data.length > 0) {
                this.onPush(res.data)
            } else {
                // delay(() => { Taro.showToast({ title: "没有更多商品了", icon: "none" }) }, 600 - (Date.now() - time))
            }
            // }
        } catch (error) {
            console.log(error)
        }
        Taro.hideLoading()
    }
    /**
     * 上拉 最新
     */
    async onNewData(timeStamp?: number) {
        try {
            if (this.firstLoading) {
                Taro.showLoading({ title: "加载中~", mask: true })
            } else {
                this.PagingLoading = true
            }
            const timeStamp = get(last(this.dataSource), 'start');
            const res = await WXRequest.request({ url: '/api/v1/Products/NewData', data: { timeStamp } }, true);
            this.firstLoading && Taro.hideLoading()
            this.PagingLoading = false
            this.firstLoading = false;
            if (res.isSuccess && res.data.length > 0) {
                this.onPush(res.data)
            } else {
                // delay(() => { Taro.showToast({ title: "没有更多商品了", icon: "none" }) }, 600 - (Date.now() - time))
            }
        } catch (error) {
            console.log(error)
        }
        // 
    }
    onTest() {
        this.onGetRecommendPruduct()
        // this.onGetProducts()
        this.onOldData()
        this.onNewData()
    }
}

export const Products = new ProductsMobx();
