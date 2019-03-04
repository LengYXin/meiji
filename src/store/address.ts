import { observable, runInAction, computed } from 'mobx';
import { WXRequest } from './native/request'
import Paging from './paging'
import Taro from '@tarojs/taro';
import lodash from 'lodash';
class AddressMobx {
    constructor() {
    }
    /**
     * 选择的详情
     */
    @observable
    private _Details: any = {};
    @computed
    public get Details(): any {
        return { ...this._Details };
    }
    public set Details(value: any) {
        this._Details = value;
    }
    /**
     * 省市区 信息
     */
    @observable
    private _Provinces: any = null;
    @computed
    public get Provinces(): any {
        return this._Provinces;
    }
    public set Provinces(value: any) {
        this._Provinces = value;
    }
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
        this.Provinces = res;
    }
    /**
     * 保存地址
     * @param params 
     */
    async onSaveAddress(params) {
        try {
            let res;
            if (params.id) {
                // 修改
                res = await WXRequest.request({
                    url: "/api/v1/Address/" + params.id,
                    data: params,
                    method: "PUT",
                })
            } else {
                delete params.id
                //  添加
                res = await WXRequest.request({
                    url: "/api/v1/Address",
                    data: params,
                    method: "POST",
                });
            }
            return res.code == 200
        } catch (error) {
            return false
        }
    }
    /**
     * 删除
     */
    async onDelete(id) {
        Taro.showLoading({ title: "" })
        try {
            const res = await WXRequest.request({
                url: "/api/v1/Address/" + id,
                method: "DELETE",
            });
            this.dataSource.onRemove(['id', id]);
            // Taro.showToast({ title: "删除成功", icon: "none" })
        } catch (error) {
            // Taro.showToast({ title: "删除失败", icon: "none" })
            return false
        }
        finally {
            Taro.hideLoading()
        }
    }
}

export const Address = new AddressMobx();
