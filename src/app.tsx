import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro';
import 'taro-ui/dist/weapp/css/index.css';
import './app.less';
import Index from './pages/index';

import { User } from './store'
class App extends Component {

  /**
   * 原型：https://org.modao.cc/app/VStcRpaQSN1Czf4zRD4dzeeibeQZ953
   * 指定config的类型声明为: Taro.Configß
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/login/index',//登陆
      'pages/equity/index',//权益
      'pages/home/index',//首页
      'pages/sale/index',//预售
      'pages/order/create/index',//订单创建
      'pages/order/record/index',//订单记录
      'pages/register/index',//注册
      'pages/register/Invitation/index',//注册邀请
      'pages/user/address/index',//收货地址
      'pages/user/appendAddress/index',//添加地址
      'pages/user/security/index',//账户安全
      'pages/user/card/index',//卡卷
      'pages/user/core/index',//个人中心      
      'pages/other/payment/index',//支付提示

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#939393",
      selectedColor: "#DBC389",
      backgroundColor: "#0A0A0A",
      list: [
        {
          pagePath: "pages/home/index",
          text: "首页",
          iconPath: "img/home.png",
          selectedIconPath: "img/home-s.png"
        },
        {
          pagePath: "pages/sale/index",
          text: "美季",
          iconPath: "img/sale.png",
          selectedIconPath: "img/sale-s.png"
        },
        {
          pagePath: "pages/user/core/index",
          text: "我的",
          iconPath: "img/user.png",
          selectedIconPath: "img/user-s.png"
        }
      ]
    }
  }

  componentDidMount() {
  }

  componentDidShow() {

  }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
