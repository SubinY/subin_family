import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/home/index',
      'pages/about/index',
      'pages/good-detail/index',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#9CCDBD',
      selectedColor: '#00A66F',
      backgroundColor: '#FBFBFB',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '商城',
          iconPath: './assets/imgs/tab_home_normal@2x.png',
          selectedIconPath: './assets/imgs/tab_home_selected@2x.png',
        },
        {
          pagePath: 'pages/about/index',
          text: '关于',
          iconPath: "./assets/imgs/tab_mine_normal@2x.png",
          selectedIconPath: "./assets/imgs/tab_mine_selected@2x.png"
        },
      ],
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
