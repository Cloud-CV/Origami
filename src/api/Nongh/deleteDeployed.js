import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function deleteDeployed(id) {
  let URL = `http://${appConfig.CLIENT_IP}:${appConfig.CLIENT_PORT}/api/nonghdemomodel/${id}`;
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
