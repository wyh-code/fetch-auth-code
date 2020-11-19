const request = require('request');
const querystring = require('querystring');
const cheerio = require('cheerio');

const baseUrl = 'https://open.weixin.qq.com/connect/qrconnect';
const appid = '';
const redirect_uri = 'http://www.mockdata.cn/authCode';
const response_type = 'code';
const scope = 'snsapi_login';
const state = +new Date();

module.exports = function(option){
  if(Object.prototype.toString.call(option) !== '[object Object]'){
    return {
      code: 'code',
      message: '入参应为对象格式'
    }
  }

  if(!option.appid) {
    return {
      code: 'code',
      message: 'appid为必传项！'
    }
  }

  const codeClassName = option.codeClassName || '.qrcode';
  const url = option.baseUrl || baseUrl;

  delete option.codeClassName;
  delete option.baseUrl;

  const params = {
    appid,
    redirect_uri,
    response_type,
    scope,
    state,
    ...option
  }
  const query = querystring.stringify(params);

  return new Promise(async (resolve, reject) => {
    request(`${url}?${query}`,function (error, response, body) {
      const $ = cheerio.load(body);
      const src = $(codeClassName).attr('src');
      if(error){
        reject(error)
      }else{
        resolve({ 
          status: response.statusCode,
          state,
          qrcode: `${url}${src}`
        })
      }
    })
  })
}