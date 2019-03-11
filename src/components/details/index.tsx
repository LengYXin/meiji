import { Button, Image, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import get from 'lodash/get';
import head from 'lodash/head';
import remove from 'lodash/remove';
import { AtProgress } from 'taro-ui';
import { Products } from '../../store';
import './index.less';
import Time from './time';
export default class extends Component<{ data: any }, any> {
    onToCreateOrder() {
        const productCode = get(this.props.data, 'productCode')
        if (productCode) {
            Taro.navigateTo({ url: "/pages/order/create/index?key=" + productCode })
        }
    }
    render() {
        // if (this.props.data) {
        //     return
        // }
        const products = { ...this.props.data };
        if (!products.id) {
            return <View></View>
        }
        const price = Products.toPrice(products.price);
        const pictures = [...products.pictures];
        const imghead = head(pictures);
        const Proportion = Products.toProportion(products.stockCount, products.salesCount)
        remove(pictures, (value, index) => { return index == 0 })
        console.log(products)
        return (
            <View className='home'>
                <View className="home-nav-img">
                    <Image
                        src={imghead}
                        mode="aspectFit" />
                </View>
                <View className="home-content">
                    <View className="content-header">
                        <View className="header-title">
                            {products.productName}
                        </View>
                        <Image
                            className='header-img'
                            src={get(products, '')}
                            mode='aspectFit' />
                    </View>
                    <View className="content-address">产地：{products.productOrigin}</View>
                    <View className="content-text">
                        {products.introduction}
                    </View>
                </View>
                {pictures.map((img) => {
                    return <Image key={img}
                        className='home-bottom-img'
                        src={img}
                        mode='widthFix' />
                })}
                <View className="div-ider"></View>
                <View className="home-shop">
                    <View className="shop-header">
                        <View className="shop-title">
                            {products.productName}
                        </View>
                        <Image
                            className='shop-img'
                            src='https://jdc.jd.com/img/400x400'
                            mode='widthFix' /></View>
                    <View className="shop-address">产地：{products.productOrigin}</View>
                    <View className="shop-progress">
                        <View className='proportion'>
                            <AtProgress className='proportion-progress' percent={Proportion} color='#DBC389' isHidePercent />
                        </View>
                        <View className='stockCount'>{products.stockCount}份</View>
                    </View>
                    <View className="shop-qian">
                        <View className="qian-left">
                            <View className="left-num">{price}</View>
                            <View className="left-type">全款预付</View>
                        </View>
                        <View className="qian-right">
                            <View className="right-time">剩余 <Time data={products.remainSeconds} /></View>
                            <Button onClick={this.onToCreateOrder.bind(this)} disabled={products.remainSeconds <= 0} className="right-btn">即刻购买</Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

