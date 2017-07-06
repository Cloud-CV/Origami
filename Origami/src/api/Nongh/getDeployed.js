import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "../CommonLocal/baseURL";

export function getDeployed(user_id, id) {
  let URL = `${baseURL}/api/demo/${user_id}`;
  if (id) {
    URL += `/${id}`;
  }
  return new Promise((resolve, reject) => {
    request.get(URL).set("Accept", "application/json").end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.text);
      }
    });
  });
}
