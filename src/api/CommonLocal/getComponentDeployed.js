import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function getComponentDeployed(repoId, type) {
  let URL = `http://${appConfig.CLIENT_IP}:3000/api/${type}model`;
  if (repoId) {
    URL += `/${repoId}`;
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
