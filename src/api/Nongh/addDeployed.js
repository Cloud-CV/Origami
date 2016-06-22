import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function addDeployed(data) {
  let URL = `http://${appConfig.CLIENT_IP}:3000/api/nonghdemomodel`;
  return new Promise(function(resolve, reject) {
    request
      .post(URL)
      .send(data)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err) {
          reject(err);
        } else {
          resolve(res.text);
        }
      });
  });
}
