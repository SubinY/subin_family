import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtIcon } from "taro-ui";
import './NavigatorBar.scss'

export default class NavigatorBar extends Component {

  render() {
    return (
      <View className='navigation-wrap' onClick={this.toBack}>
        <AtIcon className='back-icon' value='chevron-left' size='26' color='#000'></AtIcon>
      </View>
    )
  }

  toBack() {
    let pages = Taro.getCurrentPages();
    console.log(pages)
    if (pages['0'].route === 'pages/good-detail/index') {
      Taro.switchTab({
        url: '/pages/home/index'
      })
      return;
    }
    Taro.navigateBack({
      delta: 1
    })
  }

}
