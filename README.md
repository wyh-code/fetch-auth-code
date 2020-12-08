# fetch-auth-code

## 解决本地开发调试时，redirect_uri 回调公网的不便
<br /> 

### 登录开放平台，将授权回调地址配置为以下地址

<br /> 

```
www.mockdata.cn
```
<br /> 


![授权回调](https://raw.githubusercontent.com/wyh-code/fetch-auth-code/master/mockdata.png)
<br /> 
<br /> 

* * *
<br /> 

### 下载依赖     

```js
npm install fetch-auth-code --save-dev
```
### 项目引入
```
import { qr } from './fetchAuthCode.js';
```

### 使用
```js
// 生成二维码
const q = qr({
  id: 'xx',
  appid: 'xxx'
})

// 查询 code
const code = await q.fetchCode()
console.log(code)
//{ code: '051wQKFa1UmB0A0LoGFa1j7YlK2wQKFe', state: 'undefined', type: 'code'|'error' }

// 停止查询
q.stop()
console.log(code)
// {code: code, type: "stop", state: 'undefined'}

// 清除二维码
q.clear()
console.log(code)
// {code: code, type: "clear", state: 'undefined'}

```

### version
**3.1.1**       
删除 fetchAuthCode 持续轮询       

**3.1.0**       
修改轮询方式


### 参数说明        
https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html

![参数说明](https://raw.githubusercontent.com/wyh-code/fetch-auth-code/master/params.png)