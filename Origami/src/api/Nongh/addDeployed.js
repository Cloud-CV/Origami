import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "../CommonLocal/baseURL";

export function addDeployed(userid, data) {
  let URL = `${baseURL}/api/nonghdemomodel/${userid}`;
  return new Promise((resolve, reject) => {
    request
      .post(URL)
      .send(data)
      .set("Content-Type", "application/json")
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
