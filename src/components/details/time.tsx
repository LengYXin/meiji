import { Text } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import delay from 'lodash/delay';
import './index.less';
import { DateFormat } from '../../../src/store/Regular';

export default class extends Component<{ data: any }, any> {
    time = this.props.data;
    state = {
        time: "00:00:00"
    }
    Unmount = false;
    DateFormat(time) {
        if (time > 86400) {
            const newTime = 1546272000000 + (time - 86400) * 1000;
            // console.log(newTime)
            return DateFormat(newTime, 'dd天');
        }
        return DateFormat(time * 1000, 'hh:mm:ss')
    }
    /**
     * 倒计时
     */
    onTime = () => {
        if (this.Unmount) {
            return
        }
        if (this.time > 1) {
            this.time -= 1;
            this.setState({ time: this.DateFormat(this.time) }, () => {
                delay(this.onTime, 1000);
            })
        } else {
            this.setState({ time: "00:00:00" })
        }
    }
    componentDidMount() {
        this.onTime()
    }
    componentWillUnmount() {
        this.Unmount = true;
    }
    render() {
        return (
            <Text>
                {this.state.time}
            </Text>
        )
    }
}

