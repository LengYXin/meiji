import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import './index.less';
import { AtActivityIndicator } from 'taro-ui';
export default class extends Component<{ visible: boolean }, any> {
    render() {
        const { visible } = this.props;
        return (
            <View className="loading">
                {visible && <AtActivityIndicator content='loading...' />}
            </View>
        )
    }
}

