import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function modifyDeployed(userid, data) {
  let URL = `http://${appConfig.CLIENT_IP}:${appConfig.CLIENT_PORT}/api/nonghdemomodel/${userid}/${data.id}`;
  return new Promise((resolve, reject) => {
    request
      .put(URL)
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
