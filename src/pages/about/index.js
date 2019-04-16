import Taro, { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { RightIcon } from '../../components/RightIcon';
import { AtIcon } from 'taro-ui';
import ExplainModal from '../../components/ExplainModal';

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于',
    navigationBarBackgroundColor: '#1FA68B',
    navigationBarTextStyle: 'white',
    backgroundColor: '#F8F8F8'
  };

  constructor(props) {
    super(props);
    this.state = {
      explainModal: false
    };
  }

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='about'>
        <View className='card-wrp'>
          <View className='flex-wrp card-list' onClick={this.onGotoMore}>
            <View className='flex-item list-icon'>
              <AtIcon value='streaming' size='26' color='#2b2b2b'></AtIcon>
            </View>
            <View className='flex-wrp list-item'>
              <View className='flex-item list-title'>
                <Text className='text'>购前需知</Text>
              </View>
              <View className='flex-item list-content'>
                <View className='arrow'>
                  <RightIcon />
                </View>
                <View className='item-details'>
                  {/* <Text>123</Text> */}
                </View>
              </View>
            </View>
          </View>
          <View className='flex-wrp card-list' onClick={this.previewimage}>
            <View className='flex-item list-icon'>
              <AtIcon value='message' size='26' color='#2b2b2b'></AtIcon>
            </View>
            <View className='flex-wrp list-item'>
              <View className='flex-item list-title'>
                <Text className='text'>店主微信二维码</Text>
              </View>
              <View className='flex-item list-content'>
                <View className='arrow'>
                  <RightIcon />
                </View>
                <View className='item-details'>
                  {/* <Text>123</Text> */}
                </View>
              </View>
            </View>
          </View>
          <View className='flex-wrp card-list'>
            <View className='flex-item list-icon'>
              <AtIcon value='check' size='26' color='#2b2b2b'></AtIcon>
            </View>
            <View className='flex-wrp list-item'>
              <View className='flex-item list-title'>
                <Text className='text'>版本号</Text>
              </View>
              <View className='flex-item list-content'>
                <View className='arrow'>
                  <Text>V1.0</Text>
                </View>
                {/* <View className='item-details'>
                  <Text>V1.0</Text>
                </View> */}
              </View>
            </View>
          </View>
        </View>
        <ExplainModal
          isOpened={this.state.explainModal}
          onExplainClose={this.onExplainClose}
        />
      </View>
    );
  }

  onGotoMore() {
    this.setState({
      explainModal: true
    });
  }

  onExplainClose() {
    this.setState({
      explainModal: false
    });
  }

  previewimage() {
    Taro.previewImage({
      urls: [`http://subin.fun/img/wx-code.png`]
    });
    // Taro.getSetting().then(res => {
    //   if (res.authSetting && !res.authSetting['scope.writePhotosAlbum']) {
    //     Taro.authorize({
    //       scope: 'scope.writePhotosAlbum'
    //     })
    //       .then(() => {
    //         this.downLoadFile()
    //       })
    //       .catch(() => {
    //         Taro.showToast('您未允许授权保存到相册，请前往设置', 3000);
    //       });
    //     return;
    //   }
    //   this.downLoadFile()
    // });
  }
}
