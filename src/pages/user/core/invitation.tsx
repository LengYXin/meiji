import { Image, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component } from '@tarojs/taro';
import { toJS } from 'mobx';
import Imgs from '../../../img';
import { User } from '../../../store';
import './index.less';


@observer
export default class extends Component {
    state = {
        isOpened: false,
        Code: { code: '' }
    }
    componentWillMount() { }

    componentWillReact() {
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    async  onGetInviteCode(data) {
        if (!data.code) {
            return
        }
        // console.log(data)˚ß
        if (data.status == "unUsed") {
            // this.setState({ isOpened: true, Code: data })
            const res = await Taro.showModal({
                title: "邀请码",
                content: data.code,
                showCancel: false,
                confirmText: "复制"
            });
            if (res.confirm) {
                this.onCopy(data.code)
            }
        } else {
            Taro.showToast({ title: "邀请码无效", icon: "none" })
        }
    }
    onCopy(code) {
        Taro.setClipboardData({
            data: code
        });
        // this.setState({ isOpened: false })
    }
    render() {
        const InviteCode = toJS(User.InviteCode)
        return (
            <View className="invitation">
                <View className="invitation-title">邀请码 </View>
                <View className="invitation-updata">
                    {InviteCode.map((data, index) => {
                        const src = data.beUsedMemberHeader || (data.status == "unUsed" ? Imgs.upYesImg : Imgs.upNoImg)
                        return <View className="updata-list" key={index}>
                            <Image className="list-img" src={src} onClick={this.onGetInviteCode.bind(this, data)} />
                            {data.status == 'null' && <Image className="list-img-s" src={Imgs.SuoImg} />}
                        </View>
                    })}
                </View>
            </View>

        )
    }
}
