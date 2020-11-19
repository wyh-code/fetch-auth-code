const request = require('request');
const querystring = require('querystring');
const fetch_code_uri = 'http://www.mockdata.cn/fetchAuthCode';

module.exports = function(params){
  const query = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    function fetch(){
      request(`${fetch_code_uri}?${query}`, function(err, response, body){
        if(err){
          reject(err)
        }else{
          if(body.code){
            resolve(body)
          }else{
            fetch()
          }
        }
      })
    }
    fetch()
  })
}