import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function deleteComponentDeployed(repoId, type) {
  let URL = `http://${appConfig.CLIENT_IP}:${appConfig.CLIENT_PORT}/api/${type}model/${repoId}`;
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
