import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "../CommonLocal/baseURL";

export function is_cloudcv() {
  let URL = `${baseURL}/api/is_cloudcv`;
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

export function getAllDemosByCloudCV(user_id) {
  let URL = `${baseURL}/api/demo/user/${user_id}`;
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
