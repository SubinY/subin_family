import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, ScrollView, Image, Button, Input, Swiper, SwiperItem } from '@tarojs/components';
import './home.scss';
import CardItem from "./card-item/index";
import noDataImg from '../../assets/imgs/noData_placeholder.png';
import { post } from "../../common/services/http";
import { AtActivityIndicator, AtNoticebar, AtIcon } from 'taro-ui';
import ExplainModal from "../../components/ExplainModal/index";
import ListItem from "./list-item/index";
import product_image_default from '../../assets/imgs/product_image_default.png';


export default class Home extends Component {
  config = {
    navigationBarTitleText: '家具卖场',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: '#1FA68B',
    navigationBarTextStyle: 'white'
  };

  currPage = 1;
  totalPage = 1;
  currCatalog = 'factory';
  keyword = '';

  constructor() {
    super();
    this.state = {
      tempCatalog: [{
        title: '工厂产品',
        count: '*',
        value: 'factory',
        isChecked: true
      }, {
        title: '促销产品',
        count: '*',
        value: 'family'
      }],
      bannerInfo: [{
        showUrl: 'http://subin.fun/img/banner1.png',
        detailUrl: 'http://subin.fun/img/banner1-detail.png'
      }, {
        showUrl: 'http://subin.fun/img/banner2.png',
        detailUrl: 'http://subin.fun/img/banner2-detail.png'
      }],
      list: [],
      listMode: 'card',
      // keyword: '',
      loading: true,
      isFixed: false,
      explainModal: false
    };
  }

  componentWillMount() {
    this.getList();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <View className="home" style={{
      'margin-bottom': !this.state.loading && this.currPage === this.totalPage ? '10px' : '50px'
    }}>
        <View className="notice-bar">
          <AtNoticebar icon="streaming" showMore single onGotoMore={this.onGotoMore}>
            购前需知，产品解读
          </AtNoticebar>
        </View>
        <View className="search-wrap">
          <View className="search-bar">
            <Input placeholder="搜索理想家具" value={this.keyword} onInput={this.setKeyWord} />
            <AtIcon className="search-img" value="search" size="16" color="#9B9B9B" />
          </View>
          <Button className="search-btn" onClick={this.search.bind(this)}>
            搜索
          </Button>
        </View>
        <Swiper className="banner-content" indicatorColor="#999" indicatorActiveColor="#333" previousMargin="20px" nextMargin="20px" autoplay>
          {this.state.bannerInfo.map((b, index) => <SwiperItem className="banner-item" key={index} onClick={this.previewBanner.bind(this, b.detailUrl)}>
              <Image className="banner-img" src={b.showUrl || product_image_default} />
            </SwiperItem>)}
        </Swiper>
        <ScrollView className={`${this.state.isFixed ? 'fixed' : ''} scroll-view-x`} scrollX scrollWithAnimation scrollLeft="0">
          <View class="title-wrap">
            {this.state.tempCatalog.map((item, index) => {
            return <View key={index} onClick={this.slideSelected.bind(this, item)} className={`${item.isChecked ? 'on' : 'off'} scroll-view-item`}>
                  {item.title}({item.count})<View className="point">●</View>
                </View>;
          })}
          </View>
        </ScrollView>
        <View className={this.state.isFixed ? 'good-container' : ''}>
          <View className="goods-wrap">
            {this.state.list.length > 0 ? this.state.list.map((item, index) => {
            return <View key={index}>
                    {this.state.listMode === 'card' ? <CardItem good={item} /> : <ListItem good={item} />}
                  </View>;
          }) : <View className="empty-page">
                <Image src={noDataImg} />
                <View className="tips">
                  {this.state.loading ? '加载中...' : '暂无数据'}
                </View>
              </View>}
          </View>
        </View>
        {this.state.loading && <View className="more-loading">
            <AtActivityIndicator content="加载中..." color="#00a66f" />
          </View>}
        {!this.state.loading && this.state.list.length && this.currPage === this.totalPage && <View className="no-more">没得再拉啦！</View>}
        <ExplainModal isOpened={this.state.explainModal} onExplainClose={this.onExplainClose} />
        <Button className="float-btn list-btn" circle type="primary" onClick={this.changeMode}>
          <AtIcon value="list" size="26" color="#fff" />
        </Button>
        <Button className="float-btn" circle open-type="share">
          <AtIcon value="share" size="26" color="#fff" />
        </Button>
      </View>;
  }

  onShareAppMessage(e) {
    // const {
    //   content,
    //   title
    // } = this.state.content
    // const { swiperImgs } = this.getProps(content);
    if (e.from === 'button') {
      // 来自页面内转发按钮
      console.log(e);
    }
    return {
      title: '方米粒家具卖场',
      imageUrl: `../../assets/imgs/wxcode.png`
    };
  }

  previewBanner(url) {
    Taro.previewImage({
      urls: [url]
    });
  }

  setKeyWord(e) {
    const _keyword = e && e.target.value || '';
    this.keyword = _keyword;
  }

  search() {
    this.getList();
  }

  changeMode() {
    this.setState({
      listMode: this.state.listMode === 'card' ? 'list' : 'card'
    });
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

  onPageScroll(e) {
    if (e && e.scrollTop >= 240) {
      if (this.state.isFixed) return;
      this.setState({
        isFixed: true
      });
      return;
    }
    if (!this.state.isFixed) return;
    this.setState({
      isFixed: false
    });
  }

  /**
   * 点击时触发回调，重复点击无效
   * @param {Object} item
   */
  slideSelected(item) {
    this.currPage = 1;
    this.keyword = '';
    this.markSelect(item);
    this.pageScrollTo();
  }

  /**
   * 更新选中状态
   * @param {Object} item
   */
  markSelect(item) {
    const { tempCatalog } = this.state;
    tempCatalog.forEach(el => {
      if (el.value === item.value) {
        el.isChecked = true;
      } else {
        el.isChecked = false;
      }
    });

    this.setState({
      tempCatalog
    });
    this.currCatalog = item.value;
    this.getList();
  }

  onPullDownRefresh() {
    this.currPage = 1;
    this.getList(true);
  }

  onReachBottom() {
    if (this.currPage === this.totalPage) return;
    this.currPage++;
    this.getList();
  }

  // 回到顶部
  pageScrollTo() {
    if (Taro.pageScrollTo) {
      Taro.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    }
  }

  getList(isPull = false) {
    const url = 'web/get_products_by_status';
    const _params = {
      curr: this.currPage || 1,
      pageSize: 10,
      keyword: this.keyword || '',
      category: this.currCatalog || 'family'
    };
    this.setState({
      loading: true
    });
    post(url, _params).then(({ data, pages, total }) => {
      if (isPull) {
        Taro.stopPullDownRefresh();
      }
      this.totalPage = pages;

      const { tempCatalog } = this.state;
      tempCatalog.forEach(el => {
        if (this.currCatalog === el.value) {
          el.count = total;
          this.setState({
            tempCatalog,
            list: this.currPage === 1 ? [...data] : [...this.state.list, ...data],
            loading: false
          });
        }
      });
    }).catch(() => {
      this.setState({
        loading: false
      });
    });
  }
}