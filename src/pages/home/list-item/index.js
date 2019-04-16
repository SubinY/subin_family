import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { Text, View, Button, Image } from '@tarojs/components';
import product_image_default from '../../../assets/imgs/product_image_default.png';

import './list-item.scss';
import { BASE_URL } from '../../../config/config';
import { AtSwipeAction } from 'taro-ui';

export default class ListItem extends Component {
  static propTypes = {
    good: PropTypes.object
  };

  static defaultProps = {
    good: {
      content: ''
    }
  }

  static externalClasses = ['out-class'];

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
    const imgUrl = this.getImgUrl(this.props.good.content);
    return (
      <View className='out-class' onClick={this.goDetailPage}>
        <AtSwipeAction
          autoClose
          onClick={this.share.bind(this)}
          disabled
          options={[
            {
              text: '分享商品',
              style: {
                backgroundColor: '#00a66f'
              }
            }
          ]}
        >
          <View className='good-item-wrap'>
            <View className='flex-l image-wrap'>
              <Image className='image-show' src={imgUrl} />
            </View>
            <View className='flex-c title-wrap'>
              <Text className='title'>{this.props.good.title}</Text>
            </View>
            <View className='flex-r price-wrap'>
              <Text className='price'>促销价¥{this.props.good.price}</Text>
            </View>
          </View>
        </AtSwipeAction>
      </View>
    );
  }

  share() {

  }

  getImgUrl(content) {
    if (!content) return product_image_default;
    const regex = /(\/images\/ueditor\/.+?)(.png|.jpg|.jepg)/;
    const imgUrl = content.match(regex)[0] || '';
    return imgUrl ? `${BASE_URL}${imgUrl}` : product_image_default;
  }

  goDetailPage(e) {
    const matchId = ['buy_btn'];
    if (matchId.includes(e.target.dataset.id)) return;
    Taro.navigateTo({
      url: `/pages/good-detail/index?id=${this.props.good._id}`
    });
  }
}
