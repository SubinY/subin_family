import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";


import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

import { View, Tabbar, TabbarContainer, TabbarPanel } from '@tarojs/components';
import Taro from '@tarojs/taro-h5';
import { Router } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});
class App extends Component {
  state = {
    __tabs: {
      color: '#9CCDBD',
      selectedColor: '#00A66F',
      backgroundColor: '#FBFBFB',
      borderStyle: 'white',
      list: [{
        pagePath: "/pages/home/index",
        text: '商城',
        iconPath: require("././assets/imgs/tab_home_normal@2x.png"),
        selectedIconPath: require("././assets/imgs/tab_home_selected@2x.png")
      }, {
        pagePath: "/pages/about/index",
        text: '关于',
        iconPath: require("././assets/imgs/tab_mine_normal@2x.png"),
        selectedIconPath: require("././assets/imgs/tab_mine_selected@2x.png")
      }],
      mode: "hash",
      basename: "/",
      customRoutes: {}
    }
  };


  config = {
    pages: ["/pages/home/index", "/pages/about/index", "/pages/good-detail/index"],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: { color: '#9CCDBD', selectedColor: '#00A66F', backgroundColor: '#FBFBFB', borderStyle: 'white', list: [{ pagePath: "/pages/home/index", text: '商城', iconPath: require("././assets/imgs/tab_home_normal@2x.png"), selectedIconPath: require("././assets/imgs/tab_home_selected@2x.png") }, { pagePath: "/pages/about/index", text: '关于', iconPath: require("././assets/imgs/tab_mine_normal@2x.png"), selectedIconPath: require("././assets/imgs/tab_mine_selected@2x.png") }], mode: "hash",
      basename: "/",
      customRoutes: {}
    }
  };

  componentDidMount() {
    this.componentDidShow();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <TabbarContainer>

                  <TabbarPanel>
                    
            <Router mode={"hash"} publicPath={"/"} routes={[{
          path: '/pages/home/index',
          componentLoader: () => import( /* webpackChunkName: "home_index" */'./pages/home/index'),
          isIndex: true
        }, {
          path: '/pages/about/index',
          componentLoader: () => import( /* webpackChunkName: "about_index" */'./pages/about/index'),
          isIndex: false
        }, {
          path: '/pages/good-detail/index',
          componentLoader: () => import( /* webpackChunkName: "good-detail_index" */'./pages/good-detail/index'),
          isIndex: false
        }]} customRoutes={{}} basename={"/"} />
            
                  </TabbarPanel>

                  <Tabbar conf={this.state.__tabs} homePage="pages/home/index" router={Taro} />

                </TabbarContainer>;
  }

  componentWillUnmount() {
    this.componentDidHide();
  }

  constructor(props, context) {
    super(props, context);

    Taro._set$app(this);
  }

  componentWillMount() {
    Taro.initTabBarApis(this, Taro);
  }

}

Nerv.render(<App />, document.getElementById('app'));