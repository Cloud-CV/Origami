import request from 'superagent';
const appConfig  = require('../../../outCalls/config');
import { baseURL } from './baseURL';

export function deleteComponentDeployed(userid, repoId, type) {
  let URL = `${baseURL}/api/${type}model/${userid}/${repoId}`;
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
