//封装的axios的post，get请求
import { LoadingBar } from 'iview'
import axios from 'axios'
export default {
  get(url, data, excludeLoadProgress) {
    let paramStr = '';
    Object.keys(data).forEach(key => {
      if (data[key] || data[key] === 0) {
        paramStr += key + '=' + data[key] + '&'
      }
    })
    if (paramStr !== '') {
      paramStr = paramStr.substr(0, paramStr.lastIndexOf('&'));
      url = url + '?' + paramStr;
    }
    return new Promise((resolve, reject) => {
      if (!excludeLoadProgress) LoadingBar.start();
      axios.get(url).then((res) => {
        res = res.data;
        if (res.code == 0) {
          if (!excludeLoadProgress) LoadingBar.finish();
          resolve(res);
        } else {
          if (!excludeLoadProgress) LoadingBar.error();
          reject(res);
        }
      }, (err) => {
        let res = {};
        res.result = '网络异常';
        if (!excludeLoadProgress) LoadingBar.error();
        reject(res);
      })
    });
  },
  post(url, params, excludeLoadProgress) {
    return new Promise((resolve, reject) => {
      if (!excludeLoadProgress) LoadingBar.start();
      axios.post(url, params).then((res) => {
        res = res.data;
        if (res.code == 0) {
          if (!excludeLoadProgress) LoadingBar.finish();
          resolve(res);
        } else {
          console.log(res);
          if (!excludeLoadProgress) LoadingBar.error();
          reject(res);
        }
      }, (err) => {
        let res = {};
        console.log(res);
        if (!excludeLoadProgress) LoadingBar.error();
        reject(res);
      })
    });
  }
}
