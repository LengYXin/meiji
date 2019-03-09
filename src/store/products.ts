import { observable, runInAction, action, toJS } from 'mobx';
import lodash from 'lodash';

import { WXRequest } from './native/request'
import Paging from './paging'
import Taro from '@tarojs/taro';
import { Address } from './address'
import { DateFormat } from './Regular';
class ProductsMobx {
    constructor() {
    }
    @observable dataSource: {
        title: string,
        start: number,
        end: number,
        key: string,
        list: any[]
    }[] = [];
    @action.bound
    onPush(list: { salesDateEnd: number, salesDateStart: number }[], type: "new" | 'old' = "new") {
        const dataSource = toJS(this.dataSource);
        list.map(data => {
            const key = `${data.salesDateStart}-${data.salesDateEnd}`
            // if (type == "new") {
            // 已经存在 直接添加
            const sale = lodash.find(dataSource, ['key', key]);
            if (sale) {
                sale.list.push(data);
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
        this.dataSource = lodash.orderBy(dataSource, ['start', 'end'], ['asc', 'asc'])
    }
    /**
     * 推荐商品
     */
    @observable RecommendPruduct: any = {};
    /**
     * 获取推荐商品
     */
    async onGetRecommendPruduct() {
        const res = await WXRequest.request({ url: '/api/v1/Products/RecommendPruduct' });
        if (res.isSuccess) {
            runInAction(() => {
                this.RecommendPruduct = res.data
            })
        }
    }
    /**
     * 商品列表
     */
    async onGetProducts() {
        // timeStamp
        Taro.showLoading({ title: "加载中~" })
        const time = Date.now();
        try {
            const res = await WXRequest.request({ url: '/api/v1/Products', data: { pageSize: 99 } });
            if (res.isSuccess) {
                this.onPush(res.data.list);
            }
        } catch (error) {
        } finally {
            lodash.delay(Taro.hideLoading, 600 - (Date.now() - time))
        }
    }
    /**
     * 下来 历史
     */
    async onOldData(timeStamp?: number) {
        Taro.showLoading({ title: "加载中~" })
        const time = Date.now();
        try {
            const data = lodash.head(this.dataSource);
            if (data) {
                const res = await WXRequest.request({ url: '/api/v1/Products/OldData', data: { timeStamp: data.start } });
                if (res.isSuccess && res.data.length > 0) {
                    this.onPush(res.data)
                } else {
                    // lodash.delay(() => { Taro.showToast({ title: "没有更多商品了", icon: "none" }) }, 600 - (Date.now() - time))
                }
            }
        } catch (error) {
            
        } finally {
            lodash.delay(Taro.hideLoading, 600 - (Date.now() - time))
        }
    }
    /**
     * 上拉 最新
     */
    async onNewData(timeStamp?: number) {
        Taro.showLoading({ title: "加载中~" })
        const time = Date.now();
        try {
            const data = lodash.last(this.dataSource);
            if (data) {
                const res = await WXRequest.request({ url: '/api/v1/Products/NewData', data: { timeStamp: data.start } });
                if (res.isSuccess && res.data.length > 0) {
                    this.onPush(res.data)
                } else {
                    // lodash.delay(() => { Taro.showToast({ title: "没有更多商品了", icon: "none" }) }, 600 - (Date.now() - time))
                }
            }
        } catch (error) {

        }
        finally {
            lodash.delay(Taro.hideLoading, 600 - (Date.now() - time))
        }
    }
    onTest() {
        this.onGetRecommendPruduct()
        this.onGetProducts()
        this.onOldData()
        this.onNewData()
    }
}

export const Products = new ProductsMobx();
