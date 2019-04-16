import Taro from '@tarojs/taro';
import { USER_COOKIE, BASE_URL } from '../../config/config';

/**
 * 判断value是否为undefined或者null
 * @param value
 */
const isNotNil = (value) => {
  return (typeof (value) !== 'undefined') && value !== null
}

const hasCookie = () => {
  const cookie = Taro.getStorageSync(USER_COOKIE) || 's%3AAx-GLYL3fzxQtBRwrjguJJ2FjHSvrYTG.I8zIbS20c0GNY5wiNzYnMqgepVhkUOZnmATB8zH2kiM';
  const obj = cookie ? { cookie: cookie } : null;
  return obj;
};

const authLogin = () => {
  Taro.showModal({
    titke: '请登录'
  });
};

export const post = (endpoint, params) => {
  const title = '正在加载...';
  Taro.showLoading({
    title: title,
    mask: true
  });
  return new Promise((resolve, reject) => {
    const cookies = hasCookie();
    if (!cookies) {
      authLogin();
      return;
    }
    Taro.request({
      url: `${BASE_URL}${endpoint}`,
      method: 'POST',
      data: params,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      }
    })
      .then(res => {
        const { data, total, pages } = res;
        Taro.hideLoading();
        if (data) {
          // 分页接口
          if (isNotNil(total) && isNotNil(pages)) {
            return resolve(data);
          }
          // 一般接口
          return resolve(data);
        }
        Taro.showModal({
          titke: '未知错误'
        });
        return reject(data);
      })
      .catch(() => {
        Taro.hideLoading();
        return reject({ desc: '请求失败，请检查网络' });
      });
  });
};

export const get = (url, endpoint) => {
  const title = '正在加载...';
  Taro.showLoading({
    title: title,
    mask: true
  });
  return new Promise((resolve, reject) => {
    Taro.request({
      url: endpoint ? `${BASE_URL}${endpoint}` : url,
      method: 'GET',
      header: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        const { data } = res;
        Taro.hideLoading();
        if (data) {
          // 一般接口
          return resolve(data);
        }
        Taro.showModal({
          titke: '未知错误'
        });
        return reject(data);
      })
      .catch(() => {
        Taro.hideLoading();
        return reject({ desc: '请求失败，请检查网络' });
      });
  });
};

