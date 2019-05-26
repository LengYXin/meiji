import { Button, View, Input, Image, Text } from "@tarojs/components";
import { observer } from "@tarojs/mobx";
import Taro, { Component, Config } from "@tarojs/taro";
import Vipleve from "../../../components/viplevel";
import Vipequities from "../../../components/vipequities";
import { AtNavBar } from "taro-ui";
import { User } from '../../../store';
import "./index.less";
import Imgs from "../../../img";
import get from 'lodash/get';

@observer
export default class Center extends Component {
    config: Config = {
        backgroundTextStyle: "dark",
        navigationBarTitleText: "会员中心",
        navigationBarTextStyle: "white",
        navigationBarBackgroundColor: "#130c0e"
    };
    state = {
        invitationCode: "",
        level: 0,
        pageType: 1,
        userInfo: User.isGetUserInfo,
    }
    componentWillMount() { }

    componentWillReact() { }
    componentDidShow() {
        const key = get(this.$router, 'params.key', '')
        this.setState({ pageType: parseInt(key) })
    }
    componentDidMount() { }

    componentWillUnmount() { }
    onSubmit() {
        User.onInviteCode(this.state.invitationCode)
        // Taro.switchTab({ url: "/pages/home/index" })
        // console.log(this.state)
    }
    searchChange = value => {
        this.setState({
            invitationCode: value
        });
    };

    changeLevel = level => {
        console.log("TCL: Center -> componentWillUnmount -> level", level)
        this.setState({
            level
        });
    };

    vipResult = (type) => {
        return Imgs[type];
    };

    onPayVip = (type) => {
        User.onPayVip(type)
    }
    render() {
        const Info = { ...User.Info }
        let viewDom;
        let uppoints = function (vipType) {
            let ponint = 0;
            if (vipType === 'expVip') {
                ponint = 1000 - parseInt(Info.upgradepoints);
            } else if (vipType === 'enjoyVip') {
                ponint = 4000 - parseInt(Info.upgradepoints);
            }
            return ponint;
        }
        let percent = parseInt(Info.upgradepoints) / 4000;
        let price = function (level) {
            switch (level) {
                case 0:
                    return '20'
                case 1:
                    return '399'
                case 2:
                    return '3999'
            }
        }
        console.log("TCL: Center -> render -> this.state.pageType", this.state.pageType)
        if (this.state.pageType === 0) {
            viewDom = (
                <View className="userinfo-box">
                    <View className="input-yzm">
                        <Input
                            type="text"
                            placeholder="请输入邀请码"
                            placeholderStyle="color: #DBC389;text-align: center;"
                            onInput={this.searchChange}
                        />
                        <Image onClick={this.onSubmit.bind(this)} src={Imgs.Right} mode="aspectFit" />
                    </View>
                    <View className="orbox">
                        <View className="or-line" />
                        <Text>或</Text>
                    </View>
                    <View className="triangle" />
                </View>
            );
        } else {
            viewDom = (
                <View className="userinfo-box">
                    <View className="info">
                        <Image src={Info.avatarUrl} mode="aspectFit" />
                        <View className="info-ctx">
                            <View className="member">
                                <Text>{Info.nickName}</Text>
                                <Image src={Imgs[Info.vipType]} mode="aspectFit" />
                            </View>
                            <View className="maturity">
                                您的会员总时长将在{Info.vipExpireTimeStr} 到期
                            </View>
                        </View>
                    </View>
                    <View className="line-box">
                        <View className="line-left" style={{ width: percent + '%' }}>
                            <View className="point">
                                <Text>{Info.upgradepoints}</Text>
                            </View>
                        </View>
                        <View className="line-right" />
                    </View>
                    <View className="line-ctx">
                        <Text>体验会员</Text>
                        <Text>优享会员</Text>
                        <Text>尊享会员</Text>
                    </View>
                    <View className="content-box">还有{uppoints(Info.vipType)}点升级</View>
                    <View className="triangle" />
                </View>
            );
        }

        return (
            <View className="doc-body">

                {viewDom}
                <Vipleve
                    level={this.state.level}
                    vipType={Info.vipType}
                    upgradepoints={Info.upgradepoints}
                    onChangeLevel={this.changeLevel.bind(this)}
                />
                <Vipequities level={this.state.level} />
                <View className="center-btn">
                    <Button onClick={() => this.onPayVip(this.state.pageType === 0 ? 'expVip' : Info.vipType)}>立即支付{price(this.state.level)}元</Button>
                </View>
            </View>
        );
    }
}
