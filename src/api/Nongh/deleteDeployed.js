import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "../CommonLocal/baseURL";

export function deleteDeployed(userid, id) {
  let URL = `${baseURL}/api/nonghdemomodel/${userid}/${id}`;
  return new Promise((resolve, reject) => {
    request.delete(URL).set("Accept", "application/json").end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.text);
      }
    });
  });
}
