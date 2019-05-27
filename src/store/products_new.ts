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
import Paging from './paging';
class ProductsMobx {
    constructor() {

    }
    NewData = new Paging({ url: "/api/v1/Products/NewDataList", data: { pageSize: 1 } });
    OldData = new Paging({ url: "/api/v1/Products/OldDataList", data: { pageSize: 1 } });
}

export const ProductsNew = new ProductsMobx();
