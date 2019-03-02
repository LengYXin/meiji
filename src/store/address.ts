import { observable, runInAction } from 'mobx';
import { WXRequest } from './native/request'
import Paging from './paging'
import Taro from '@tarojs/taro';
class AddressMobx {
    constructor() {
    }
    /**
     * 省市区 信息
     */
    @observable Provinces: any = null
    /**
     * 地址分页
     */
    dataSource = new Paging({ url: "/api/v1/Address" });
    /**
     * 获取省市区
     */
    async onGetProvinces() {
        if (this.Provinces != null) {
            return console.log("已经拿过数据了")
        }
        const res = await WXRequest.request({
            url: "/api/v1/ChinaAreas",
        }).then(x => x.data)
        runInAction(() => {
            this.Provinces = res;
        })
    }
    /**
     * 保存地址
     * @param params 
     */
    async onAddAddress(params) {
        try {
            const res = await WXRequest.request({
                url: "/api/v1/Address",
                data: params,
                method: "POST",
            });
            return res.code == 200
        } catch (error) {
            return false
        }
    }
}

export const Address = new AddressMobx();
