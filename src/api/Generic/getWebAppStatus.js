import request from 'superagent';
const appConfig = require('../../../outCalls/config');

export function getWebAppStatus(webappaddress) {
  let URL = `http://${webappaddress}:${appConfig.CLIENT_PORT}/alive`;
  return new Promise((resolve, reject) => {
    request
      .get(URL)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve('OK');
        }
      });
  });
}
