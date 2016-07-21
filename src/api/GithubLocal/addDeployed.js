import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function addDeployed(repoData) {
  let URL = `http://${appConfig.CLIENT_IP}:${appConfig.CLIENT_PORT}/api/githubdemomodel`;
  return new Promise((resolve, reject) => {
    request
      .post(URL)
      .send(repoData)
      .set('Content-Type', 'application/json')
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
