import request from 'superagent';
const appConfig  = require('../../../outCalls/config');

export function getDeployed(id) {
  let URL = `http://${appConfig.CLIENT_IP}:${appConfig.CLIENT_PORT}/api/nonghdemomodel`;
  if (id) {
    URL += `/${id}`;
  }
  return new Promise((resolve, reject) => {
    request
      .get(URL)
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
