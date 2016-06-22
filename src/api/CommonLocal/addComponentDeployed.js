import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function addComponentDeployed(componentData, type) {
  let URL = `http://${appConfig.CLIENT_IP}:3000/api/${type}model`;
  return new Promise(function(resolve, reject) {
    request
      .post(URL)
      .send(componentData)
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
