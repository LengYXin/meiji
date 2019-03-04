import Paging from './paging';
class OrdersMobx {
    constructor() {
    }
    /**
     * 订单分页
     */
    dataSource = new Paging({ url: "/api/v1/Orders" });

}

export const Orders = new OrdersMobx();
