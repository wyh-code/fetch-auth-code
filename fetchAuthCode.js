/**
 * @params 参考 https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
 */

import axios from 'axios';
const config = require('./lib/config')
const s = require('./lib/script')
const fetchAuthCodeUrl = 'http://www.mockdata.cn/fetchAuthCode'

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

  const container = document.getElementById(option.id)
  const script = document.createElement('script');
  script.innerText = s;
  container.appendChild(script)

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