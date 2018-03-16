import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "../CommonLocal/baseURL";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function getSinglePermalink(user_id, project_id) {
  let URL = `${baseURL}/api/permalink/${user_id}/${project_id}`;
  return new Promise((resolve, reject) => {
    request
      .get(URL)
      .set("Accept", "application/json")
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
      .set("Accept", "application/json")
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
  let URL = `${baseURL}/api/permalink/${data.user_id}/${data.project_id}`;
  return new Promise((resolve, reject) => {
    request
      .post(URL)
      .send(data)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("X-CSRFToken", cookies.get("csrftoken"))
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
  let URL = `${baseURL}/api/permalink/${data.user_id}/${data.project_id}`;
  return new Promise((resolve, reject) => {
    request
      .put(URL)
      .send(data)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("X-CSRFToken", cookies.get("csrftoken"))
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
  let URL = `${baseURL}/api/permalink/${data.user_id}/${data.project_id}`;
  return new Promise((resolve, reject) => {
    request
      .delete(URL)
      .set("Accept", "application/json")
      .set("X-CSRFToken", cookies.get("csrftoken"))
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.text);
        }
      });
  });
}
