import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function getDeployed(id) {
  let URL = `http://${appConfig.CLIENT_IP}:3000/api/nonghdemomodel`;
  if (id) {
    URL += `/${id}`;
  }
  return new Promise(function(resolve, reject) {
    request
      .get(URL)
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
