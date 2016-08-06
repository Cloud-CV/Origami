import request from 'superagent';
const appConfig  = require('../../../outCalls/config');
import { baseURL } from '../CommonLocal/baseURL';

export function getSinglePermalink(userId, projectId) {
  let URL = `${baseURL}/api/permalink/${userId}/${projectId}`;
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

export function getAllPermalink() {
  let URL = `${baseURL}/api/permalink`;
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

export function addPermalink(data) {
  let URL = `${baseURL}/api/permalink/${data.userId}/${data.projectId}`;
  return new Promise((resolve, reject) => {
    request
      .post(URL)
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

export function modifyPermalink(data) {
  let URL = `${baseURL}/api/permalink/${data.userId}/${data.projectId}`;
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

export function deletePermalink(data) {
  let URL = `${baseURL}/api/permalink/${data.userId}/${data.projectId}`;
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
