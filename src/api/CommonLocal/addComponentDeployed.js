import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function addComponentDeployed(componentData, type) {
  let URL = `http://${appConfig.CLIENT_IP}:${appConfig.CLIENT_PORT}/api/${type}model`;
  return new Promise((resolve, reject) => {
    request
      .post(URL)
      .send(componentData)
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
