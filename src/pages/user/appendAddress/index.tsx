import { Button, Form, Picker, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import lodash from 'lodash';
import { AtInput } from 'taro-ui';
import { Address } from '../../../store';
import './index.less';

@observer
export default class extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *  
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '添加地址'
    }

    componentWillMount() { }

    componentWillReact() {
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() {
        Address.onGetProvinces();
        if (!lodash.isEmpty(Address.Details)) {
            this.setState({ ...Address.Details })
        }
    }

    componentDidHide() { }

    state = {
        id: '',
        receiver: '',//收件人
        phone: '',
        province: '',
        city: '',
        area: '',
        address: '',
        default: true,
        range: [0, 0, 0]//选这器
    }
    async onSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        if (this.state.receiver && this.state.phone && this.state.province && this.state.address) {
            Taro.showLoading({ title: '' });
            const res = await Address.onSaveAddress({
                id: this.state.id,
                receiver: this.state.receiver,//收件人
                phone: this.state.phone,
                province: this.state.province,
                city: this.state.city,
                area: this.state.area,
                address: this.state.address,
                default: true,
            });
            if (res) {
                Taro.showToast({ title: "保存成功" });
                Taro.navigateBack();
            } else {
                Taro.showToast({ title: "保存失败", icon: "none" });
            }
        } else {
            Taro.showToast({ title: "请填写完数据", icon: "none" });

        }

    }
    onUpdateState(key, value) {
        if (key) {
            if (key === 'addressObj') {
                return this.setState({
                    ...value
                })
            }
            this.setState({
                [key]: value
            })
        }
    }
    AddressMap = new Map<number, { keys: any[], values: any[] }>();
    /**
     * 获取省份
     * @param key 
     */
    onGetAddress(key = 86) {
        if (key === 0) {
            return []
        }
        let values: string[] = [];
        let keys: any[] = [];
        if (this.AddressMap.has(key)) {
            const address = this.AddressMap.get(key)
            values = lodash.get(address, 'values', []);
            keys = lodash.get(address, 'keys', []);
        } else {
            lodash.map(lodash.get(Address.Provinces, key, {}), (value, key) => {
                values.push(value);
                keys.push(key);
            });
            if (values.length > 0) {
                // 设置缓存
                this.AddressMap.set(key, { keys, values })
            }
        }
        return {
            keys,
            values
        }
    }
    onAddressKey(keys, index = 0) {
        return lodash.get(keys, index, 0);
    }
    onChange(event) {
        let { range } = this.state;
        const column = lodash.get(event, 'detail.column', null)
        const value = lodash.get(event, 'detail.value', null);
        range = lodash.update(range, column, x => value);
        if (column == 0) {
            range = lodash.update(range, 1, x => 0);
            range = lodash.update(range, 2, x => 0);
        }
        if (column == 1) {
            range = lodash.update(range, 2, x => 0);
        }
        this.setState({ range })
    }
    render() {
        const { receiver, phone, range, province, city, area, address } = this.state;
        const PCAStr = province ? `${province} ${city} ${area}` : ''
        const provinceList = this.onGetAddress();
        const provinceKey = this.onAddressKey(provinceList.keys, this.state.range[0]);
        const cityList = this.onGetAddress(provinceKey);
        const cityKey = this.onAddressKey(cityList.keys, this.state.range[1]);
        const areaList = this.onGetAddress(cityKey);
        const addressObj = {
            province: lodash.get(provinceList.values, this.state.range[0]),
            city: lodash.get(cityList.values, this.state.range[1]),
            area: lodash.get(areaList.values, this.state.range[2]),
        }//`${lodash.get(province.values, this.state.range[0])} ${lodash.get(city.values, this.state.range[1])} ${lodash.get(area.values, this.state.range[2])}`
        // console.log(addressObj)
        return (
            <View className="appendAddress">
                <Form
                    onSubmit={this.onSubmit.bind(this)}
                >
                    <AtInput
                        name='receiver'
                        title='收货人'
                        type='text'
                        placeholder='名字'
                        value={receiver}
                        onChange={this.onUpdateState.bind(this, 'receiver')}
                    />
                    <AtInput
                        name='phone'
                        title='手机号码'
                        type='phone'
                        placeholder='11位手机号'
                        value={phone}
                        onChange={this.onUpdateState.bind(this, 'phone')}
                    />

                    <Picker
                        mode='multiSelector'
                        range={[provinceList.values as any, cityList.values, areaList.values]}
                        value={range}
                        onChange={this.onUpdateState.bind(this, 'addressObj', addressObj)}
                        onColumnChange={this.onChange.bind(this)}
                    >
                        <AtInput
                            name='PCAStr'
                            title='所在地区'
                            type='text'
                            placeholder='选择所在地区'
                            value={PCAStr}
                            disabled
                            onChange={this.onUpdateState.bind(this, '')}
                        />
                    </Picker>
                    <AtInput
                        name='address'
                        title='收货地址'
                        type='text'
                        placeholder='详细街道楼牌号等'
                        value={address}
                        onChange={this.onUpdateState.bind(this, 'address')}
                    />
                    <View className="btn">
                        <Button formType='submit'>保存</Button>
                    </View>
                </Form>
            </View>
        )
    }
}