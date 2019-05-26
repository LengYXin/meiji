import { View } from "@tarojs/components";
import Taro, { Component } from "@tarojs/taro";
import "./swapType.less";
import { AtCheckbox } from "taro-ui";

export default class extends Component<any, any> {
  state = {
    checkedList: ["list1"]
  };
  handleChange(value) {
    this.setState({
      checkedList: value
    });
  }
  render() {
    const checkboxOption = [
      {
        value: "list1",
        label: "iPhone X"
      },
      {
        value: "list2",
        label: "HUAWEI P20"
      },
      {
        value: "list3",
        label: "OPPO Find X"
      },
      {
        value: "list4",
        label: "vivo NEX"
      }
    ];
    const typelist = this.props.typelist || checkboxOption;
    return (
      <View className='swap-type'>
        <AtCheckbox
          options={typelist}
          selectedList={this.state.checkedList}
          onChange={this.handleChange.bind(this)}
          className='swap-type-checkbox'
        />
      </View>
    );
  }
}
