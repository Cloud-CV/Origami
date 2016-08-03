import request from 'superagent';
const appConfig  = require('../../../outCalls/config');
import { baseURL } from '../CommonLocal/baseURL';

export function deleteDeployed(repoId) {
  let URL = `${baseURL}/api/githubdemomodel/${repoId}`;
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
