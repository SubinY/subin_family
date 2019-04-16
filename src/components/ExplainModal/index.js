import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { Text, View, Button } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

import './ExplainModal.scss'

export default class ExplainModal extends Component {

  static propTypes = {
    isOpened: PropTypes.bool,
    onExplainClose: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {}


  render () {
    return (
      <View>
        <AtModal isOpened={this.props.isOpened}>
          <AtModalHeader>
            购买须知
          </AtModalHeader>
          <AtModalContent>
            <View className='bold'>
              什么是工厂产品？
            </View>
            <View className='mb10'>
              工厂直接进货，工厂价格，无平台佣金，无中间商差价，便宜划算；有些产品在详情页面里提供了对应淘宝天猫店的同款产品链接，可以自行了解价格差异
            </View>
            <View className='bold'>
              什么是促销产品？
            </View>
            <View className='mb10'>
              本产品一般为那种滞留、磨损产品，但不会影响使用的产品；比如真皮沙发，运送过程有个角磨掉漆了。这类产品在详情页面中可以详细看到磨损程度（我们不卖不能使用的产品），此类产品提供量很少，一般都会售完。存在那种原价格很高，但是磨损后价格比较低，性价比很高。
            </View>
            <View className='bold'>
              什么客户购买促销产品的多？
            </View>
            <View className='mb10'>
              较多有出租房子的朋友，购买促销产品，高质量高品牌的家居用品，只是在运送过程磨损一点，不影响使用和美观。
            </View>
            <View className='bold'>
              什么客户购买工厂产品的多？
            </View>
            <View className='mb10'>
              刚需，不走网店，省下很多钱。
            </View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.onClose}>
              关闭
            </Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }

  onClose() {
    this.props.onExplainClose()
  }
}
