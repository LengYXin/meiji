import { Button, View, Input, Image, Text } from "@tarojs/components";
import { observer } from "@tarojs/mobx";
import Taro, { Component, Config } from "@tarojs/taro";
import Vipleve from "../../../components/viplevel";
import Vipequities from "../../../components/vipequities";
import { AtNavBar } from "taro-ui";
import get from "lodash/get";
import "./index.less";
import Imgs from "../../../img";

@observer
export default class Center extends Component {
    config: Config = {
        backgroundTextStyle: "dark",
        navigationBarTitleText: "会员中心",
        navigationBarTextStyle: "white",
        navigationBarBackgroundColor: "#130c0e"
    };
    constructor() {
        super(...arguments);
        this.state = {
            invitationCode: "请输入邀请码",
            level: 0,
            pageType: 1
        };
    }
    componentWillMount() {}

    componentWillReact() {}

    componentDidMount() {}

    componentWillUnmount() {}

    searchChange = value => {
        this.setState({
            invitationCode: value
        });
    };

    changeLevel = level => {
        this.setState({
            level
        });
    };

    render() {
        // const data = [...Address.dataSource.PagingData];
        let viewDom = null;
        if (this.state.pageType === 0) {
            viewDom = (
                <View className="userinfo-box">
                    <View className="input-yzm">
                        <Input
                            type="text"
                            placeholder="请输入邀请码"
                            placeholderStyle="color: #DBC389;text-align: center;"
                        />
                        <Image src={Imgs.Right} mode="aspectFit" />
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
                        <Image src={Imgs.Right} mode="aspectFit" />
                        <View className="info-ctx">
                            <View className="member">
                                <Text>白叶挽青湖</Text>
                                <Image src={Imgs.expVip} mode="aspectFit" />
                            </View>
                            <View className="maturity">
                                您的会员总时长将在2019-01-02到期
                            </View>
                        </View>
                    </View>
                    <View className="line-box">
                        <View className="line-left">
                            <View className="point">
                                <Text>300</Text>
                            </View>
                        </View>
                        <View className="line-right" />
                    </View>
                    <View className="line-ctx">
                        <Text>体验会员</Text>
                        <Text>优享会员</Text>
                        <Text>尊享会员</Text>
                    </View>
                    <View className="content-box">还有815点升级</View>
                    <View className="triangle" />
                </View>
            );
        }

        return (
            <View className="doc-body">
                <View className="panel">
                    <View className="panel__content no-padding">
                        <View className="example-item">
                            <AtNavBar
                                className="atnavbar-head"
                                color="#ffffff"
                                title="会员中心"
                                leftIconType="chevron-left"
                            />
                        </View>
                    </View>
                </View>
                {viewDom}
                <Vipleve
                    level={this.state.level}
                    onChangeLevel={this.changeLevel.bind(this)}
                />
                <Vipequities level={this.state.level} />
                <View className="center-btn">
                    <Button onClick={() => this.payVip}>立即支付20元</Button>
                </View>
            </View>
        );
    }
}
