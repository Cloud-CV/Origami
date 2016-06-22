import request from 'superagent';

export function getWebAppStatus(webappaddress) {
  let URL = `http://${webappaddress}:3000/alive`;
  return new Promise(function(resolve, reject) {
    request
      .get(URL)
      .end(function(err, res){
        if(err) {
          reject(err);
        } else {
          resolve('OK');
        }
      });
  });
}
