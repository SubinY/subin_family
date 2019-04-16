import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { Text, View, Swiper, SwiperItem, Image } from '@tarojs/components';

import './good-detail.scss';
import { post } from "../../common/services/http";
import product_image_default from '../../assets/imgs/product_image_default.png';
import center_link from '../../assets/imgs/pro_center_link@2x.png';
import wxcode from '../../assets/imgs/wxcode.png';
import { BASE_URL } from "../../config/config";
import { htmlReplaceText } from "../../common/utils/markdown";
import { AtButton, AtToast, AtCurtain } from 'taro-ui';
import { NavigatorBar } from "../../components/NavigatorBar/index";

export default class GoodDetailPage extends Component {
  config = {
    navigationBarTitleText: '商品详情',
    navigationStyle: 'custom',
    usingComponents: {
      wemark: '../../wemark/wemark'
    }
  };

  constructor() {
    super();
    if (this.$router.params) {}
    this.state = {
      goodId: this.$router.params.id,
      content: {},
      toastOpen: false,
      curtainOpen: false
    };
  }

  componentWillMount() {
    this.getDetail();
  }

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      content,
      title,
      from,
      price,
      shopPrice,
      description
    } = this.state.content;
    const { swiperImgs, warehouse } = this.getProps(content);
    let detailMark = htmlReplaceText(content);
    return <View className="product-detail">
        <NavigatorBar />
        <Swiper className="detail-swiper" indicatorColor="#ccc" indicatorActiveColor="#fff" circular indicatorDots>
          {swiperImgs.length ? swiperImgs.map((url, i) => <SwiperItem key={i} className="swiper-item">
                <Image src={`${BASE_URL}${url}`} />
              </SwiperItem>) : <SwiperItem className="swiper-item">
              <Image src={product_image_default} />
            </SwiperItem>}
        </Swiper>
        <View className="detail-content">
          <View className="price-wrap">
            <View className="current-price">
              ¥<Text>{price}</Text>
            </View>
            {shopPrice && <View className="origin-price">网上价格:¥{shopPrice}</View>}
            {description && <View className="origin-price orange">
                货物情况: {description}
              </View>}
          </View>
          <View className="title-wrap">
            <Text className="title">{title}</Text>
            {from && <Image className="title-share-pic" src={center_link} onClick={this.copy.bind(this, from)} />}
          </View>
          <View className="sale-wrap">
            <View className="transport">
              <View className="tran-item">所在仓库: {warehouse}</View>
            </View>
          </View>
        </View>
        <View className="image-content">
          <Text className="img-title">图文详情</Text>
          <View className="desc">
            <wemark md={detailMark} link highlight type="wemark" />
          </View>
        </View>
        {/* 底部操作栏 */}
        <View className="detail-bottom-btns">
          <View className="btn-wrap">
            <AtButton className="at-button order-btn" type="primary" onClick={this.shareFriend} open-type="share">
              转发该商品
            </AtButton>
          </View>
          <View className="btn-wrap">
            <AtButton className="at-button order-btn" type="primary" openType="contact">
              立即咨询
            </AtButton>
          </View>
        </View>
        <AtToast className="copy-tips" isOpened={this.state.toastOpen} onClose={this.onToastClose} text="已复制该商品的官网地址，请打开浏览器输入查看" />
        <AtCurtain isOpened={this.state.curtainOpen} onClose={this.onCurtainClose.bind(this)}>
          <Image style="width:100%; height: 400px" src={wxcode} onLongPress={this.previewimage} />
        </AtCurtain>
      </View>;
  }

  onShareAppMessage(e) {
    const {
      content,
      title
    } = this.state.content;
    const { swiperImgs } = this.getProps(content);
    if (e.from === 'button') {
      // 来自页面内转发按钮
      console.log(e);
    }
    return {
      title: title || '方米粒商品',
      imageUrl: `${BASE_URL}${swiperImgs[0]}`
    };
  }

  getProps(content) {
    if (!content) return {};
    const imgReg = /(\/images\/ueditor\/.+?)(.png|.jpg|.jepg)/g,
          warehouseReg = /所在地[:：].+?</;
    const imgUrls = content.match(imgReg) || '',
          warehouse = content.match(warehouseReg)[0].split(/所在地[:：]/)[1].replace('<', '');
    return {
      swiperImgs: imgUrls ? imgUrls : [],
      warehouse: warehouse
    };
  }

  longtouch() {
    console.log(1);
  }

  getDetail() {
    post(`products_details/${this.state.goodId}`, {}).then(({ data }) => {
      this.setState({
        content: data
      });
    }).catch(() => {});
  }

  // 分享淘宝商品链接
  copy(data, e) {
    e.preventDefault();
    Taro.setClipboardData({
      data: data
    }).then(() => {
      Taro.hideToast();
      this.setState({
        toastOpen: true
      });
    });
  }

  onToastClose() {
    this.setState({
      toastOpen: false
    });
  }

  onCurtainOpen() {
    this.setState({
      curtainOpen: true
    });
  }

  onCurtainClose() {
    this.setState({
      curtainOpen: false
    });
  }

  shareFriend(e) {
    console.log(e);
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

  downLoadFile() {
    Taro.downloadFile({ url: `http://subin.fun/img/wx-code.png` }).then(res => {
      Taro.saveImageToPhotosAlbum({
        filePath: res.tempFilePath
      }).then(() => {
        Taro.previewImage({
          urls: [res.tempFilePath]
        });
      });
    });
  }
}