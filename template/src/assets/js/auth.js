//封装的权限认证相关的，具体的请求方式看相关文档
import Cookies from "js-cookie";
import md5 from 'js-md5'

const ticket = md5("ticket");
export const auth = md5("auth_IdCard");

export function getToken() {
  return Cookies.get(ticket)
}

export function setToken(token) {
  return Cookies.set(ticket, token)
}

export function getSysToken() {
  return Cookies.get(auth)
}

export function setSysToken(sysToken) {
  return Cookies.set(auth, sysToken)
}
 
export function removeToken() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    name = name.replace(/^\s*|\s*$/, "");
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
  }
  Cookies.remove(auth, {
    path: '/rms'
  });
  Cookies.remove(auth, {
    path: '/bas'
  });
  Cookies.remove(auth, {
    path: '/device'
  });
  Cookies.remove(auth, {
    path: '/retail'
  });
  return true
}

export function goLogin() {
  return window.location.href = window.location.origin + "/#/login/?callback=" + window.location.origin + "/device/index.html#/";
}

// 菜单的解析（一级菜单）
export function setMenu(localData, resData) {
  for (let i = 0; i < resData.length; i++) {
    findTarget(localData, resData[i].code);
  }

  function findTarget(source, targetName) {
    if (source && source.length) {
      for (let item of source) {
        if (item.code === targetName) {
          item.isShow = true
        }
      }
    }
  }
  return localData
}

// 没权限跳转到提示页
export function nopermissions() {
  return window.location.href = window.location.origin + '/noper.html';
}
