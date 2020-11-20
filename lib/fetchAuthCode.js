/**
 * @params 参考 https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
 */
'use strict';

const axios = require('axios');
const config = require('./config')
const createScript = require('./createScript')
const fetchAuthCodeUrl = require('./fetchAuthCodeUrl')

module.exports = function (option) {
  if (Object.prototype.toString.call(option) !== '[object Object]') {
    return {
      code: 1,
      message: '入参应为对象格式'
    }
  }
  if (!option.id) {
    return {
      code: 2,
      message: 'id为必传项！'
    }
  }
  if (!option.appid) {
    return {
      code: 3,
      message: 'appid为必传项！'
    }
  }
  // 插入js文件 http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js
  createScript(option.id)
  
  const state = `${option.state}-${config.state}`;

  return new Promise((resolve, reject) => {
    try{
      new WxLogin({
        ...config,
        ...option,
        state
      });
  
      function fetchAuthCode(){
        axios.get(`${fetchAuthCodeUrl}?state=${state}`)
          .then(res => {
            if(!res.data.code){
              setTimeout(() => fetchAuthCode(), 100)
            }else{
              resolve(res.data)
            }
          }, err => reject(err))
      }
  
      fetchAuthCode()
    }catch(e){
      reject(e)
    }
  })
}