import request from 'superagent';
const appConfig  = require('../../../outCalls/config');
import { baseURL } from './baseURL';

export function addComponentDeployed(userid, componentData, type) {
  let URL = `${baseURL}/api/${type}model/${userid}`;
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
