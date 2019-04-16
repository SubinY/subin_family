import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import PropTypes from 'prop-types';
import { Text, View, Button, Image } from '@tarojs/components';
import product_image_default from '../../../assets/imgs/product_image_default.png';

import './card-item.scss';
import { BASE_URL } from "../../../config/config";

export default class CardItem extends Component {

  static propTypes = {
    good: PropTypes.object
  };

  static defaultProps = {
    good: {
      content: ''
    }
  };

  static externalClasses = ['out-class'];

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
    const imgUrl = this.getImgUrl(this.props.good.content);
    return <View className="out-class good-item-wrap" onClick={this.goDetailPage}>
        <View className="image-wrap">
          <Image className="image-show" src={imgUrl} />
        </View>
        <View className="title-wrap">
          <Text className="title">
            {this.props.good.title}
          </Text>
        </View>
        <View className="detail-wrap">
          <View className="price-wrap">
            <View className="current-price">
              促销价¥
              <Text>
                {this.props.good.price}
              </Text>
              <View className="origin-price">
                网上原价:¥{this.props.good.shopPrice}
              </View>
            </View>
          </View>
          <View className="remain-num">
            货物情况：
            <Text>
              {this.props.good.description}
            </Text>
          </View>
          <Button data-id="buy_btn" type="primary" className="buy-btn" openType="contact">
            立即联系
          </Button>
        </View>
      </View>;
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