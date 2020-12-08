'use strict';

const axios = require('axios');
const config = require('./config')
const createScript = require('./createScript')
const fetchAuthCodeUrl = require('./fetchAuthCodeUrl')

function Fetch(option) {
  var _$type = ''

  var source = axios.CancelToken.source();
  this.source = source;

  this.fetchCode = function () {
    return new Promise((resolve, reject) => {
      axios.get(`${fetchAuthCodeUrl}?state=${option.state}`, {
        cancelToken: source.token
      }).then(res => {
        const { code, state, status } = res.data
        resolve({
          code,
          state,
          type: status === 200 ? 'code' : 'error'
        })
      }, err => {
        const { message } = err;
        if(message._$type){
          resolve({ type: message._$type, code: 'code', state: option.state })
        }else{
          reject(err)
        }
      })
    })
  }

  this.stop = function (type) {
    _$type = type || 'stop';
    this.source.cancel({ _$type })
  }

  this.clear = function () {
    this.stop('clear')
    option.container.innerHTML = ''
  }
}

module.exports = function (option) {
  // 插入js文件 http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js
  const container = createScript(option.id)
  const state = `${option.state}-${config.state}`

  const _config = {
    ...config,
    ...option,
    state
  }

  new WxLogin(_config);

  return new Fetch({ ..._config, container })
}