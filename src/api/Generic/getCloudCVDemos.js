import request from 'superagent';
const appConfig  = require('../../../outCalls/config');
import { baseURL } from '../CommonLocal/baseURL';

export function isCloudCV() {
  let URL = `${baseURL}/api/isCloudCV`;
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

export function getAllDemosByCloudCV(userid) {
  let URL = `${baseURL}/api/nonghdemomodel/${userid}`;
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
