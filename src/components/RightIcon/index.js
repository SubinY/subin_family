import Taro, { Component } from '@tarojs/taro';
import { Image } from '@tarojs/components';

import rightIcon from '../../assets/imgs/right@2x.png';

export default class RightIcon extends Component {

  render() {
    return (
      <Image src={rightIcon} style='width:16px;height:16px;position: relative;top:3px;'></Image>
    )
  }

}
