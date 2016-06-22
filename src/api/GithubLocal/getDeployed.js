import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function getDeployed(repoId) {
  let URL = `http://${appConfig.CLIENT_IP}:3000/api/githubdemomodel`;
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
