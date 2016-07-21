import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function addDeployed(data) {
  let URL = `http://${appConfig.CLIENT_IP}:${appConfig.CLIENT_PORT}/api/nonghdemomodel`;
  return new Promise((resolve, reject) => {
    request
      .post(URL)
      .send(data)
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
