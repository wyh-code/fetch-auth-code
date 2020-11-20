'use strict';

const axios = require('axios');
const config = require('./config')
const createScript = require('./createScript')
const fetchAuthCodeUrl = require('./fetchAuthCodeUrl')

function Fetch(option) {
  var _stop = ''

  this.fetchCode = function () {
    return new Promise((resolve, reject) => {

      function fetch(){
        axios.get(`${fetchAuthCodeUrl}?state=${option.state}`)
          .then(res => {
            if (!res.data.code) {
              if (_stop) {
                const type = _stop;
                _stop = ''
                resolve({ code: 200, type })
              } else {
                setTimeout(() => fetch(), option.delay)
              }
            } else {
              resolve(res.data)
            }
          }, err => reject(err))
      }
      fetch()
    })
  }

  this.stop = function(type){
    _stop = type || 'stop'
  }

  this.clear = function(){
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