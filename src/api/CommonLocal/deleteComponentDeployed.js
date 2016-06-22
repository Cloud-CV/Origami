import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function deleteComponentDeployed(repoId, type) {
  let URL = `http://${appConfig.CLIENT_IP}:3000/api/${type}model/${repoId}`;
  return new Promise(function(resolve, reject) {
    request
      .delete(URL)
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
