import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function addDeployed(repoData) {
  let URL = `http://${appConfig.CLIENT_IP}:3000/api/githubdemomodel`;
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
