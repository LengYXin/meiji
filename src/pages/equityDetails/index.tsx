import { Button, Text, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
@observer
export default class extends Component {

  config: Config = {
    navigationBarTitleText: '详细权益'
  }
  render() {
    return (
      <View className='equityDet'>
        <View className='equityDet-brief'>  
            欢迎您加入“牧の美季”成为我们的会员，我们的会
        员体系分为三级，满足相应条件后可升级会员，高级
        别会员可以享受更多权益。
        </View>
        <View className='equityDet-headline'>
        一、体验会员
        </View>
        <View className='equityDet-p'>
          体验会员可通过输入邀请码获得或直接购买￥20/月
          获取。
        </View>
        <View className='equityDet-p'>
          每个邀请码可兑换1个月体验会员，每个账号每年最
          多使用3次邀请码。
        </View>
        <View className='equityDet-p'>  
          权益：
        </View>
        <View className='equityDet-p'>
          可购买商城内部分商品。
        </View>  
        <View className='equityDet-headline'>
        二、优享会员
        </View>
        <View className='equityDet-p'> 
          平台累计购物满1000元（不含退款）。
        </View>
        <View className='equityDet-p'>    
           购买￥399/年优享会员。 
        </View>
        <View className='equityDet-p'>     
           同时满足以上两条，升级为优享会员。
        </View>
        <View className='equityDet-p'>  
        权益：
        </View>
        <View className='equityDet-p'>   
        可购买商城内专属商品，紧俏商品优先购买。
        </View>
        <View className='equityDet-p'>  
         不满意全额退款服务。 
        </View>
        <View className='equityDet-p'>  
         每年至少5次免费新品品尝机会。 
        </View>
        <View className='equityDet-p'>   
         每月获得两枚邀请码,被邀请人成功下单并签收后可 获得第三枚。
        </View>
        <View className='equityDet-headline'>
        二、尊享会员
        </View>
        <View className='equityDet-p'>  
          平台累计购物满3000元（不含退款）。
        </View>
        <View className='equityDet-p'>    
           参与新品尝鲜并参加决策，决策命中4次以上。 
        </View>
        <View className='equityDet-p'>     
           购买￥3999/年尊享会员。 
        </View>
        <View className='equityDet-p'>     
           同时满足以上三条，升级为尊享会员。 
        </View>
        <View className='equityDet-p'>     
           权益： 购买商城内商品无限购。
        </View>  
        <View className='equityDet-p'>  
           不满意全额退款服务。 
        </View>
        <View className='equityDet-p'>     
           每月获得3枚邀请码。 
        </View>
        <View className='equityDet-p'>     
           顺丰专送或上门专送服务。 
        </View>
        <View className='equityDet-p'>     
           每年至少5次免费新品品尝机会。 
        </View>
        <View className='equityDet-p'>  
          每年免费参加1次高端酒会/美食之旅。
        </View>
      </View>
    )
  }
}
