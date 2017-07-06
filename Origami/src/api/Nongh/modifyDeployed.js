import request from "superagent";
const appConfig = require("../../../outCalls/config");
import { baseURL } from "../CommonLocal/baseURL";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function modifyDeployed(user_id, data) {
  let URL = `${baseURL}/api/demo/${user_id}/${data.id}`;
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
