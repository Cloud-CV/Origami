import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "./baseURL";

export function modifyComponentDeployed(userid, componentData, type) {
  let URL = `${baseURL}/api/${type}model/${userid}/${componentData.id}`;
  return new Promise((resolve, reject) => {
    request
      .put(URL)
      .send(componentData)
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
