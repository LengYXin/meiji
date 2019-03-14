import { Button, Image, View, Text } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import get from 'lodash/get';
import head from 'lodash/head';
import remove from 'lodash/remove';
import { AtProgress } from 'taro-ui';
import { Products } from '../../store';
import Imgs from '../../img';

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
        const disabled = (!products.canBuy) || products.remainSeconds <= 0;
        const imgSrc = products.remainSeconds <= 0 ? Imgs.TimeOut : Imgs.ProSale
        remove(pictures, (value, index) => { return index == 0 })
        return (
            <View className='home'>
                <View className="home-nav-img">
                    <Image
                        src={imghead}
                        mode="widthFix" />
                </View>
                <View className="home-content">
                    <View className="content-header">
                        <View className="header-title">
                            {products.productName}

                        </View>
                        <Image
                            className='shop-img'
                            src={imgSrc}
                            mode='widthFix' />
                    </View>
                    <View className="content-address">产地：{products.productOrigin}</View>
                    <View className="content-text">
                        {products.introduction}
                    </View>
                </View>
                <View className="div-ider"></View>
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
                            src={imgSrc}
                            mode='widthFix' /></View>
                    <View className="shop-address">产地：{products.productOrigin}</View>
                    <View className="shop-progress">
                        <View className='proportion'>
                            <AtProgress className='proportion-progress' percent={Proportion} color='#DBC389' isHidePercent />
                        </View>
                        <View className='stockCount'>{products.salesCount}/{products.stockCount}份</View>
                    </View>
                    <View className="shop-qian">
                        <View >
                            <View className="time"><Text className="text">剩余</Text> <Time key={products.remainSeconds} data={products.remainSeconds} /></View>
                        </View>
                        <View className="bottom-btn">
                            <View className="qian-left">
                                <View className="left-num">{price}</View>
                                <View className="left-type">全款预付</View>
                            </View>
                            <View className="qian-right">
                                <Button onClick={this.onToCreateOrder.bind(this)} disabled={disabled} className="right-btn">即刻购买</Button>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="div-ider"></View>
            </View>
        )
    }
}

