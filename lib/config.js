/**
 * 默认配置
 */
'use strict';

module.exports = {
  self_redirect: true,
  scope: 'snsapi_login',
  redirect_uri: 'http://www.mockdata.cn/authCode',
  response_type: 'code',
  state: Math.random() * 100000000 + +new Date(),
  delay: 100
}