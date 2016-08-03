import request from 'superagent';
const appConfig  = require('../../../outCalls/config');
import { baseURL } from '../CommonLocal/baseURL';

export function getDeployed(repoId) {
  let URL = `${baseURL}/api/githubdemomodel`;
  if (repoId) {
    URL += `/${repoId}`;
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
