import { Image, Text, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import includes from 'lodash/includes';

import Imgs from '../../img';
import './index.less';

export default class extends Component<any, any> {
    onToDetails(item, canBuy) {
        // Taro.navigateTo({ url: `/pages/details/index?key=${item.productCode}&canBuy=${canBuy}` });
        this.props.onToDetails(item, canBuy);
    }
    render() {
        const data = this.props.data;
        if (!data) {
            return <View></View>
        }
        const productLineInfoes = data.productLineInfoes || [];
        return (
            <View >
                <View className="time-title">
                    <Image src={Imgs.Time} mode="aspectFit" />
                    <View className="title-box">
                        <Text>{data.timeLineName}</Text>
                        <Image
                            src={data.timeLineOut === "预售" ? Imgs.ProSale : Imgs.Gj}
                            mode="aspectFit"
                        />
                    </View>
                </View>
                <View className="products-box">
                    {productLineInfoes.map(item => {
                        return (
                            <View
                                className="products-items"
                                key={item.productCode}
                                onClick={this.onToDetails.bind(
                                    this,
                                    item,
                                    data.isNowTimeLine
                                )}
                            >
                                <Image
                                    // src={get(item.pictures, 0, "")}
                                    src={item.picurl}
                                    mode="aspectFit"
                                />
                                <View className="title">
                                    {item.proTimeLineName}
                                </View>
                                <View className={`info ${includes(item.storeRemark, '剩余') && 'stock'}`}>
                                    {item.storeRemark}
                                </View>

                            </View>
                        );
                    })}
                </View>
            </View>
        )
    }
}

