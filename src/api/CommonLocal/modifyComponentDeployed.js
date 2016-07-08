import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function modifyComponentDeployed(componentData, type) {
  let URL = `http://${appConfig.CLIENT_IP}:3000/api/${type}model/${componentData.id}`;
  return new Promise((resolve, reject) => {
    request
      .put(URL)
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
