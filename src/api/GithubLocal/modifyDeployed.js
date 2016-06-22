import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function modifyDeployed(repoData) {
  let URL = `http://${appConfig.CLIENT_IP}:3000/api/githubdemomodel/${repoData.id}`;
  return new Promise(function(resolve, reject) {
    request
      .put(URL)
      .send(repoData)
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
