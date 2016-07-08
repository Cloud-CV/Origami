import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function deleteDeployed(repoId) {
  let URL = `http://${appConfig.CLIENT_IP}:3000/api/githubdemomodel/${repoId}`;
  return new Promise((resolve, reject) => {
    request
      .delete(URL)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.text);
        }
      });
  });
}
